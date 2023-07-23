import { useState } from 'react';

type UseInput = <T>(
  initialData: T,
  validation: (data: T) => boolean
) => [
  state: T,
  valid: boolean,
  handleChangeStack: (data: T) => void,
  handleValidation: (data: T) => boolean
];

const useInput: UseInput = <T>(initialData: T, validation: (data: T) => boolean) => {
  const [state, setState] = useState<T>(initialData);
  const [valid, setValid] = useState<boolean>(true);

  const handleChangeState = (data: T) => {
    setState(data);
    handleValidation(data);
  };

  const handleValidation = (data: T) => {
    const isValid = validation(data);
    setValid(isValid);

    return isValid;
  };

  return [state, valid, handleChangeState, handleValidation];
};

export default useInput;
