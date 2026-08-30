'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false }
);

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  category_id: number;
  category_name: string;
  name: string;
  h1_title: string;
  slug: string;
  image: string;
  moq: number;
  packaging_size: string;
  packaging_type: string;
  customized_formulations: number;
  private_labeling: number;
  turnkey_solutions: number;
  benefits: string;
  description: string;
  ingredients: string;
  meta_title: string;
  meta_description: string;
  status: string;
  created_at: string;
  updated_at: string;
}
interface FAQ {
  id: number;
  product_id: number;
  question: string;
  answer: string;
  serial_no: number;
  created_at: string;
  updated_at: string;
}
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showHtmlEditor, setShowHtmlEditor] = useState(false);
const [htmlContent, setHtmlContent] = useState('');

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loadingFAQs, setLoadingFAQs] = useState(false);
  const [ingredientsList, setIngredientsList] = useState<Array<{id: string, name: string}>>([]);
  const [ingredientsLoading, setIngredientsLoading] = useState(false);

  const [formData, setFormData] = useState({
    category_id: '',
    name: '',
    slug: '',
    image: '',
    moq: '',
    packaging_size: '',
    packaging_type: '',
    customized_formulations: 0,
    private_labeling: 0,
    turnkey_solutions: 0,
    benefits: '',
    description: '',
    meta_title: '',
    meta_description: '',
    status: 'active',
    h1_title: '',
    ingredients: [] as string[],
  });
  const [faqFormData, setFaqFormData] = useState({
    product_id: '',
    question: '',
    answer: '',
    serial_no: 0,
  });

  const limit = 10;

  const totalPages = Math.ceil(total / limit);


  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  useEffect(() => {
    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    setIngredientsLoading(true);
  try {
    const res = await fetch('/api/ingredients?limit=1000');
    const data = await res.json();
     setIngredientsList(data.data.map((item: any) => ({
      id: String(item.id),   
      name: item.name,
    })));
  } catch (err) {
    console.error('Failed to load ingredients:', err);
  }
  finally {
    setIngredientsLoading(false);
  }
};

  const [modules, setModules] = useState<any>({
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'video'],
    ['clean']
  ]
});

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
   const fetchFAQs = async (productId: number) => {
    setLoadingFAQs(true);
    try {
      const res = await fetch(`/api/product-faqs?productId=${productId}`);
      const data = await res.json();
      setFaqs(data.data || []);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoadingFAQs(false);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      const ingredientArray = product.ingredients ? product.ingredients.split(',') : [];
      setFormData({
        category_id: String(product.category_id),
        name: product.name || '',
        slug: product.slug || '',
        image: product.image || '',
        moq: String(product.moq || ''),
        packaging_size: product.packaging_size || '',
        packaging_type: product.packaging_type || '',
        customized_formulations: product.customized_formulations,
        private_labeling: product.private_labeling,
        turnkey_solutions: product.turnkey_solutions,
        benefits: product.benefits || '',
        description: product.description || '',
        meta_title: product.meta_title || '',
        meta_description: product.meta_description || '',
        status: product.status,
        h1_title: product.h1_title || '',
        ingredients: ingredientArray,
      });
    } else {
      setEditingProduct(null);

      setFormData({
        category_id: '',
        name: '',
        slug: '',
        image: '',
        moq: '',
        packaging_size: '',
        packaging_type: '',
        customized_formulations: 0,
        private_labeling: 0,
        h1_title: '',
        turnkey_solutions: 0,
        benefits: '',
        description: '',
        meta_title: '',
        meta_description: '',
        status: 'active',
        ingredients: [],
      });
    }

    setShowModal(true);
  };

  const closeModal = () => {
  setShowModal(false);
  setEditingProduct(null);
  setFaqs([]);
  setShowHtmlEditor(false); // Add this
  setHtmlContent(''); // Add this
};

  const openFAQModal = (product: Product) => {
    setEditingProduct(product);
    fetchFAQs(product.id);
    setFaqFormData({
    ...faqFormData,
    product_id: String(product.id),
  });
    setShowFAQModal(true);
  };

  const closeFAQModal = () => {
    setShowFAQModal(false);
    setEditingFAQ(null);
    setFaqs([]);
    setFaqFormData({
      product_id: '',
      question: '',
      answer: '',
      serial_no: 0,
    });
  };

  const openEditFAQ = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFaqFormData({
      product_id: String(faq.product_id),
      question: faq.question,
      answer: faq.answer,
      serial_no: faq.serial_no,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingProduct ? 'PUT' : 'POST';
     const submitData = {
    ...formData,
    ingredients: formData.ingredients.join(','), // Convert array to string
  };
    const body = editingProduct
      ? {
          ...submitData,
          id: editingProduct.id,
        }
      : submitData;

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
  const handleFAQSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingFAQ ? 'PUT' : 'POST';
    const body = editingFAQ
      ? {
          ...faqFormData,
          id: editingFAQ.id,
        }
      : faqFormData;

    const res = await fetch('/api/product-faqs', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      if (editingProduct) {
        fetchFAQs(editingProduct.id);
      }
      setEditingFAQ(null);
      setFaqFormData({
        product_id: faqFormData.product_id,
        question: '',
        answer: '',
        serial_no: 0,
      });
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    if (!confirm('Delete this FAQ?')) return;

    const res = await fetch(`/api/product-faqs?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok && editingProduct) {
      fetchFAQs(editingProduct.id);
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
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Image</th>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">MOQ</th>
                  <th className="px-5 py-4">Packaging</th>
                  <th className="px-5 py-4">Ingredients</th>
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
                        <div className="h-4 w-20 skeleton" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-4 w-24 skeleton" />
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
                      colSpan={8}
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
                      <td className="px-5 py-4 text-xs text-[var(--text-muted)]">
                        #{product.id}
                      </td>
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
                        <div className="text-xs text-[var(--text-muted)] mt-1">
                          {product.slug || 'No slug'}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {product.category_name}
                      </td>

                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {product.moq || 'N/A'}
                      </td>

                      <td className="px-5 py-4">
                        <div className="text-xs text-[var(--text-secondary)]">
                          <div>{product.packaging_size || 'N/A'}</div>
                          <div className="text-[10px] text-[var(--text-muted)]">
                            {product.packaging_type || 'No type'}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {product.ingredients && (
                            <span className="px-1.5 py-0.5 bg-purple-500/10 text-purple-400 rounded text-[9px] font-medium">
                              Yes
                            </span>
                          )}
                          {product.ingredients == null && (
                            <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[9px] font-medium">
                              No
                            </span>
                          )}
                          {/* {product.turnkey_solutions == 1 && (
                            <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[9px] font-medium">
                              Turnkey
                            </span>
                          )}
                          {product.customized_formulations == 0 && 
                           product.private_labeling == 0 && 
                           product.turnkey_solutions == 0 && (
                            <span className="text-[10px] text-[var(--text-muted)]">None</span>
                          )} */}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            product.status == "active"
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {product.status == "active" ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                            <button
                            onClick={() => openFAQModal(product)}
                            className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg"
                            title="Manage FAQs"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                              <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                          </button>
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
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {editingProduct ? 'Update Product' : 'Create Product'}
              </h2>
              <button
                onClick={closeModal}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4 max-h-[calc(80vh-120px)] overflow-y-auto">
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* CATEGORY */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Category <span className="text-red-400">*</span>
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
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* NAME */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Product Name <span className="text-red-400">*</span>
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
                          slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      placeholder="auto-generated from name"
                    />
                  </div>

                  {/* IMAGE URL */}
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
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* h1 title */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      H1 Title
                    </label>
                    <input
                      type="text"
                      value={formData.h1_title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          h1_title: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      placeholder="H1 Title"
                    />
                  </div>
                  {/* MOQ */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Minimum Order Quantity (MOQ)
                    </label>
                    <input
                      type="number"
                      value={formData.moq}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          moq: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      placeholder="0"
                    />
                  </div>

                  {/* PACKAGING SIZE */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Packaging Size
                    </label>
                    <input
                      type="text"
                      value={formData.packaging_size}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          packaging_size: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      placeholder="e.g., 250ml, 500g, 1kg"
                    />
                  </div>

                  {/* PACKAGING TYPE */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Packaging Type
                    </label>
                    
                    <input
                      type="text"
                      value={formData.packaging_type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          packaging_type: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      placeholder="e.g., Bottle, Pouch, Box"
                    />
                  </div>

                </div>

                {/* Services Section */}
                <div className="border-t border-[var(--border-color)] pt-4">
                  <label className="block text-xs font-bold mb-3 text-[var(--text-secondary)] uppercase">
                    Available Services
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.customized_formulations == 1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customized_formulations: e.target.checked ? 1 : 0,
                          })
                        }
                        className="w-4 h-4 rounded border-[var(--border-color)]"
                      />
                      <span className="text-sm text-[var(--text-primary)]">Customized Formulations</span>
                    </label>
                    
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.private_labeling == 1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            private_labeling: e.target.checked ? 1 : 0,
                          })
                        }
                        className="w-4 h-4 rounded border-[var(--border-color)]"
                      />
                      <span className="text-sm text-[var(--text-primary)]">Private Labeling</span>
                    </label>
                    
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.turnkey_solutions == 1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            turnkey_solutions: e.target.checked ? 1 : 0,
                          })
                        }
                        className="w-4 h-4 rounded border-[var(--border-color)]"
                      />
                      <span className="text-sm text-[var(--text-primary)]">Turnkey Solutions</span>
                    </label>
                  </div>
                </div>

                {/* BENEFITS */}
                <div>
                  <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                    Benefits
                  </label>
                  <textarea
                    rows={3}
                    value={formData.benefits}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        benefits: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                    placeholder="List product benefits (one per line)"
                  />
                </div>
                      {/* INGREDIENTS - Multi-select */}
{/* INGREDIENTS - Checkbox Grid */}
<div className="md:col-span-2">
  <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
    Ingredients
  </label>
  {ingredientsLoading ? (
  <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 text-center text-[var(--text-muted)]">
    <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-blue-600 border-r-transparent"></div>
    <span className="ml-2 text-sm">Loading ingredients...</span>
  </div>
) : (
  <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-4 max-h-[200px] overflow-y-auto">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {ingredientsList.map((ingredient) => (
        <label
          key={ingredient.id}
          className="flex items-center gap-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-primary)] p-1.5 rounded-lg cursor-pointer transition-colors"
        >
          <input
            type="checkbox"
            checked={formData.ingredients.includes(ingredient.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setFormData({
                  ...formData,
                  ingredients: [...formData.ingredients, ingredient.id],
                });
              } else {
                setFormData({
                  ...formData,
                  ingredients: formData.ingredients.filter((s) => s !== ingredient.id),
                });
              }
            }}
            className="w-4 h-4 rounded border-[var(--border-color)] text-blue-600 focus:ring-blue-500"
          />
          <span className="font-medium">{ingredient.name}</span>
        </label>
      ))}
    </div>
  </div>
)}
  {/* Selected Ingredients Tags */}
  {formData.ingredients.length > 0 && (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {formData.ingredients.map((id) => {
        const ingredient = ingredientsList.find((i) => i.id === id);
        return ingredient ? (
          <span
            key={id}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200/30"
          >
            {ingredient.name}
            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  ingredients: formData.ingredients.filter((s) => s !== id),
                });
              }}
              className="hover:text-red-500 transition-colors ml-0.5"
            >
              ×
            </button>
          </span>
        ) : null;
      })}
      <button
        type="button"
        onClick={() => setFormData({ ...formData, ingredients: [] })}
        className="text-xs text-red-400 hover:text-red-500 font-medium ml-1"
      >
        Clear all
      </button>
    </div>
  )}
  <p className="text-xs text-[var(--text-muted)] mt-1.5">
    Select all ingredients that apply to this product.
  </p>
</div>
{/* DESCRIPTION */}
<div>
  <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
    Full Description
  </label>
  
  {/* Toolbar buttons */}
  <div className="flex items-center gap-2 mb-2">
    <button
      type="button"
      onClick={() => {
        if (!showHtmlEditor) {
          setHtmlContent(formData.description);
        }
        setShowHtmlEditor(!showHtmlEditor);
      }}
      className="px-3 py-1.5 text-xs font-medium bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
    >
      {showHtmlEditor ? 'Hide HTML' : 'View HTML'}
    </button>
    <span className="text-xs text-[var(--text-muted)]">
      {showHtmlEditor ? 'Editing raw HTML' : 'Visual editor'}
    </span>
  </div>

  {/* Visual Editor */}
  {!showHtmlEditor && (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden">
      <ReactQuill
        theme="snow"
        value={formData.description}
        onChange={(value) =>
          setFormData({
            ...formData,
            description: value,
          })
        }
        modules={modules}
        placeholder="Detailed product description"
      />
    </div>
  )}

  {/* HTML Editor */}
  {showHtmlEditor && (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">
          HTML Editor
        </span>
        <button
          type="button"
          onClick={() => {
            setShowHtmlEditor(false);
            setHtmlContent('');
          }}
          className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <textarea
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        className="w-full min-h-[300px] p-4 bg-[var(--bg-secondary)] text-[var(--text-primary)] font-mono text-sm resize-none focus:outline-none"
        placeholder="Enter HTML content..."
        spellCheck={false}
      />
      <div className="flex items-center justify-end gap-3 p-3 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
        <button
          type="button"
          onClick={() => {
            setShowHtmlEditor(false);
            setHtmlContent('');
          }}
          className="px-4 py-1.5 text-sm bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            setFormData({
              ...formData,
              description: htmlContent,
            });
            setShowHtmlEditor(false);
            setHtmlContent('');
          }}
          className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Apply HTML
        </button>
      </div>
    </div>
  )}
</div>

                {/* SEO Section */}
                <div className="border-t border-[var(--border-color)] pt-4">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">SEO Settings</h3>
                  
                  {/* META TITLE */}
                  <div className="mb-3">
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
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
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      
                      placeholder="SEO title"
                    />
                  </div>

                  {/* META DESCRIPTION */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Meta Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.meta_description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          meta_description: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      
                      placeholder="SEO description"
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
                          status: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* FOOTER */}
              <div className="p-5 border-t border-[var(--border-color)] flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition-colors"
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
      {/* FAQ MODAL */}
      {showFAQModal && editingProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  Manage FAQs
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  For: {editingProduct.name}
                </p>
              </div>
              <button
                onClick={closeFAQModal}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            </div>

            <div className="p-6 max-h-[calc(80vh-120px)] overflow-y-auto">
              
              {/* FAQ Form */}
              <form onSubmit={handleFAQSubmit} className="mb-8 p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                  {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Question <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={faqFormData.question}
                      onChange={(e) =>
                        setFaqFormData({
                          ...faqFormData,
                          question: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      placeholder="Enter FAQ question"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Answer <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={faqFormData.answer}
                      onChange={(e) =>
                        setFaqFormData({
                          ...faqFormData,
                          answer: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      placeholder="Enter FAQ answer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Serial Number
                    </label>
                    <input
                      type="number"
                      value={faqFormData.serial_no}
                      onChange={(e) =>
                        setFaqFormData({
                          ...faqFormData,
                          serial_no: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl btn-primary text-white font-semibold"
                    >
                      {editingFAQ ? 'Update FAQ' : 'Add FAQ'}
                    </button>
                    {editingFAQ && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFAQ(null);
                          setFaqFormData({
                            product_id: String(editingProduct.id),
                            question: '',
                            answer: '',
                            serial_no: 0,
                          });
                        }}
                        className="px-6 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition-colors"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* FAQ List */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                  Existing FAQs ({faqs.length})
                </h3>
                
                {loadingFAQs ? (
                  <div className="text-center py-8 text-[var(--text-secondary)]">
                    Loading FAQs...
                  </div>
                ) : faqs.length === 0 ? (
                  <div className="text-center py-8 text-[var(--text-secondary)]">
                    No FAQs added yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-[var(--text-muted)]">
                                #{faq.serial_no || '0'}
                              </span>
                              <h4 className="font-semibold text-[var(--text-primary)]">
                                {faq.question}
                              </h4>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)]">
                              {faq.answer}
                            </p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => openEditFAQ(faq)}
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
                              onClick={() => handleDeleteFAQ(faq.id)}
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
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* FOOTER */}
            <div className="p-5 border-t border-[var(--border-color)] flex justify-end">
              <button
                onClick={closeFAQModal}
                className="px-6 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:bg-[var(--bg-primary)] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}