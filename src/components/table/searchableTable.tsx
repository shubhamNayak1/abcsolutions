import React, { useState } from 'react';
import './searchableTable.css';

interface SearchableTableProps {
  data: { [key: string]: any }[];
  columns: string[];
  columnLabels: { [key: string]: string };
  onTrainingNameClick?: (row: { [key: string]: any }) => void; // Optional prop
}

const SearchableTable: React.FC<SearchableTableProps> = ({
  data,
  columns,
  columnLabels,
  onTrainingNameClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) =>
    columns.some((column) =>
      row[column]?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="searchable-table">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <table>
        <thead>
          {onTrainingNameClick !== undefined ? (
            <tr>
              <th>Select</th>
              {columns.map((column) => (
                <th key={column}>{columnLabels[column]}</th>
              ))}
            </tr>
          ) : (
            <tr>
              {columns.map((column) => (
                <th key={column}>{columnLabels[column]}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {filteredData.slice(0, 100).map((row, index) => (
            <tr key={index}>
              {onTrainingNameClick !== undefined ? (
                <td>
                  <span
                    className="clickable select-column"
                    onClick={() => onTrainingNameClick && onTrainingNameClick(row)}
                  >
                    Select
                  </span>
                </td>
              ) : (
                <></>
              )}
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {filteredData.length === 0 ? (
        <div className="noRecordFound">....No&nbsp;Record&nbsp;Found....</div>
      ) : null}
    </div>
  );
};

export default SearchableTable;
