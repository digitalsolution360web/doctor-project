import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.query(`
      SELECT
        *
      FROM categories
      WHERE status = 1
      ORDER BY name ASC
    `) as any;

    return NextResponse.json({
      success: true,
    //   count: (rows as any[]).length,
      data: rows,
    });

  } catch (error: any) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}
