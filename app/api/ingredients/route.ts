// app/api/ingredients/route.ts
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
        id,
        name,
        image,
        alt,
        created_at,
        updated_at
      FROM ingredients
    `;
    let countQuery = `
      SELECT COUNT(*) as total
      FROM ingredients
    `;
    const params: any[] = [];

    if (search) {
      query += ` WHERE name LIKE ? OR alt LIKE ?`;
      countQuery += ` WHERE name LIKE ? OR alt LIKE ?`;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY name ASC, created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    const [countResult] = await pool.query(countQuery, params.slice(0, params.length - 2));

    return NextResponse.json({
      data: rows,
      total: (countResult as any[])[0].total,
      page,
      limit,
    });
  } catch (error: any) {
    console.error('GET INGREDIENTS ERROR:', error);
    return NextResponse.json({ error: 'Failed to fetch ingredients' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, image, alt } = body;

    if (!name) {
      return NextResponse.json({ error: 'Ingredient name is required' }, { status: 400 });
    }
    const ingredientName = name.trim();

    // Check duplicate
    const [existing] = await pool.query(
      `SELECT id FROM ingredients WHERE name = ? LIMIT 1`,
      [ingredientName]
    );

    if ((existing as any[]).length > 0) {
      return NextResponse.json(
        { error: 'Ingredient name already exists' },
        { status: 409 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO ingredients (name, image, alt) VALUES (?, ?, ?)`,
      [ingredientName, image || null, alt || null]
    );

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
    });
  } catch (error: any) {
    console.error('CREATE INGREDIENT ERROR:', error);
    return NextResponse.json({ error: 'Failed to create ingredient' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, image, alt } = body;

    if (!id) {
      return NextResponse.json({ error: 'Ingredient ID is required' }, { status: 400 });
    }

    await pool.query(
      `UPDATE ingredients SET name = ?, image = ?, alt = ? WHERE id = ?`,
      [name, image || null, alt || null, id]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('UPDATE INGREDIENT ERROR:', error);
    return NextResponse.json({ error: 'Failed to update ingredient' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Ingredient ID is required' }, { status: 400 });
    }

    await pool.query('DELETE FROM ingredients WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE INGREDIENT ERROR:', error);
    return NextResponse.json({ error: 'Failed to delete ingredient' }, { status: 500 });
  }
}