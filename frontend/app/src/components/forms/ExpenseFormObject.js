import { CreateFormFieldConfig } from "../../utils/configFormField";
import {
  requiredRule,
  greaterThanZero,
} from "../../utils/inputValidationRules";

function formatDate(date) {
  let defaultDate = new Date();
  if(date !== undefined)
  {
    defaultDate = new Date(date);
  }
  const year = defaultDate.getFullYear();
  const month = String(defaultDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(defaultDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const ExpenseFormObject = (defaultValues) => {

  return {
    details: {
      ...CreateFormFieldConfig(
        "Expense Details (Place Name)",
        "details",
        "text",
        defaultValues !== undefined ? defaultValues.details : undefined
      ),
      validationRules: [],
    },
    amount: {
      ...CreateFormFieldConfig(
        "Amount", 
        "amount", 
        "number", 
        defaultValues !== undefined ? defaultValues.amount : undefined),
      validationRules: [requiredRule("Amount"), greaterThanZero("Balance")],
    },
    date: {
      ...CreateFormFieldConfig(
        "Date", 
        "date", 
        "date", 
        formatDate(defaultValues.date)),
      validationRules: [],
    },
    description: {
      ...CreateFormFieldConfig("Description (Optional)", "description", "text"),
      validationRules: [],
    }
  };
  
};

export default ExpenseFormObject;