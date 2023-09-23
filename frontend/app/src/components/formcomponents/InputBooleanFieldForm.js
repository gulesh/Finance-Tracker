import React, { useState } from "react";

const InputBooleanFieldForm = (props) => {
  const [fieldValue, setFieldValue] = useState(props.currentValue);

  const handleFieldChange = (e) => {
    console.log(e.target.value);
    setFieldValue(!fieldValue);
  };
  return (
    <>
      <input
        placeholder={props.placeHolder}
        type="checkbox"
        name={props.fieldName} //this will the key to identify the value
        checked={fieldValue} //this will come from the parent
        onChange={handleFieldChange}
      />
    </>
  );
};

export default InputBooleanFieldForm;
