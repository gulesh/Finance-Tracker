import React from "react";

export default function FormEdit(props){
    const routeEdit = props.route + "/edit/" + props.routeparameter;
    console.log(routeEdit)
    return (
      <form action={routeEdit} method="post">
        <input type="hidden" name="_method" value="PATCH" />
        <button type="submit">Edit</button>
      </form>
    );
}