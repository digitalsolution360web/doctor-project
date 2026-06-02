'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
}

interface ModelItem {
  id: number;
  product_id: number;
  product_name: string;
  model_name: string;
  model_number: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  image: string;
  status: number;
  created_at: string;
}

export default function ModelsPage() {
  const [models, setModels] = useState<ModelItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingModel, setEditingModel] = useState<ModelItem | null>(null);

  const [formData, setFormData] = useState({
    product_id: '',
    model_name: '',
    model_number: '',
    color: '',
    size: '',
    price: '',
    stock: '',
    image: '',
    status: '1',
  });

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchModels();
  }, [page, search]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchModels = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/models?page=${page}&limit=${limit}&search=${search}`
      );

      const data = await res.json();

      setModels(data.data || []);
      setTotal(data.total || 0);

      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products/list');
      const data = await res.json();

      setProducts(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (model?: ModelItem) => {
    if (model) {
      setEditingModel(model);

      setFormData({
        product_id: String(model.product_id),
        model_name: model.model_name || '',
        model_number: model.model_number || '',
        color: model.color || '',
        size: model.size || '',
        price: String(model.price || ''),
        stock: String(model.stock || ''),
        image: model.image || '',
        status: String(model.status),
      });
    } else {
      setEditingModel(null);

      setFormData({
        product_id: '',
        model_name: '',
        model_number: '',
        color: '',
        size: '',
        price: '',
        stock: '',
        image: '',
        status: '1',
      });
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingModel(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingModel ? 'PUT' : 'POST';

    const body = editingModel
      ? {
          ...formData,
          id: editingModel.id,
        }
      : formData;

    const res = await fetch('/api/models', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      fetchModels();
      closeModal();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this model?')) {
      const res = await fetch(`/api/models?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchModels();
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
              Models
            </h1>

            <p className="text-[var(--text-secondary)] text-sm mt-1">
              Manage product models and variants.
            </p>
          </div>

          <button
            onClick={() => openModal()}
            className="btn-primary flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white w-full sm:w-auto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>

            Add Model
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.2)] rounded-xl text-[var(--accent-rose)] text-xs">
            Failed to load models.
          </div>
        )}

        {/* SEARCH */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search models..."
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
                  <th className="px-5 py-4">Model</th>
                  <th className="px-5 py-4">Product</th>
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
                        <div className="h-4 w-8 skeleton" />
                      </td>
                    </tr>
                  ))
                ) : models.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center text-[var(--text-secondary)]">
                      No models found.
                    </td>
                  </tr>
                ) : (
                  models.map((model) => (
                    <tr key={model.id} className="table-row group">

                      <td className="px-5 py-4 text-xs text-[var(--text-muted)]">
                        #{model.id}
                      </td>

                      <td className="px-5 py-4">
                        {model.image ? (
                          <img
                            src={model.image}
                            alt={model.model_name}
                            className="w-12 h-12 rounded-lg object-cover border border-[var(--border-color)]"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]" />
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-semibold text-[var(--text-primary)]">
                          {model.model_name}
                        </div>

                        <div className="text-xs text-[var(--text-muted)]">
                          {model.model_number || 'No model number'}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {model.product_name}
                      </td>

                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        ₹{model.price}
                      </td>

                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {model.stock}
                      </td>

                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          model.status
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {model.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() => openModal(model)}
                            className="p-2 text-[var(--accent-sky)] hover:bg-[rgba(14,165,233,0.1)] rounded-lg"
                          >
                            ✏️
                          </button>

                          <button
                            onClick={() => handleDelete(model.id)}
                            className="p-2 text-[var(--accent-rose)] hover:bg-[rgba(244,63,94,0.1)] rounded-lg"
                          >
                            🗑️
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

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl w-full max-w-2xl overflow-hidden">

            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {editingModel ? 'Update Model' : 'Add Model'}
              </h2>

              <button
                onClick={closeModal}
                className="text-[var(--text-muted)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
                    Product
                  </label>

                  <select
                    required
                    value={formData.product_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        product_id: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm"
                  >
                    <option value="">Select Product</option>

                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
                    Model Name
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.model_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        model_name: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
                    Model Number
                  </label>

                  <input
                    type="text"
                    value={formData.model_number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        model_number: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
                    Color
                  </label>

                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        color: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
                    Size
                  </label>

                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        size: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
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
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
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
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs mb-2 text-[var(--text-secondary)]">
                    Status
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
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
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm"
                  />
                </div>

              </div>

              <div className="p-5 border-t border-[var(--border-color)] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-primary px-5 py-2.5 rounded-xl text-white font-semibold"
                >
                  {editingModel ? 'Update Model' : 'Save Model'}
                </button>
              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
}