
import { CreateFormFieldConfig } from "../../utils/configFormField";
import { requiredRule, minLengthRule, greaterThanZero, positiveValue } from "../../utils/inputValidationRules";

const CategoryObject = (defaultValues)=>{
  return {
    name: {
      ...CreateFormFieldConfig(
        "Category Name",
        "name",
        "text",
        defaultValues !== undefined ? defaultValues.name : undefined
      ),
      validationRules: [
        requiredRule("Category Name"),
        minLengthRule("Category Name", 4),
      ],
    },

    amountAllocated: {
      ...CreateFormFieldConfig(
        "Amount Allocated",
        "amountAllocated",
        "number",
        defaultValues !== undefined ? defaultValues.amountAllocated : undefined
      ),
      validationRules: [
        requiredRule("Amount Allocated"),
        positiveValue("Amount Allocated"),
      ],
    },

    amountSpent: {
      ...CreateFormFieldConfig(
        "Amount Spent",
        "amountSpent",
        "number",
        defaultValues !== undefined ? defaultValues.amountSpent : undefined
      ),
      validationRules: [
        requiredRule("Amount Spent"),
        greaterThanZero("Amount Spent"),
      ]
    }
  };
};

export default CategoryObject;
