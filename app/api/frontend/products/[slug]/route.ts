import {NextRequest, NextResponse} from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params; 
    if(!slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Product slug is required",
        },
        { status: 400 }
      );
    }
    const [productRows]: any = await pool.query(
      `
      SELECT * FROM products WHERE slug = ? AND status = 'active' LIMIT 1
      `,
      [slug]
    );
    if (productRows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }
    const product = productRows[0];
    const relatedProductsQuery = `
      SELECT name,image,slug FROM products WHERE category_id = ? AND status = 'active' AND slug != ? LIMIT 3
    `;
    const [relatedProducts]: any = await pool.query(relatedProductsQuery, [product.category_id, slug]);
    return NextResponse.json(
      {
        success: true,
        data: { product, relatedProducts },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product details",
      },
      { status: 500 }
    );
  }
}