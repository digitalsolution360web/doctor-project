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
       *
      FROM blogs
    `;

    let countQuery = `
      SELECT COUNT(*) as total
      FROM blogs
      
    `;

    const params: any[] = [];

    if (search) {
      query += `
        WHERE 
          blogs.h1 LIKE ? OR
          blogs.slug LIKE ? OR
          blogs.meta_title LIKE ? OR
          blogs.meta_description LIKE ?
      `;

      countQuery += `
        WHERE 
          blogs.h1 LIKE ? OR
          blogs.slug LIKE ? OR
          blogs.meta_title LIKE ? OR
          blogs.meta_description LIKE ?
      `;

      params.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    query += `
      ORDER BY blogs.created_at DESC
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
    console.error('GET BLOGS ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      h1,
      slug,
      excerpt,
      image,
      description,
      meta_title,
      meta_description,
      status,
    } = body;

    // Generate slug from name if not provided
    let finalSlug = slug;
    if (!finalSlug && h1) {
      finalSlug = h1
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const [result] = await pool.query(
      `
      INSERT INTO blogs (
        h1,
        slug,
        excerpt,
        image,
        description,
        meta_title,
        meta_description,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        h1 || null,
        finalSlug,
        excerpt || null,
        image || null,
        description || null,
        meta_title || null,
        meta_description || null,
        status ?? 1,
      ]
    );

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
    });

  } catch (error: any) {
    console.error('CREATE BLOG ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      h1,
      slug,
      excerpt,
      image,
      description,
      meta_title,
      meta_description,
      status,
    } = body;

    // Generate slug from name if not provided
    let finalSlug = slug;
    if (!finalSlug && h1) {
      finalSlug = h1
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    await pool.query(
      `
      UPDATE blogs
      SET
        h1 = ?,
        slug = ?,
        excerpt = ?,
        image = ?,
        description = ?,
        meta_title = ?,
        meta_description = ?,
        status = ?
      WHERE id = ?
      `,
      [
        h1 || null,
        finalSlug,
        excerpt || null,
        image || null,
        description || null,
        meta_title || null,
        meta_description || null,
        status ?? 1,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    console.error('UPDATE BLOGS ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to update blog' },
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
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Check if blog has any related records (models, order_items, etc.)
    // Delete related records first based on your foreign key constraints
    
    // Example: Delete from models if exists
    try {
      await pool.query(
        'DELETE FROM blogs WHERE id = ?',
        [id]
      );
    } catch (err) {
      // Table might not exist, continue
      console.log('No blog table or no records deleted');
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });

  } catch (error: any) {
    console.error('DELETE BLOG ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}