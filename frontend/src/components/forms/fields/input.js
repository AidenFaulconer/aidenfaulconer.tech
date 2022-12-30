import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export const Input = ({ name, value, type, icon, placeholder, required, ...props }) => {
  const Icon = icon;
  return (
    <div>
      <label htmlFor={name} className="flex text-sm font-medium text-gray-700 gap-1 mb-2">
        {name}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center p-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type={type}
          name={name}
          id={name}
          className="p-3 block w-full rounded-md border-emerald-300 pl-10 pr-10 text-emerald-900 placeholder-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
          placeholder={placeholder}
          defaultValue={""}
          aria-invalid="true"
          aria-describedby="email-error"
        />
        {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon className="h-5 w-5 text-emerald-500" aria-hidden="true" />
        </div> */}
      </div>
      {/* <p className="mt-2 text-sm text-emerald-600" id="email-error">
        Your password must be less than 4 characters.
      </p> */}
    </div>
  )
}

export default Input;