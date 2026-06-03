import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

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