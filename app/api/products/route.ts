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
          products.sku LIKE ? OR
          categories.name LIKE ?
      `;

      countQuery += `
        WHERE 
          products.name LIKE ? OR
          products.slug LIKE ? OR
          products.sku LIKE ? OR
          categories.name LIKE ?
      `;

      params.push(
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
      slug,
      short_description,
      description,
      price,
      sale_price,
      sku,
      stock,
      image,
      status,
    } = body;

    const [result] = await pool.query(
      `
      INSERT INTO products (
        category_id,
        name,
        slug,
        short_description,
        description,
        price,
        sale_price,
        sku,
        stock,
        image,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        category_id,
        name,
        slug,
        short_description,
        description,
        price || 0,
        sale_price || null,
        sku,
        stock || 0,
        image,
        status ?? 1,
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
      slug,
      short_description,
      description,
      price,
      sale_price,
      sku,
      stock,
      image,
      status,
    } = body;

    await pool.query(
      `
      UPDATE products
      SET
        category_id = ?,
        name = ?,
        slug = ?,
        short_description = ?,
        description = ?,
        price = ?,
        sale_price = ?,
        sku = ?,
        stock = ?,
        image = ?,
        status = ?
      WHERE id = ?
      `,
      [
        category_id,
        name,
        slug,
        short_description,
        description,
        price || 0,
        sale_price || null,
        sku,
        stock || 0,
        image,
        status ?? 1,
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

    // Delete models first because of FK relation
    await pool.query(
      'DELETE FROM models WHERE product_id = ?',
      [id]
    );

    // Delete product
    await pool.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    console.error('DELETE PRODUCT ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}