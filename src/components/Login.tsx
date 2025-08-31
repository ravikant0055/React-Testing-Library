import React, { useState } from 'react';

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return regex.test(email);
};

interface InputState {
  email: string;
  password: string;
}

interface ErrorState {
  status: boolean;
  message: string;
}

const Login = () => {
  const [inputs, setInputs] = useState<InputState>({ email: '', password: '' });
  const [data, setData] = useState<InputState[]>([]);
  const [error, setError] = useState<ErrorState>({ status: false, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateEmail(inputs.email)) {
      setData([...data, inputs]);
      setInputs({ email: '', password: '' });
      setError({ status: false, message: '' });
    } else {
      setError({ status: true, message: 'Invalid Email' });
    }
  };

  const handleReset = () => {
    setError({ status: false, message: '' });
    setInputs({ email: '', password: '' });
    setData([]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#efe4e0] justify-center items-center">
      {data.length > 0 && (
        <div className="absolute top-5 bg-teal-300 w-sm px-3 py-4 rounded">
          <h1 className="text-teal-800">Success</h1>
        </div>
      )}
      {error.status && (
        <div className="absolute top-5 bg-red-300 w-sm px-3 py-4 rounded">
          <h1 className="text-red-800">Failed: {error.message}</h1>
        </div>
      )}
      <form
        onSubmit={handleForm}
        className="flex flex-col items-center gap-5 w-sm bg-[#f6f6f6] shadow-md px-6 py-8 rounded-xl"
      >
        <h1 className="font-medium text-[1.9em]">Login</h1>
        <input
          className="border-gray-200 border rounded-md px-2 py-2 w-full mt-3"
          type="text"
          value={inputs.email}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="border-gray-200 border rounded-md px-2 py-2 w-full"
          type="password"
          value={inputs.password}
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="flex gap-5">
          <button
            className="bg-[#724e35] hover:bg-[#2c2c2c] text-white rounded-md px-5 py-2 cursor-pointer mt-5"
            type="submit"
          >
            Submit
          </button>
          <button
            type="reset"
            data-testid="reset"
            className="bg-[#703a3a] hover:bg-[#2c2c2c] text-white rounded-md px-5 py-2 cursor-pointer mt-5"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
