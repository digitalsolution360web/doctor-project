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
      slug,
      image,
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

  const [translations] = await pool.query(
    `
    SELECT
      language_code,
      name,
      h1_title,
      description
    FROM category_translations
    WHERE category_id = ?
    `,
    [id]
  );

  return NextResponse.json({
    category: (categoryRows as any[])[0],
    translations,
  });
}

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const languageCode = searchParams.get('language') || 'en'; // Default to English

    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        c.id,
        c.slug,
        c.image,
        c.meta_title,
        c.meta_description,
        c.status,
        c.created_at,
        c.updated_at,
        ct.name,
        ct.h1_title,
        ct.description
      FROM categories c
      LEFT JOIN category_translations ct 
        ON c.id = ct.category_id 
        AND ct.language_code = ?
    `;

    let countQuery = `
      SELECT COUNT(*) as total 
      FROM categories c
    `;

    const params: any[] = [languageCode];

if (search) {
  query += `
    WHERE
      ct.name LIKE ?
      OR c.slug LIKE ?
  `;

  countQuery += `
    WHERE EXISTS (
      SELECT 1
      FROM category_translations ct2
      WHERE ct2.category_id = c.id
      AND ct2.language_code = ?
      AND ct2.name LIKE ?
    )
    OR c.slug LIKE ?
  `;

  params.push(`%${search}%`, `%${search}%`);
}

    query += `
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `;

    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    
    let totalCount = 0;
    if (search) {
      const countParams = [languageCode, `%${search}%`, `%${search}%`];
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
      slug,
      image,
      meta_title,
      meta_description,
      status,
      translations // Array of translations for different languages
    } = body;

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insert into categories table
      const [categoryResult] = await connection.query(
        `
        INSERT INTO categories
        (slug, image, meta_title, meta_description, status)
        VALUES (?, ?, ?, ?, ?)
        `,
        [slug, image, meta_title, meta_description, status ?? 1]
      );

      const categoryId = (categoryResult as any).insertId;

      // Insert translations
      if (translations && translations.length > 0) {
        for (const trans of translations) {
          await connection.query(
            `
            INSERT INTO category_translations
            (category_id, language_code, name, h1_title, description)
            VALUES (?, ?, ?, ?, ?)
            `,
            [categoryId, trans.language_code, trans.name, trans.h1_title, trans.description]
          );
        }
      }

      await connection.commit();
      
      return NextResponse.json({
        success: true,
        id: categoryId,
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
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      slug,
      image,
      meta_title,
      meta_description,
      status,
      translations // Array of translations for different languages
    } = body;

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Update categories table
      await connection.query(
        `
        UPDATE categories
        SET
          slug = ?,
          image = ?,
          meta_title = ?,
          meta_description = ?,
          status = ?,
          updated_at = NOW()
        WHERE id = ?
        `,
        [slug, image, meta_title, meta_description, status, id]
      );

      // Update or insert translations
      if (translations && translations.length > 0) {
        for (const trans of translations) {
          // Check if translation exists
          const [existing] = await connection.query(
            'SELECT translation_id FROM category_translations WHERE category_id = ? AND language_code = ?',
            [id, trans.language_code]
          );

          if ((existing as any[]).length > 0) {
            // Update existing translation
            await connection.query(
              `
              UPDATE category_translations
              SET name = ?, h1_title = ?, description = ?
              WHERE category_id = ? AND language_code = ?
              `,
              [trans.name, trans.h1_title, trans.description, id, trans.language_code]
            );
          } else {
            // Insert new translation
            await connection.query(
              `
              INSERT INTO category_translations
              (category_id, language_code, name, h1_title, description)
              VALUES (?, ?, ?, ?, ?)
              `,
              [id, trans.language_code, trans.name, trans.h1_title, trans.description]
            );
          }
        }
      }

      await connection.commit();
      
      return NextResponse.json({
        success: true,
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
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // First delete translations (due to foreign key constraint)
      await connection.query(
        'DELETE FROM category_translations WHERE category_id = ?',
        [id]
      );

      // Then delete category
      await connection.query(
        'DELETE FROM categories WHERE id = ?',
        [id]
      );

      await connection.commit();
      
      return NextResponse.json({
        success: true,
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