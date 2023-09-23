import React from "react";

const ListHeader = ({columns, thKey}) => {
    const formatTableHeading = (word) => {
      return word
        .split(/(?=[A-Z])/)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ) // Capitalize first letter, lowercase the rest
        .join(" ");
    };

    return (
      <thead>
        <tr>
          {columns.map((column) => (
            column !== 'id' && 
            <th key={thKey + column}> {formatTableHeading(column)}</th>
          ))}
        </tr>
      </thead>
    );
}

export default ListHeader;