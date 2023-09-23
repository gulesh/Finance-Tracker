import React from "react";
import Table from "react-bootstrap/Table";
import ListHeader from "./ListHeader";
import ListRows from "./ListRow";

const List = ({data, columnHeadings, title}) =>
{
    return (
      <>
        <Table responsive="lg" >
          <ListHeader
            key={"table-expenses"}
            columns={columnHeadings}
          />
          <ListRows data={data}></ListRows>
        </Table>
    </>

    );
}

export default List;
