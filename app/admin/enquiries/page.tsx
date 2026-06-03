'use client';

import { useEffect, useState } from 'react';

interface Enquiry {
  id: number;
  name: string;
  phone: string;
  company: string | null;
  email: string | null;
  product_type: string | null;
  qty: string | null;
  message: string | null;
  created_at: string;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);


  const limit = 10;
  const totalPages = Math.ceil(total / limit);

 

  const fetchEnquiries = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/enquiries?page=${page}&limit=${limit}`
      );
    

      const data = await res.json();

      setEnquiries(data.data || []);
      setTotal(data.pagination?.totalRecords || 0);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  fetchEnquiries();
}, [page]);



  const handleDelete = async (id: number) => {
    if (confirm('Delete this enquiry?')) {
      const res = await fetch(`/api/enquiries?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchEnquiries();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete enquiry');
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
              Enquiries
            </h1>
          </div>

 
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.2)] rounded-xl text-red-400 text-xs">
            Failed to load enquiries.
          </div>
        )}
      

      

        {/* TABLE */}
        <div className="hidden md:block bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-2xl mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--bg-primary)] text-left text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Product Type</th>
                  <th className="px-5 py-4">Qty</th>
                  <th className="px-5 py-4">Message</th>
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
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-6 py-16 text-center text-[var(--text-secondary)]"
                    >
                      No enquiries found.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="table-row">
                      <td className="px-5 py-4 text-xs text-[var(--text-muted)]">
                        #{enquiry.id}
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-semibold text-[var(--text-primary)]">
                          {enquiry.name}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {enquiry.phone}
                      </td>
<td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {enquiry.company}
                      </td>
                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {enquiry.email}
                      </td>
                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {enquiry.product_type}
                      </td>
                      <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                        {enquiry.qty}
                      </td>
                      <td className="px-5 py-4 max-w-xs break-words text-sm text-[var(--text-secondary)]">
                    {enquiry.message}
                    </td>
                      

                      <td className="px-5 py-4 text-xs text-[var(--text-muted)]">
                        {new Date(enquiry.created_at).toLocaleDateString(
                          'en-GB'
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">


                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(enquiry.id)}
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

    </>
  );
}