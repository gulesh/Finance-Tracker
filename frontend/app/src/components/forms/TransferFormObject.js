import { CreateFormFieldConfig } from "../../utils/configFormField";
import {
  requiredRule,
  greaterThanZero,
} from "../../utils/inputValidationRules";

function formatDate(date) {
  if (date !== undefined) {
    // Parse the input date string in UTC
    const defaultDate = new Date(Date.parse(date + "T00:00:00Z"));
    const year = defaultDate.getUTCFullYear();
    const month = String(defaultDate.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(defaultDate.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const defaultDate = new Date();
  const year = defaultDate.getUTCFullYear();
  const month = String(defaultDate.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(defaultDate.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const TransferObject = (defaultValues)=> {
    return {
      amount: {
        ...CreateFormFieldConfig(
          "Transfer Amount",
          "amount",
          "number",
          defaultValues !== undefined ? defaultValues.amount : undefined
        ),
        validationRules: [
          requiredRule("Transfer Amount"),
          greaterThanZero("Transfer Amount"),
        ],
      },
      date: {
        ...CreateFormFieldConfig(
          "Date",
          "date",
          "date",
          formatDate(defaultValues.date)
        ),
        validationRules: [],
      },
      description: {
        ...CreateFormFieldConfig(
          "Description (Optional)",
          "description",
          "text"
        ),
        validationRules: [requiredRule("Description (why) ")],
      },
    };
}
export default TransferObject;