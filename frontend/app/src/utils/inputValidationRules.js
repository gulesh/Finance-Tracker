/**
 * 
 * @param {string} ruleName - name of the rule validation rule
 * @param {string} errorMessage - error massage to be displayed
 * @param {function} validationFunction - validation function
 * @returns 
 */
function createValidationRule(ruleName, errorMessage, validationFunction){
    return {
        name: ruleName,
        message: errorMessage,
        validate : validationFunction
    }
}

export function requiredRule(inputName){
    return createValidationRule(
      "required",
      `${inputName} required`,
      (inputValue) => inputValue.length !== 0
    );
}

export function minLengthRule(inputName, minCharacters) {
  return createValidationRule(
    "minLength",
    `${inputName} should contain atleast ${minCharacters} characters`,
    (inputValue) => inputValue.length >= minCharacters
  );
}

export function greaterThanZero(inputName) {
  return createValidationRule(
    "greaterThanZero",
    `${inputName} should not be negative`, 
    (inputValue)=> inputValue >= 0)
}

export function positiveValue(inputName) {
  return createValidationRule(
    "positiveValue",
    `${inputName} should be greater than zero`,
    (inputValue) => inputValue > 0
  );
}