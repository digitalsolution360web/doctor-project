'use client';

import { useEffect, useState,  useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useDropzone } from 'react-dropzone';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false }
);

interface Blog {
  id: number;
  h1: string;
  slug: string;
  image: string;
  excerpt: string;
  description: string;
  meta_title: string;
  meta_description: string;
  status: string;
  created_at: string;
  updated_at: string;
}
interface FAQ {
  id: number;
  blog_id: number;
  question: string;
  answer: string;
  serial_no: number;
  created_at: string;
  updated_at: string;
}
export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [showHtmlEditor, setShowHtmlEditor] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loadingFAQs, setLoadingFAQs] = useState(false);

  const [formData, setFormData] = useState({
    h1: '',
    slug: '',
    image: '',
    excerpt: '',
    description: '',
    meta_title: '',
    meta_description: '',
    status: '1',
  });
  const [faqFormData, setFaqFormData] = useState({
    blog_id: '',
    question: '',
    answer: '',
    serial_no: 0,
  });

  const limit = 10;

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

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

  const fetchBlogs = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/blogs?page=${page}&limit=${limit}&search=${search}`
      );

      const data = await res.json();

      setBlogs(data.data || []);
      setTotal(data.total || 0);

      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
    // Image upload handler
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'blogs');
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        // Update the image field with the Cloudflare URL
        setFormData(prev => ({
          ...prev,
          image: data.url
        }));
        alert('Image uploaded successfully!');
      } else {
        alert('Failed to upload image: ' + data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });
   const fetchFAQs = async (blogId: number) => {
    setLoadingFAQs(true);
    try {
      const res = await fetch(`/api/blog-faqs?blogId=${blogId}`);
      const data = await res.json();
      setFaqs(data.data || []);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoadingFAQs(false);
    }
  };

  const openModal = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        h1: String(blog.h1),
        slug: blog.slug || '',
        image: blog.image || '',
        excerpt: blog.excerpt || '',
        description: blog.description || '',
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
        status: String(blog.status),
      });
    } else {
      setEditingBlog(null);

      setFormData({
        h1: '',
        slug: '',
        image: '',
        excerpt: '',
        description: '',
        meta_title: '',
        meta_description: '',
        status: '1',
      });
    }

    setShowModal(true);
  };

  const closeModal = () => {
  setShowModal(false);
  setEditingBlog(null);
  setFaqs([]);
  setShowHtmlEditor(false); // Add this
  setHtmlContent(''); // Add this
};

const openFAQModal = (blog: Blog) => {
    setEditingBlog(blog);
    fetchFAQs(blog.id);
    setFaqFormData({
    ...faqFormData,
    blog_id: String(blog.id),
  });
    setShowFAQModal(true);
  };

  const closeFAQModal = () => {
    setShowFAQModal(false);
    setEditingFAQ(null);
    setFaqs([]);
    setFaqFormData({
      blog_id: '',
      question: '',
      answer: '',
      serial_no: 0,
    });
  };

  const openEditFAQ = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFaqFormData({
      blog_id: String(faq.blog_id),
      question: faq.question,
      answer: faq.answer,
      serial_no: faq.serial_no,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingBlog ? 'PUT' : 'POST';
     const submitData = {
    ...formData,
  };
    const body = editingBlog
      ? {
          ...submitData,
          id: editingBlog.id,
        }
      : submitData;

    const res = await fetch('/api/blogs', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      fetchBlogs();
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

    const res = await fetch('/api/blog-faqs', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      if (editingBlog) {
        fetchFAQs(editingBlog.id);
      }
      setEditingFAQ(null);
      setFaqFormData({
        blog_id: faqFormData.blog_id,
        question: '',
        answer: '',
        serial_no: 0,
      });
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    if (!confirm('Delete this FAQ?')) return;

    const res = await fetch(`/api/blog-faqs?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok && editingBlog) {
      fetchFAQs(editingBlog.id);
    }
  };


  const handleDelete = async (id: number) => {
    if (!confirm('Delete this blog?')) return;

    const res = await fetch(`/api/blogs?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchBlogs();
    }
  };

  return (
    <>
      <div className="animate-fade-in pb-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Blogs
            </h1>

            <p className="text-[var(--text-secondary)] text-sm mt-1">
              Manage all blogs.
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

            Add Blog
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
            Failed to fetch blogs.
          </div>
        )}

        {/* SEARCH */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search blogs..."
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
                  <th className="px-5 py-4">Title</th>
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
                    </tr>
                  ))
                ) : blogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-16 text-center text-[var(--text-secondary)]"
                    >
                      No blogs found.
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4 text-xs text-[var(--text-muted)]">
                        #{blog.id}
                      </td>
                      <td className="px-5 py-4">
                        <img
                          src={blog.image || '/placeholder.png'}
                          className="w-12 h-12 rounded-lg object-cover border border-[var(--border-color)]"
                        />
                      </td>


                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                         {blog.h1}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            blog.status == '1'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {blog.status == '1' ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openFAQModal(blog)}
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
                            onClick={() => openModal(blog)}
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
                            onClick={() => handleDelete(blog.id)}
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
                {editingBlog ? 'Update Blog' : 'Create Blog'}
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
                  
                  {/* TITLE */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Title / H1 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.h1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          h1: e.target.value,
                        })
                      }
                      placeholder="Blog Title / H1"
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
                      placeholder="auto-generated from title"
                    />
                  </div>
                  {/* IMAGE UPLOAD */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Image
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
                      placeholder="Image URL"
                    />
                  </div>

                   {/* IMAGE UPLOAD */}
                  <div className="md:col-span-2 hidden">
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Blog Image
                    </label>
                    
                    {/* Drag & Drop Zone */}
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                        isDragActive 
                          ? 'border-teal-500 bg-teal-500/10' 
                          : 'border-[var(--border-color)] hover:border-teal-500'
                      } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <input {...getInputProps()} />
                      
                      {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <svg className="animate-spin h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-sm text-[var(--text-secondary)]">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <svg className="mx-auto h-12 w-12 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-sm text-[var(--text-secondary)] mt-2">
                            {isDragActive ? 'Drop the image here...' : 'Drag & drop an image here, or click to select'}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] mt-1">
                            Supports: JPG, PNG, GIF, WEBP, SVG (Max 5MB)
                          </p>
                        </>
                      )}
                    </div>

                    {/* Image Preview */}
                    {formData.image && (
                      <div className="hidden mt-3 flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-16 h-16 rounded-lg object-cover border border-[var(--border-color)]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                            {formData.image.split('/').pop() || 'Image uploaded'}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] truncate">
                            {formData.image}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="p-1 text-red-400 hover:text-red-500 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    )}
  {/* OR - Manual URL input */}
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-xs text-[var(--text-muted)]">OR</span>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            image: e.target.value,
                          })
                        }
                        className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-2 px-4 text-sm"
                        placeholder="Enter image URL manually"
                      />
                    </div>
                  </div>


                  {/* excerpt */}
                  <div>
                    <label className="block text-xs font-bold mb-2 text-[var(--text-secondary)] uppercase">
                      Excerpt
                    </label>
                    <input
                      type="text"
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          excerpt: e.target.value,
                        })
                      }
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm"
                      placeholder="Excerpt"
                    />
                  </div>
{/* DESCRIPTION */}
<div className="md:col-span-2">
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
        className="custom-quill"
        modules={modules}
        placeholder="Detailed blog description"
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
                <div className="border-t border-[var(--border-color)] pt-4 md:col-span-2">
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
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
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
                  {editingBlog ? 'Update Blog' : 'Save Blog'}
                </button>
              </div>
              
            </form>
          </div>
        </div>
      )}
     {/* FAQ MODAL */}
      {showFAQModal && editingBlog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  Manage FAQs
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  For: {editingBlog.h1}
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
                            blog_id: String(editingBlog.id),
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