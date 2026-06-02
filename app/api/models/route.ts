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
        models.*,
        products.name as product_name
      FROM models
      LEFT JOIN products 
        ON models.product_id = products.id
    `;

    let countQuery = `
      SELECT COUNT(*) as total
      FROM models
      LEFT JOIN products 
        ON models.product_id = products.id
    `;

    const params: any[] = [];

    if (search) {
      query += `
        WHERE 
          models.model_name LIKE ? OR
          models.model_number LIKE ? OR
          models.color LIKE ? OR
          products.name LIKE ?
      `;

      countQuery += `
        WHERE 
          models.model_name LIKE ? OR
          models.model_number LIKE ? OR
          models.color LIKE ? OR
          products.name LIKE ?
      `;

      params.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    query += `
      ORDER BY models.created_at DESC
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
    console.error('GET MODELS ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      product_id,
      model_name,
      model_number,
      color,
      size,
      price,
      stock,
      image,
      status,
    } = body;

    const [result] = await pool.query(
      `
      INSERT INTO models (
        product_id,
        model_name,
        model_number,
        color,
        size,
        price,
        stock,
        image,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        product_id,
        model_name,
        model_number,
        color,
        size,
        price || 0,
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
    console.error('CREATE MODEL ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to create model' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      product_id,
      model_name,
      model_number,
      color,
      size,
      price,
      stock,
      image,
      status,
    } = body;

    await pool.query(
      `
      UPDATE models
      SET
        product_id = ?,
        model_name = ?,
        model_number = ?,
        color = ?,
        size = ?,
        price = ?,
        stock = ?,
        image = ?,
        status = ?
      WHERE id = ?
      `,
      [
        product_id,
        model_name,
        model_number,
        color,
        size,
        price || 0,
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
    console.error('UPDATE MODEL ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to update model' },
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
        { error: 'Model ID is required' },
        { status: 400 }
      );
    }

    await pool.query(
      'DELETE FROM models WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    console.error('DELETE MODEL ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to delete model' },
      { status: 500 }
    );
  }
}