import { useState, useCallback } from "react";

function useForm(formObj){
    const [form, setForm] = useState(formObj); //set the object with fields

    function renderFormInputs(){
        return Object.values(form).map((inputObj)=>{
            const { value, label, errorMessage, valid, renderInput } = inputObj; //get the values
            return renderInput(onInputChange, value, valid, errorMessage, label);
        })
    }

    const isInputFieldValid = useCallback(
        (inputField) => {
            for(const rule of inputField.validationRules)
            {
                if(!rule.validate(inputField.value))
                {
                    inputField.errorMessage = rule.message;
                    return false;
                }
            }
            return true;
        }, []
    ); //not using any dependencies inside the usecallback


    const onInputChange= useCallback(
        (e) => {
            const {name, value} = e.target; 
            const inputObj = { ...form[name] }; //get the input object from the form whose value was changed
            //update the value
            inputObj.value = value;
            
            //check the validity
            const isValidInput = isInputFieldValid(inputObj);

            if (isValidInput && !inputObj.valid) {
                inputObj.valid = true;
            } else if (!isValidInput && inputObj.valid)
            {
                inputObj.valid= false;
            }
            inputObj.touched = true;
            setForm({...form, [name]:inputObj });
        }, 
        [form, isInputFieldValid]
    );

    const isFormValid = useCallback(()=> {
            let isValid = true;
            const inputsArr = Object.values(form);
            for(let i = 0; i < inputsArr.length; i++)
            {
                if(!inputsArr[i].valid)
                {
                    isValid = false; 
                    break;
                }
            }
            return isValid;
        }, [form]
    );
    return {renderFormInputs, isFormValid, form}
}

export default useForm;