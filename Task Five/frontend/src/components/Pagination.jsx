import React from 'react';

export default function Pagination({ page, setPage, total, limit }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="pagination" style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: '12px' }}>
      <button onClick={() => goTo(page - 1)} disabled={page === 1}>
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button onClick={() => goTo(page + 1)} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}
