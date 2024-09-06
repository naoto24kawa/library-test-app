export type ValidationError = [string, string[]];

export type ValidationErrorResponse = {
  errors: {
    [key: string]: string[];
  };
};

export const setValidationErrors = (
  errors: ValidationError[]
): { validationErrors: ValidationErrorResponse; hasErrors: boolean } => {
  const validationErrors: ValidationErrorResponse = {
    errors: {},
  };
  let hasErrors = false;

  errors.forEach(([key, value]) => {
    if (value.length > 0) {
      validationErrors.errors[key] = value;
      hasErrors = true;
    }
  });

  return { validationErrors, hasErrors };
};
