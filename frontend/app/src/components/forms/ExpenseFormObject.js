import { CreateFormFieldConfig } from "../../utils/configFormField";
import {
  requiredRule,
  greaterThanZero,
} from "../../utils/inputValidationRules";

function formatDate() {
  const defaultDate = new Date();
  const year = defaultDate.getFullYear();
  const month = String(defaultDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(defaultDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const ExpenseFormObject = {
  details: {
    ...CreateFormFieldConfig("Expense Details (Place Name)", "details", "text")
  },
  amount: {
    ...CreateFormFieldConfig("Amount", "amount", "number"),
    validationRules: [requiredRule("Amount"), greaterThanZero("Balance")],
  },
  date: {
    ...CreateFormFieldConfig("Date", "date", "date", formatDate()),
    validationRules: [requiredRule("date")],
  },
  description: {
    ...CreateFormFieldConfig("Description (Optional)", "description", "text")
  },
};

export default ExpenseFormObject;