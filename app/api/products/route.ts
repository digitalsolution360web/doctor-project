import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        products.*,
        categories.name as category_name
      FROM products
      LEFT JOIN categories 
        ON products.category_id = categories.id
    `;

    let countQuery = `
      SELECT COUNT(*) as total
      FROM products
      LEFT JOIN categories 
        ON products.category_id = categories.id
    `;

    const params: any[] = [];

    if (search) {
      query += `
        WHERE 
          products.name LIKE ? OR
          products.slug LIKE ? OR
          products.meta_title LIKE ? OR
          products.meta_description LIKE ? OR
          categories.name LIKE ?
      `;

      countQuery += `
        WHERE 
          products.name LIKE ? OR
          products.slug LIKE ? OR
          products.meta_title LIKE ? OR
          products.meta_description LIKE ? OR
          categories.name LIKE ?
      `;

      params.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    query += `
      ORDER BY products.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await pool.query(query, [
      ...params,
      limit,
      offset,
    ]);

    const [countResult] = await pool.query(countQuery, params);

    return NextResponse.json({
      data: rows,
      total: (countResult as any[])[0].total,
      page,
      limit,
    });

  } catch (error: any) {
    console.error('GET PRODUCTS ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      category_id,
      name,
      h1_title,
      slug,
      image,
      moq,
      packaging_size,
      packaging_type,
      customized_formulations,
      private_labeling,
      turnkey_solutions,
      benefits,
      description,
      meta_title,
      meta_description,
      status,
      ingredients,
    } = body;

    // Generate slug from name if not provided
    let finalSlug = slug;
    if (!finalSlug && name) {
      finalSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const [result] = await pool.query(
      `
      INSERT INTO products (
        category_id,
        name,
        slug,
        h1_title,
        image,
        moq,
        packaging_size,
        packaging_type,
        customized_formulations,
        private_labeling,
        turnkey_solutions,
        benefits,
        description,
        meta_title,
        meta_description,
        status,
        ingredients
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        category_id || null,
        name,
        finalSlug,
        h1_title || null,
        image || null,
        moq || 0,
        packaging_size || null,
        packaging_type || null,
        customized_formulations || 0,
        private_labeling || 0,
        turnkey_solutions || 0,
        benefits || null,
        description || null,
        meta_title || null,
        meta_description || null,
        status ?? 1,
        ingredients || null,
      ]
    );

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
    });

  } catch (error: any) {
    console.error('CREATE PRODUCT ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      category_id,
      name,
      h1_title,
      slug,
      image,
      moq,
      packaging_size,
      packaging_type,
      customized_formulations,
      private_labeling,
      turnkey_solutions,
      benefits,
      description,
      meta_title,
      meta_description,
      status,
      ingredients,
    } = body;

    // Generate slug from name if not provided
    let finalSlug = slug;
    if (!finalSlug && name) {
      finalSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    await pool.query(
      `
      UPDATE products
      SET
        category_id = ?,
        name = ?,
        slug = ?,
        h1_title = ?,
        image = ?,
        moq = ?,
        packaging_size = ?,
        packaging_type = ?,
        customized_formulations = ?,
        private_labeling = ?,
        turnkey_solutions = ?,
        benefits = ?,
        description = ?,
        meta_title = ?,
        meta_description = ?,
        status = ?,
        ingredients = ?
      WHERE id = ?
      `,
      [
        category_id || null,
        name,
        finalSlug,
        h1_title || null,
        image || null,
        moq || 0,
        packaging_size || null,
        packaging_type || null,
        customized_formulations || 0,
        private_labeling || 0,
        turnkey_solutions || 0,
        benefits || null,
        description || null,
        meta_title || null,
        meta_description || null,
        status ?? 1,
        ingredients || null,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    console.error('UPDATE PRODUCT ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if product has any related records (models, order_items, etc.)
    // Delete related records first based on your foreign key constraints
    
    // Example: Delete from models if exists
    try {
      await pool.query(
        'DELETE FROM models WHERE product_id = ?',
        [id]
      );
    } catch (err) {
      // Table might not exist, continue
      console.log('No models table or no records deleted');
    }

    // Delete product
    const [result] = await pool.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    );

    const affectedRows = (result as any).affectedRows;
    
    if (affectedRows === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });

  } catch (error: any) {
    console.error('DELETE PRODUCT ERROR:', error);

    // Handle foreign key constraint errors
    if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.code === 'ER_ROW_IS_REFERENCED') {
      return NextResponse.json(
        { error: 'Cannot delete product because it has related orders or other records' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}