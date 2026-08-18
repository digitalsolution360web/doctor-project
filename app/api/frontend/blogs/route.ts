import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Get blogs with status = '1' (active)
    const [rows] = await pool.query(
      `
      SELECT 
        id,
        h1,
        slug,
        description,
        excerpt,
        image,
        meta_title,
        meta_description,
        status,
        created_at,
        updated_at
      FROM blogs
      WHERE status = '1'
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    // Get total count
    const [countResult] = await pool.query(
      `
      SELECT COUNT(*) as total
      FROM blogs
      WHERE status = '1'
      `
    );

    return NextResponse.json({
      success: true,
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