import React from 'react';

import { EnvelopeIcon } from '@heroicons/react/20/solid'

export const EmailInput = ({ name, value, placeholder, type, icon, ...props }) => {
  const Icon = icon
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-gray-700 flex gap-1 mb-2">
        {name}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center p-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type={type}
          name={name}
          id={name + Math.random()}
          className="p-3 block w-full rounded-md border-gray-300 pr-10 pl-10 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}


export default EmailInput;