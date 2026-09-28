import { useStoreState, useStoreActions } from 'easy-peasy';

export default function Pagination() {
  const currentPage = useStoreState((s) => s.users.currentPage);
  const totalPages = useStoreState((s) => s.users.totalPages);
  const pageSize = useStoreState((s) => s.users.pageSize);
  const total = useStoreState((s) => s.users.filteredItems.length);
  const setPage = useStoreActions((a) => a.users.setPage);
  const setPageSize = useStoreActions((a) => a.users.setPageSize);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <span className="muted">{total} result{total !== 1 && 's'}</span>

      <div className="pages">
        <button
          className="btn"
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
        >
          ← Prev
        </button>

        {pages.map((p) => (
          <button
            key={p}
            className={`btn ${p === currentPage ? 'btn-primary' : ''}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        <button
          className="btn"
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
        >
          Next →
        </button>
      </div>

      <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
        <option value={5}>5 / page</option>
        <option value={10}>10 / page</option>
        <option value={20}>20 / page</option>
      </select>
    </div>
  );
}