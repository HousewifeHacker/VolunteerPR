import { useState } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length === 0) {
      callback();
    }
    setErrors(validationErrors);
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const resetForm = () => {
    let newValues = {};
    setValues((values) => {
      Object.keys(values).reduce((value, key) => {
        return (newValues[key] = "");
      });
      return newValues;
    });
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    resetForm
  };
};

export default useForm;
