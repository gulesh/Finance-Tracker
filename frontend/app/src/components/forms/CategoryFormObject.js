
import { CreateFormFieldConfig } from "../../utils/configFormField";
import { requiredRule, minLengthRule, greaterThanZero, positiveValue } from "../../utils/inputValidationRules";



const CateforyFormObject = {
  name: {
    ...CreateFormFieldConfig("Category Name", "name", "text"),
    validationRules: [
      requiredRule("Category Name"),
      minLengthRule("Category Name", 4),
    ],
  },

  amountAllocated: {
    ...CreateFormFieldConfig("Amount Allocated", "amountAllocated", "number"),
    validationRules: [
      requiredRule("Amount Allocated"),
      positiveValue("Amount Allocated"),
    ],
  },

  amountSpent: {
    ...CreateFormFieldConfig("Amount Spent", "amountSpent", "number"),
    validationRules: [
      requiredRule("Amount Spent"),
      greaterThanZero("Amount Spent"),
    ],
  }
};

export default CateforyFormObject;