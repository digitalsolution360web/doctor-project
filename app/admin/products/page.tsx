'use client';

import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  category_id: number;
  category_name: string;
  name: string;
  slug: string;
  short_description: string;
  price: number;
  sale_price: number;
  sku: string;
  stock: number;
  image: string;
  status: number;
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    category_id: '',
    name: '',
    slug: '',
    short_description: '',
    description: '',
    price: '',
    sale_price: '',
    sku: '',
    stock: '',
    image: '',
    status: 1,
  });

  const limit = 10;

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/products?page=${page}&limit=${limit}&search=${search}`
      );

      const data = await res.json();

      setProducts(data.data || []);
      setTotal(data.total || 0);

      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories?page=1&limit=1000');

      const data = await res.json();

      setCategories(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);

      setFormData({
        category_id: String(product.category_id),
        name: product.name || '',
        slug: product.slug || '',
        short_description: product.short_description || '',
        description: '',
        price: String(product.price || ''),
        sale_price: String(product.sale_price || ''),
        sku: product.sku || '',
        stock: String(product.stock || ''),
        image: product.image || '',
        status: product.status,
      });
    } else {
      setEditingProduct(null);

      setFormData({
        category_id: '',
        name: '',
        slug: '',
        short_description: '',
        description: '',
        price: '',
        sale_price: '',
        sku: '',
        stock: '',
        image: '',
        status: 1,
      });
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingProduct ? 'PUT' : 'POST';

    const body = editingProduct
      ? {
          ...formData,
          id: editingProduct.id,
        }
      : formData;

    const res = await fetch('/api/products', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      fetchProducts();
      closeModal();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;

    const res = await fetch(`/api/products?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchProducts();
    }
  };

  return (
    <>
      <div className="animate-fade-in pb-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Products
            </h1>

            <p className="text-[var(--text-secondary)] text-sm mt-1">
              Manage all product inventory and catalog items.
            </p>
          </div>

          <button
            onClick={() => openModal()}
            className="btn-primary flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white w-full sm:w-auto"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>

            Add Product
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
            Failed to fetch products.
          </div>
        )}

        {/* SEARCH */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-3 px-12 text-[var(--text-primary)]"
          />

          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* TABLE */}
        <div className="hidden md:block bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-2xl mb-6">
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-[var(--bg-primary)] text-left text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">

                  <th className="px-5 py-4">Image</th>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>

                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border-color)]">

                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-5 py-4">
                        <div className="h-12 w-12 rounded-lg skeleton" />
                      </td>

                      <td className="px-5 py-4">
                        <div className="h-4 w-40 skeleton" />
                      </td>

                      <td className="px-5 py-4">
                        <div className="h-4 w-28 skeleton" />
                      </td>

                      <td className="px-5 py-4">
                        <div className="h-4 w-16 skeleton" />
                      </td>

                      <td className="px-5 py-4">
                        <div className="h-4 w-12 skeleton" />
                      </td>

                      <td className="px-5 py-4">
                        <div className="h-6 w-16 skeleton" />
                      </td>

                      <td className="px-5 py-4">
                        <div className="h-8 w-20 skeleton ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-16 text-center text-[var(--text-secondary)]"
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >

                      <td className="px-5 py-4">
                        <img
                          src={product.image || '/placeholder.png'}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-[var(--border-color)]"
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-semibold text-[var(--text-primary)] text-sm">
                          {product.name}
                        </div>

                        <div className="text-xs text-[var(--text-muted)]">
                          SKU: {product.sku || 'N/A'}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {product.category_name}
                      </td>

                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-[var(--text-primary)]">
                          ₹{product.price}
                        </div>

                        {product.sale_price ? (
                          <div className="text-xs text-emerald-400">
                            Sale ₹{product.sale_price}
                          </div>
                        ) : null}
                      </td>

                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {product.stock}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            product.status
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {product.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() => openModal(product)}
                            className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-lg"
                          >

                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                          >
                                                        <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center">

            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] disabled:opacity-40"
            >
              Prev
            </button>

            <div className="text-sm text-[var(--text-secondary)]">
              {page} / {totalPages}
            </div>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4">

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl w-full max-w-2xl overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">

              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {editingProduct ? 'Update Product' : 'Create Product'}
              </h2>

              <button
                onClick={closeModal}
                className="text-[var(--text-muted)]"
              >
                ✕
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">

                {/* CATEGORY */}
                <div>
                  <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                    Category
                  </label>

                  <select
                    required
                    value={formData.category_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category_id: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                  >
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* NAME */}
                <div>
                  <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                    Product Name
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                  />
                </div>

                {/* SLUG */}
                <div>
                  <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                    Slug
                  </label>

                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                    Short Description
                  </label>

                  <textarea
                    rows={3}
                    value={formData.short_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        short_description: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                  />
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Price
                    </label>

                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Sale Price
                    </label>

                    <input
                      type="number"
                      value={formData.sale_price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sale_price: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      SKU
                    </label>

                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sku: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Stock
                    </label>

                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                    />
                  </div>

                </div>

                {/* IMAGE */}
                <div>
                  <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                    Image URL
                  </label>

                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                  />
                </div>

                {/* STATUS */}
                <div>
                  <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                    Status
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>

              </div>

              {/* FOOTER */}
              <div className="p-5 border-t border-[var(--border-color)] flex gap-3">

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl btn-primary text-white font-semibold"
                >
                  {editingProduct ? 'Update Product' : 'Save Product'}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
}