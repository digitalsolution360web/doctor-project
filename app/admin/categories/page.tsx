'use client';

import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  paragraph: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: '',
    paragraph: '',
    meta_title: '',
    meta_description: '',
    status: 'active' as 'active' | 'inactive',
  });

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchCategories();
  }, [page, search]);

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/categories?page=${page}&limit=${limit}&search=${search}`
      );

      const data = await res.json();

      setCategories(data.data || []);
      setTotal(data.total || 0);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (category?: Category) => {
    if (!category) {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        image: '',
        paragraph: '',
        meta_title: '',
        meta_description: '',
        status: 'active',
      });
      setShowModal(true);
      return;
    }

    try {
      const res = await fetch(`/api/categories?id=${category.id}`);
      const data = await res.json();

      setEditingCategory(category);
      setFormData({
        name: data.category.name || '',
        slug: data.category.slug || '',
        image: data.category.image || '',
        paragraph: data.category.paragraph || '',
        meta_title: data.category.meta_title || '',
        meta_description: data.category.meta_description || '',
        status: data.category.status || 'active',
      });
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...(editingCategory && { id: editingCategory.id }),
      name: formData.name,
      slug: formData.slug,
      image: formData.image || null,
      paragraph: formData.paragraph || null,
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      status: formData.status,
    };

    const res = await fetch('/api/categories', {
      method: editingCategory ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fetchCategories();
      closeModal();
    } else {
      const error = await res.json();
      alert(error.error || 'Failed to save category');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this category? This will also delete all products in this category.')) {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchCategories();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete category');
      }
    }
  };

  return (
    <>
      <div className="animate-fade-in pb-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Categories
            </h1>

            <p className="text-[var(--text-secondary)] text-sm mt-1">
              Manage product categories.
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

            Add Category
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.2)] rounded-xl text-red-400 text-xs">
            Failed to load categories.
          </div>
        )}
      

        {/* SEARCH */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search category..."
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
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Image</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Slug</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                 </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border-color)]">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-5 py-4">
                        <div className="h-4 w-8 skeleton" />
                       </td>
                     </tr>
                  ))
                ) : categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-16 text-center text-[var(--text-secondary)]"
                    >
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="table-row">
                      <td className="px-5 py-4 text-xs text-[var(--text-muted)]">
                        #{category.id}
                      </td>

                      <td className="px-5 py-4">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-12 h-12 rounded-lg object-cover border border-[var(--border-color)]"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-xs text-[var(--text-muted)]">
                            N/A
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-semibold text-[var(--text-primary)]">
                          {category.name}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {category.slug}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            category.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {category.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-xs text-[var(--text-muted)]">
                        {new Date(category.created_at).toLocaleDateString(
                          'en-GB'
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">

                          {/* EDIT */}
                          <button
                            onClick={() => openModal(category)}
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

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(category.id)}
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
          <div className="flex justify-between items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-[var(--bg-secondary)] disabled:opacity-40"
            >
              Prev
            </button>

            <div className="text-sm text-[var(--text-secondary)]">
              {page} / {totalPages}
            </div>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-[var(--bg-secondary)] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl w-full max-w-2xl overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {editingCategory ? 'Update Category' : 'Create Category'}
              </h2>

              <button
                onClick={closeModal}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* NAME */}
                  <div>
                    <label className="block text-xs mb-2 text-[var(--text-secondary)] font-medium">
                      Name *
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
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  {/* SLUG */}
                  <div>
                    <label className="block text-xs mb-2 text-[var(--text-secondary)] font-medium">
                      Slug *
                    </label>

                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-sky-500"
                    />
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      URL-friendly version of the name (auto-formatted)
                    </p>
                  </div>

                  {/* IMAGE */}
                  <div>
                    <label className="block text-xs mb-2 text-[var(--text-secondary)] font-medium">
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
                      placeholder="https://example.com/image.jpg"
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  

                  {/* META TITLE */}
                  <div>
                    <label className="block text-xs mb-2 text-[var(--text-secondary)] font-medium">
                      Meta Title
                    </label>

                    <input
                      type="text"
                      value={formData.meta_title || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          meta_title: e.target.value,
                        })
                      }
                      maxLength={200}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-sky-500"
                    />
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {formData.meta_title?.length || 0}/200 characters
                    </p>
                  </div>

                  {/* META DESCRIPTION */}
                  <div>
                    <label className="block text-xs mb-2 text-[var(--text-secondary)] font-medium">
                      Meta Description
                    </label>

                    <input
                      type="text"
                      value={formData.meta_description || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          meta_description: e.target.value,
                        })
                      }
                      maxLength={255}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-sky-500"
                    />
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {formData.meta_description?.length || 0}/255 characters
                    </p>
                  </div>

                  {/* STATUS */}
                  <div>
                    <label className="block text-xs mb-2 text-[var(--text-secondary)] font-medium">
                      Status
                    </label>

                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as 'active' | 'inactive',
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-sky-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  {/* PARAGRAPH */}
                  <div className="md:col-span-2">
                    <label className="block text-xs mb-2 text-[var(--text-secondary)] font-medium">
                      Paragraph / Short Description
                    </label>

                    <textarea
                      rows={3}
                      value={formData.paragraph || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paragraph: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] resize-none focus:outline-none focus:border-sky-500"
                    />
                  </div>

                </div>
              </div>
              

              {/* FOOTER */}
              <div className="p-5 border-t border-[var(--border-color)] flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-primary)] transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl btn-primary text-white font-semibold"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}