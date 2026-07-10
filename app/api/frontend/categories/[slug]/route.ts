import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
     const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category slug is required',
        },
        { status: 400 }
      );
    }

    // Get category details
    const [categoryRows]: any = await pool.query(
      `
      SELECT
        id,
        name,
        slug,
        image,
        paragraph,
        meta_title,
        meta_description,
        status
      FROM categories
      WHERE slug = ? AND status = 'active'
      LIMIT 1
      `,
      [slug]
    );

    if (categoryRows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found',
        },
        { status: 404 }
      );
    }

    const category = categoryRows[0];
    console.log(category);

    // Get products
    const [productRows]: any = await pool.query(
      `
      SELECT
        id,
        name,
        slug,
        image,
        moq,
        packaging_size,
        packaging_type,
        customized_formulations,
        private_labeling,
        turnkey_solutions,
        ingredients,
        status,
        created_at
      FROM products
      WHERE category_id = ? AND status = 'active'
      ORDER BY created_at DESC
      `,
      [category.id]
    );

   

    // Sidebar categories with product count
    const [allCategories]: any = await pool.query(
      `
      SELECT
        c.id,
        c.name,
        c.slug,
        COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p
        ON p.category_id = c.id
        AND p.status = 'active'
      WHERE c.status = 'active'
      GROUP BY c.id, c.name, c.slug
      ORDER BY c.name ASC
      `
    );

    return NextResponse.json({
      success: true,
      data: {
        category,
        products: productRows,
        total: productRows.length,
        allCategories,
      },
    });

  } catch (error) {
    console.error('Category API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch category',
      },
      { status: 500 }
    );
  }
}