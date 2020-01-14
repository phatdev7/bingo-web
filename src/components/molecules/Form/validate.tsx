export const isRequired = (value: string) => {
  if (!value) return 'field_is_required';
  return '';
};

export const isEmail = (email: string) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
  if (!reg.test(String(email).toLocaleLowerCase())) return 'email_invalid';
  return '';
};

export const isNumber = (number: string) => {
  const reg = /^-?\d+\.?\d*$/;
  if (!reg.test(number)) return 'number_invalid';
  return '';
};

export const minLength = (value: string, length: number) => {
  if (String(value).length < length) return `minimum_${length}_characters`;
  return '';
};

export const maxLength = (value: string, length: number) => {
  if (String(value).length > length) return `maximum_${length}_characters`;
  return '';
};

export const validateForm = (form: any) =>
  Object.keys(form).reduce(
    (prev, key) => ({
      ...prev,
      [key]: {
        ...form[key],
        error: form[key].validate
          ? (value => {
              return form[key].validate
                .map((rules: any) => {
                  return Object.keys(rules)
                    .filter(item => item !== 'message')
                    .reduce((prevRule: any, keyRule: any) => {
                      let msg = '';
                      switch (keyRule) {
                        case 'isRequired': {
                          const errorResult = rules[keyRule] ? isRequired(value) : '';
                          msg = errorResult ? rules['message'] || errorResult : errorResult;
                          break;
                        }
                        case 'isEmail': {
                          const errorResult = rules[keyRule] ? isEmail(value) : '';
                          msg = errorResult ? rules['message'] || errorResult : errorResult;
                          break;
                        }
                        case 'isNumber': {
                          const errorResult = rules[keyRule] ? isNumber(value) : '';
                          msg = errorResult ? rules['message'] || errorResult : errorResult;
                          break;
                        }
                        case 'min': {
                          const errorResult = minLength(value, rules[keyRule]);
                          msg = errorResult ? rules['message'] || errorResult : errorResult;
                          break;
                        }
                        case 'max': {
                          const errorResult = maxLength(value, rules[keyRule]);
                          msg = errorResult ? rules['message'] || errorResult : errorResult;
                          break;
                        }
                        default: {
                          msg = '';
                          break;
                        }
                      }

                      return [...prevRule, msg];
                    }, [])[0];
                })
                .filter((item: any) => !!item)[0];
            })(form[key].value)
          : '',
      },
    }),
    {},
  );

export const checkForm = (form: any) => Object.keys(form).find(key => !!form[key].error);

export const getFormErrors = (form: any) =>
  Object.keys(form).reduce(
    (prev, key) => ({
      ...prev,
      [key]: form[key].error,
    }),
    {},
  );

export const getFormValues = (form: any) =>
  Object.keys(form).reduce(
    (prev, key) => ({
      ...prev,
      [key]: form[key].value,
    }),
    {},
  );
