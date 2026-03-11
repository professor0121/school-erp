import React from 'react';

// Define column interface
export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string; // Optional class for column specific styling
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T) => string;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export default function DataTable<T>({ 
  data, 
  columns, 
  keyExtractor, 
  loading = false, 
  emptyMessage = "No data available",
  onRowClick
}: DataTableProps<T>) {

  if (loading) {
    return (
      <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="animate-pulse flex flex-col">
           <div className="h-12 bg-slate-100 border-b border-slate-200"></div>
           {[...Array(5)].map((_, i) => (
             <div key={i} className="h-16 bg-white border-b border-slate-100">
                <div className="flex h-full items-center px-6 gap-4">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse delay-75"></div>
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className={`px-6 py-4 font-semibold ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr 
                  key={keyExtractor(item)} 
                  className={`bg-white border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}>
                      {col.cell 
                        ? col.cell(item) 
                        : col.accessorKey 
                          ? String(item[col.accessorKey]) 
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
