import { CreateFormFieldConfig } from "../../utils/configFormField";
import {
  requiredRule,
  minLengthRule,
  greaterThanZero,
} from "../../utils/inputValidationRules";

const AccountFormObject = {
  name: {
    ...CreateFormFieldConfig("Account Name", "name", "text"),
    validationRules: [
      requiredRule("Account Name"),
      minLengthRule("Account Name", 4),
    ],
  },
  amount: {
    ...CreateFormFieldConfig("Balance", "amount", "number"),
    validationRules: [requiredRule("Balance"), greaterThanZero("Balance")],
  },
};

export default AccountFormObject;