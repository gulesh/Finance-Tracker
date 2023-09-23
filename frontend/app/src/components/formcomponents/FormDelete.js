import React from "react";

export default function FormDelete(props){
    const route = props.route + "/delete";
    console.log(route);
    return (
      <form
        method="post"
        action={route}
        onSubmit={(e) => {
          if (
            !window.confirm("Please confirm that you want to delete a category")
          ) {
            e.preventDefault();
          }
        }}
      >
        <button type="submit">Delete </button>
      </form>
    );
}