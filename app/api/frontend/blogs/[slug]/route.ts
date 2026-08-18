import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get blog by slug
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
      WHERE slug = ? AND status = '1'
      `,
      [slug]
    );

    const blog = (rows as any[])[0];

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });

  } catch (error: any) {
    console.error('GET BLOG DETAIL ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}