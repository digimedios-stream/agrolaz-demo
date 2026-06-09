import { ChevronLeft, ChevronRight } from 'lucide-react';
import './DataTable.css';

export default function DataTable({
  columns,
  data,
  currentPage = 1,
  totalItems = 0,
  pageSize = 5,
  onPageChange,
  emptyMessage = 'No hay datos disponibles',
  className = '',
}) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={`data-table-wrapper ${className}`}>
      <div className="data-table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} style={col.width ? { width: col.width } : {}}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="data-table__empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr key={row.id || rowIdx}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && onPageChange && (
        <div className="data-table__pagination">
          <span className="data-table__info">
            Mostrando {startItem}-{endItem} de {totalItems}
          </span>
          <div className="data-table__pages">
            <button
              className="data-table__page-btn"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`data-table__page-btn ${page === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="data-table__page-btn"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
