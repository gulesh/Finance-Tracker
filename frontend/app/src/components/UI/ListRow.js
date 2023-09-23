import React from "react";

const ListRows = ({data}) => {
    return (
        <tbody >
            {data.map((row)=>{
                let counter = 0;
                return (
                  <tr key={row.id}>
                    {Object.entries(row).map(([key, value]) => (
                        key !== 'id' &&
                      <td key={row.id + counter++}>
                        {key === "recurring"
                          ? row[key] ? "true": "false"
                          : row[key]}
                      </td>
                    ))}
                  </tr>
                );
            })}
        </tbody>
    );

}

export default ListRows;