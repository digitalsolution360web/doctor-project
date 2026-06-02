'use client';

import { useEffect, useState } from 'react';

interface Category {
  id: number;
  slug: string;
  image: string;
  meta_title: string;
  meta_description: string;
  status: number;
  created_at: string;
  updated_at?: string;

  name: string;
  h1_title: string;
  description: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeLang, setActiveLang] = useState('en');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
  slug: '',
  image: '',
  meta_title: '',
  meta_description: '',
  status: 1,

  en: {
    name: '',
    h1_title: '',
    description: '',
  },

  es: {
    name: '',
    h1_title: '',
    description: '',
  },
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
  slug: '',
  image: '',
  meta_title: '',
  meta_description: '',
  status: 1,

  en: {
    name: '',
    h1_title: '',
    description: '',
  },

  es: {
    name: '',
    h1_title: '',
    description: '',
  },
});

    setShowModal(true);
    return;
  }

  try {
    const res = await fetch(`/api/categories?id=${category.id}`);
    const data = await res.json();

const en =
  data.translations?.find(
    (t: any) => t.language_code === 'en'
  ) || {};

const es =
  data.translations?.find(
    (t: any) => t.language_code === 'es'
  ) || {};

    setEditingCategory(category);

   setFormData({
  slug: data.category.slug || '',
  image: data.category.image || '',
  meta_title: data.category.meta_title || '',
  meta_description: data.category.meta_description || '',
  status: data.category.status,

  en: {
    name: en.name || '',
    h1_title: en.h1_title || '',
    description: en.description || '',
  },

  es: {
    name: es.name || '',
    h1_title: es.h1_title || '',
    description: es.description || '',
  },
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

  slug: formData.slug,
  image: formData.image,
  meta_title: formData.meta_title,
  meta_description: formData.meta_description,
  status: formData.status,

  translations: [
    {
      language_code: 'en',
      name: formData.en.name,
      h1_title: formData.en.h1_title,
      description: formData.en.description,
    },
    {
      language_code: 'es',
      name: formData.es.name,
      h1_title: formData.es.h1_title,
      description: formData.es.description,
    },
  ],
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
  }
};

  const handleDelete = async (id: number) => {
    if (confirm('Delete this category?')) {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchCategories();
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
                            category.status
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {category.status ? 'Active' : 'Inactive'}
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
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl w-full lg:max-w-[900px] max-w-[800px] overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {editingCategory ? 'Update Category' : 'Create Category'}
              </h2>

              <button
                onClick={closeModal}
                className="text-[var(--text-muted)]"
              >
                ✕
              </button>
            </div>
<div className="px-6 pt-5">
  <div className="inline-flex bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-1">

    <button
      type="button"
      onClick={() => setActiveLang('en')}
      className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        activeLang === 'en'
          ? 'btn-primary text-white shadow-md'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
      }`}
    >
      🇺🇸 English
    </button>

    <button
      type="button"
      onClick={() => setActiveLang('es')}
      className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        activeLang === 'es'
          ? 'btn-primary text-white shadow-md'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
      }`}
    >
      🇪🇸 Spanish
    </button>

  </div>
</div>
            {/* FORM */}
            <form onSubmit={handleSubmit}>

             <div className="p-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {/* NAME */}
                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
                    Name
                  </label>

                  <input
                    type="text"
                    required
                    value={formData[activeLang as 'en' | 'es'].name}
onChange={(e) =>
  setFormData({
    ...formData,
    [activeLang]: {
      ...formData[activeLang as 'en' | 'es'],
      name: e.target.value,
    },
  })
}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3"
                  />
                </div>


                {/* SLUG */}
                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
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
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3"
                  />
                </div>
                <div>
  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
    H1 Title
  </label>

  <input
    type="text"
    value={formData[activeLang as 'en' | 'es'].h1_title}
onChange={(e) =>
  setFormData({
    ...formData,
    [activeLang]: {
      ...formData[activeLang as 'en' | 'es'],
      h1_title: e.target.value,
    },
  })
}
    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3"
  />
</div>
                <div>
  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
    Meta Title
  </label>

  <input
    type="text"
    value={formData.meta_title}
    onChange={(e) =>
      setFormData({
        ...formData,
        meta_title: e.target.value,
      })
    }
    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3"
  />
</div>
<div>
  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
    Meta Description
  </label>

  <input
                    type="text"
    value={formData.meta_description}
    onChange={(e) =>
      setFormData({
        ...formData,
        meta_description: e.target.value,
      })
    }
    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3"
  />
</div>

                {/* IMAGE */}
                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
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
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    value={formData[activeLang as 'en' | 'es'].description}
onChange={(e) =>
  setFormData({
    ...formData,
    [activeLang]: {
      ...formData[activeLang as 'en' | 'es'],
      description: e.target.value,
    },
  })
}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 resize-none"
                  />
                </div>

                {/* STATUS */}
                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
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
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>

              </div>

              {/* FOOTER */}
              <div className="p-5 border-t border-[var(--border-color)] flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl bg-[var(--bg-secondary)]"
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
 </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}