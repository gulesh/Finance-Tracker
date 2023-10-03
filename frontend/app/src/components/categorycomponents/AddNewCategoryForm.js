import React from "react";
import './CategoryStyles.css'

const NewCategoryForm = ( ) => {
    return (
      <div>
        <form className="form-category">
          <div className="input-group-category">
            <p>
              <label htmlFor="category-name">Category Name </label>
              <input id="category-name" type="text" className="input-field" />
            </p>
            <p>
              <label htmlFor="category-amountallocated">
                Ammount Allocated
              </label>
              <input
                id="category-amountallocated"
                className="input-field"
                type="Number"
              />
            </p>
          </div>
          <div className="input-group-category">
            <p>
              <label htmlFor="category-amountspent"> Amount Spent </label>
              <input
                id="category-name"
                className="input-field"
                type="Number"
              />
            </p>
            <p>
              <label htmlFor="category-recurring">Recurring (Monthly)</label>
              <select
                id="category-recurring"
                className="select-field"
                style={{ display: "block" }}
              >
                <option value="true"> True </option>
                <option value="false"> False </option>
              </select>
            </p>
          </div>
          <p className="actions">
            <button type="reset" className="buttonAlt">
              Reset
            </button>
            <button type="submit" className="button">
              Add Category
            </button>
          </p>
        </form>
      </div>
    );
}

export default NewCategoryForm;