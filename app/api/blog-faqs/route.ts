import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('blogId');

    if (!blogId) {
      return NextResponse.json(
        { error: 'blog ID is required' },
        { status: 400 }
      );
    }

    const [rows] = await pool.query(
      'SELECT * FROM blog_faqs WHERE blog_id = ? ORDER BY serial_no ASC, id ASC',
      [blogId]
    );

    return NextResponse.json({
      data: rows,
      total: (rows as any[]).length,
    });

  } catch (error: any) {
    console.error('GET FAQS ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      blog_id,
      question,
      answer,
      serial_no,
    } = body;

    // Validation
    if (!blog_id) {
      return NextResponse.json(
        { error: 'blog ID is required' },
        { status: 400 }
      );
    }

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    if (!answer || !answer.trim()) {
      return NextResponse.json(
        { error: 'Answer is required' },
        { status: 400 }
      );
    }

    // Check if blog exists
    const [blogCheck] = await pool.query(
      'SELECT id FROM blogs WHERE id = ?',
      [blog_id]
    );

    if ((blogCheck as any[]).length === 0) {
      return NextResponse.json(
        { error: 'blog not found' },
        { status: 404 }
      );
    }

    const [result] = await pool.query(
      `
      INSERT INTO blog_faqs (
        blog_id,
        question,
        answer,
        serial_no
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        blog_id,
        question.trim(),
        answer.trim(),
        serial_no || 0,
      ]
    );

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
      message: 'FAQ added successfully',
    });

  } catch (error: any) {
    console.error('CREATE FAQ ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      question,
      answer,
      serial_no,
    } = body;

    // Validation
    if (!id) {
      return NextResponse.json(
        { error: 'FAQ ID is required' },
        { status: 400 }
      );
    }

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    if (!answer || !answer.trim()) {
      return NextResponse.json(
        { error: 'Answer is required' },
        { status: 400 }
      );
    }

    // Check if FAQ exists
    const [faqCheck] = await pool.query(
      'SELECT id FROM blog_faqs WHERE id = ?',
      [id]
    );

    if ((faqCheck as any[]).length === 0) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }

    await pool.query(
      `
      UPDATE blog_faqs
      SET
        question = ?,
        answer = ?,
        serial_no = ?
      WHERE id = ?
      `,
      [
        question.trim(),
        answer.trim(),
        serial_no || 0,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'FAQ updated successfully',
    });

  } catch (error: any) {
    console.error('UPDATE FAQ ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to update FAQ' },
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
        { error: 'FAQ ID is required' },
        { status: 400 }
      );
    }

    // Check if FAQ exists
    const [faqCheck] = await pool.query(
      'SELECT id FROM blog_faqs WHERE id = ?',
      [id]
    );

    if ((faqCheck as any[]).length === 0) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }

    const [result] = await pool.query(
      'DELETE FROM blog_faqs WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'FAQ deleted successfully',
    });

  } catch (error: any) {
    console.error('DELETE FAQ ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}