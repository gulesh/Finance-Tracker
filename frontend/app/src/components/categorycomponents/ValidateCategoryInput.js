// validation.js

export const validateInput = (inputs) => {
  let isValid = true;
  if (inputs.name !== undefined && !inputs.name.trim()) {
    isValid = false;
  }
  if (
    typeof inputs.amountAllocated !== "number" || inputs.amountAllocated <= 0 ) {
    isValid = false;
  }
  if (typeof inputs.amountAllocated !== "number" || inputs.amountSpent <= 0) {
    isValid = false;
  }
  return isValid;
};
