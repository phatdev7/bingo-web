import { useState, useImperativeHandle, forwardRef } from 'react';
import {
  isRequired,
  isEmail,
  minLength,
  maxLength,
  validateForm,
  checkForm,
  getFormErrors,
  getFormValues,
} from './validate';

type isRequired = {
  isRequired?: boolean;
  message: string;
};

type isEmail = {
  isEmail?: boolean;
  message: string;
};

type isNumber = {
  isNumber?: boolean;
  message: string;
};

type minLength = {
  min: number;
  message: string;
};

type maxLength = {
  max: number;
  message: string;
};

type validateType = isRequired | isEmail | isNumber | minLength | maxLength;

type InitialFormType = {
  [key: string]: {
    value: string | boolean;
    error?: string;
    validate?: validateType[];
  };
};

interface IProps {
  initialForm: InitialFormType;
  children: any;
}

const Form = (props: IProps, ref: any) => {
  const [form, setForm] = useState(props.initialForm);
  useImperativeHandle(ref, () => ({
    submit,
    clearField,
  }));

  const updateFormKey = (key: string, e: any) => {
    const newForm = {
      ...form,
      [key]: {
        ...form[key],
        value: typeof e === 'string' ? e : e.currentTarget.value,
      },
    };
    setForm(newForm);
  };

  const setFormKeys = Object.keys(form).reduce(
    (prev, key) => ({
      ...prev,
      [key]: updateFormKey.bind(null, key),
    }),
    {},
  );

  const submit = (callback: Function) => {
    const newForm = validateForm(form);
    setForm(newForm);
    if (!checkForm(newForm)) {
      const values = getFormValues(newForm);
      callback(false, values);
    } else {
      const errors = getFormErrors(newForm);
      callback(true, errors);
    }
  };

  const clearField = (key: string) => {
    updateFormKey(key, '');
  };

  return props.children(form, setFormKeys);
};
export default forwardRef(Form);
