import { useState, useCallback } from "react";

function useForm(formObj){
    const [form, setForm] = useState(formObj); //set the object with fields

    function renderFormInputs() {
        return Object.values(form).map((inputObj) => {
        const { value, label, errorMessage, valid, renderInput } = inputObj; //get the values
        return renderInput(onInputChange, value, valid, errorMessage, label);
        });
    }

    const isInputFieldValid = useCallback((inputField) => {
        if (!inputField.touched) {
          return true; // Field is considered valid if it hasn't been touched
        }
        for (const rule of inputField.validationRules) {
          if (!rule.validate(inputField.value)) {
              inputField.errorMessage = rule.message;
              return false;
          }
        }
        return true;
    }, []); //not using any dependencies inside the usecallback

    const onInputChange = useCallback(
        (e) => {
        const { name, value } = e.target;
        const inputObj = { ...form[name] }; //get the input object from the form whose value was changed
        //update the value
        inputObj.value = value;
        //mark the field as touched 
        inputObj.touched = true;
        console.log("value change: " + value);

        //check the validity
        const isValidInput = isInputFieldValid(inputObj);

        if (isValidInput && !inputObj.valid) {
            inputObj.valid = true;
        } else if (!isValidInput && inputObj.valid) {
            inputObj.valid = false;
        }
        setForm({ ...form, [name]: inputObj });
        },
        [form, isInputFieldValid]
    );

    const isFormValid = useCallback(() => {
        let isValid = true;
        const inputsArr = Object.values(form);
        for (let i = 0; i < inputsArr.length; i++) {
          //input field with no validation rules
          if(inputsArr[i].validationRules.length === 0)
          {
            inputsArr[i].valid = true;
          }
          //now check the valid values
          if (!inputsArr[i].valid) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }, [form]);

    const resetForm = useCallback(() => {
      // Create a new object with default values for each input field
      const defaultForm = {};

      for (const name in form) {
        if (form.hasOwnProperty(name)) {
          const inputObj = { ...form[name] };
          if (inputObj.inputType === "number") {
            inputObj.value = 0; // Reset number input fields
          } else if (inputObj.inputType === "date") {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const currentDate = `${year}-${month}-${day}`;
            inputObj.value = currentDate;
          } else {
            inputObj.value = ""; // Reset text or other input fields
          }

          inputObj.valid = false;
          inputObj.touched = false;
          inputObj.errorMessage = "";
          defaultForm[name] = inputObj;
        }
      }

      setForm(defaultForm);
    }, [form]);

    
    return {
      renderFormInputs,
      isFormValid,
      isInputFieldValid,
      form,
      resetForm
    };
}

export default useForm;