import Skeleton from "../Skeleton";

export const StatsSkeleton = () => (
  <div className="admin-stats-grid">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="admin-card stats-card" style={{ height: "120px" }}>
        <Skeleton width="40px" height="40px" borderRadius="10px" className="mb-4" />
        <Skeleton width="60%" height="24px" className="mb-2" />
        <Skeleton width="40%" height="32px" />
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="admin-card">
    <div className="flex justify-between items-center mb-6 px-4 pt-4">
      <Skeleton width="200px" height="40px" />
      <Skeleton width="150px" height="40px" />
    </div>
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th key={i}>
                <Skeleton width="80px" height="20px" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex}>
                  <Skeleton width="100%" height="20px" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const ListSkeleton = ({ count = 5 }) => (
  <div className="admin-card">
    <div className="mb-4">
      <Skeleton width="150px" height="24px" />
    </div>
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
          <div className="flex-1 mr-4">
            <Skeleton width="70%" height="20px" className="mb-2" />
            <Skeleton width="40%" height="16px" />
          </div>
          <Skeleton width="80px" height="24px" borderRadius="12px" />
        </div>
      ))}
    </div>
  </div>
);
