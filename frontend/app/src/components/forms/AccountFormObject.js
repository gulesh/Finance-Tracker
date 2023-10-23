import { CreateFormFieldConfig } from "../../utils/configFormField";
import {
  requiredRule,
  minLengthRule,
  greaterThanZero,
} from "../../utils/inputValidationRules";

const AccountObject = (defaultValues)=> {
  return {
    name: {
      ...CreateFormFieldConfig(
        "Account Name",
        "name",
        "text",
        defaultValues !== undefined ? defaultValues.name : undefined
      ),
      validationRules: [
        requiredRule("Account Name"),
        minLengthRule("Account Name", 4),
      ]
    },
    amount: {
      ...CreateFormFieldConfig(
        "Balance",
        "amount",
        "number",
        defaultValues !== undefined ? defaultValues.amount : undefined
      ),
      validationRules: [
        requiredRule("Balance"), 
        greaterThanZero("Balance")]
    }
  };
  
};

export default AccountObject;