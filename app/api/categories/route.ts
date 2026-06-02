import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');

    if (id && !isNaN(Number(id))) {
      const [categoryRows] = await pool.query(
        `
        SELECT
          id,
          name,
          slug,
          image,
          paragraph,
          meta_title,
          meta_description,
          status,
          created_at,
          updated_at
        FROM categories
        WHERE id = ?
        `,
        [id]
      );

      if (!(categoryRows as any[]).length) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        category: (categoryRows as any[])[0],
      });
    }

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        id,
        name,
        slug,
        image,
        paragraph,
        meta_title,
        meta_description,
        status,
        created_at,
        updated_at
      FROM categories
    `;

    let countQuery = `
      SELECT COUNT(*) as total 
      FROM categories
    `;

    const params: any[] = [];

    if (search) {
      query += `
        WHERE name LIKE ? 
        OR slug LIKE ?
      `;
      countQuery += `
        WHERE name LIKE ? 
        OR slug LIKE ?
      `;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += `
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    
    let totalCount = 0;
    if (search) {
      const countParams = [`%${search}%`, `%${search}%`];
      const [countResult] = await pool.query(countQuery, countParams);
      totalCount = (countResult as any[])[0].total;
    } else {
      const [countResult] = await pool.query('SELECT COUNT(*) as total FROM categories');
      totalCount = (countResult as any[])[0].total;
    }

    return NextResponse.json({
      data: rows,
      total: totalCount,
      page,
      limit,
    });

  } catch (error: any) {
    console.error('API Error:', error.message || error);

    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      slug,
      image,
      paragraph,
      meta_title,
      meta_description,
      status
    } = body;

    // Validation
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required fields' },
        { status: 400 }
      );
    }

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insert into categories table
      const [categoryResult] = await connection.query(
        `
        INSERT INTO categories
        (name, slug, image, paragraph, meta_title, meta_description, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [name, slug, image || null, paragraph || null, meta_title || null, meta_description || null, status || 'active']
      );

      const categoryId = (categoryResult as any).insertId;

      await connection.commit();
      
      return NextResponse.json({
        success: true,
        id: categoryId,
        message: 'Category created successfully'
      });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

  } catch (error: any) {
    console.error(error);

    // Check for duplicate entry error
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'A category with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create category'},
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      name,
      slug,
      image,
      paragraph,
      meta_title,
      meta_description,
      status
    } = body;

    // Validation
    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required fields' },
        { status: 400 }
      );
    }

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Check if category exists
      const [existingCategory] = await connection.query(
        'SELECT id FROM categories WHERE id = ?',
        [id]
      );

      if (!(existingCategory as any[]).length) {
        await connection.rollback();
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }

      // Update categories table
      await connection.query(
        `
        UPDATE categories
        SET
          name = ?,
          slug = ?,
          image = ?,
          paragraph = ?,
          meta_title = ?,
          meta_description = ?,
          status = ?,
          updated_at = NOW()
        WHERE id = ?
        `,
        [name, slug, image || null, paragraph || null, meta_title || null, meta_description || null, status, id]
      );

      await connection.commit();
      
      return NextResponse.json({
        success: true,
        message: 'Category updated successfully'
      });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

  } catch (error: any) {
    console.error(error);

    // Check for duplicate entry error
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'A category with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update category' },
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
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Check if category exists
      const [existingCategory] = await connection.query(
        'SELECT id FROM categories WHERE id = ?',
        [id]
      );

      if (!(existingCategory as any[]).length) {
        await connection.rollback();
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }

      // Delete category (products will be deleted automatically due to CASCADE)
      await connection.query(
        'DELETE FROM categories WHERE id = ?',
        [id]
      );

      await connection.commit();
      
      return NextResponse.json({
        success: true,
        message: 'Category deleted successfully'
      });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}