import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get('page') || 1);
    const limit = 10;
    const offset = (page - 1) * limit;

    // Get enquiries
    const [rows]: any = await pool.query(
      `
      SELECT *
      FROM enquiries
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    // Get total count
    const [countRows]: any = await pool.query(
      `SELECT COUNT(*) as total FROM enquiries`
    );

    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: rows,
      total: total,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords: total,
        limit,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch enquiries',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      company,
      phone,
      email,
      product_type,
      qty,
      message,
    } = body;

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }

    if (!phone?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const [result]: any = await pool.query(
      `
      INSERT INTO enquiries (
        name,
        company,
        phone,
        email,
        product_type,
        qty,
        message,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
      `,
      [
        name,
        company || null,
        phone,
        email || null,
        product_type || null,
        qty || null,
        message || null,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Contact Form Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
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
        { success: false, message: 'ID is required' },
        { status: 400 }
      );
    }

    const [result]: any = await pool.query(
      'DELETE FROM enquiries WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}