import React from "react";
import FormGeneral from "../components/formcomponents/GeneralForm";
import InputTextFieldForm from "../components/formcomponents/InputTextFieldForm";
import InputBooleanFieldForm from "../components/formcomponents/InputBooleanFieldForm";
import EditForm from '../components/formcomponents/FormEdit'
import FormDelete from "../components/formcomponents/FormDelete";

const EditFormCategory = (props) => {
    console.log(props.data)
    console.log(props.data.returned);

    return (
      <>
        <FormGeneral data={props.data}>
          {/* passing it down to the general form  */}
          <p>
            <span> Name </span>
            <InputTextFieldForm
              currentValue={props.data.name}
              fieldName="name"
              placeHolder="name"
            />
          </p>
          <p>
            <span> Returned </span>
            <InputBooleanFieldForm
              currentValue={props.data.returned}
              fieldName="returned"
              placeHolder="returned"
            />
          </p>
          <label htmlFor="twitter">
            <span>Twitter</span>
          </label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            placeholder="@jack"
            defaultValue="@me"
          />

          <p>
            <button type="submit">Save</button>
            <button type="button">Cancel</button>
          </p>
        </FormGeneral>
        <EditForm
          route="/categories"
          routeparameter={props.data.name}
        />
        <FormDelete route="/categories" />
      </>
    );
}

export default EditFormCategory;