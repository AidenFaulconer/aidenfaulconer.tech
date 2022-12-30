import React from 'react';

export const DateInput = ({ name, value, type, icon, placeholder, required, ...props }) => {
  const Icon = icon;
  return (
    <div>
      <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <select
            id="country"
            name="country"
            autoComplete="country"
            className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-red-500 focus:ring-red-500 sm:text-sm"
          >
            <option>US</option>
            <option>CA</option>
            <option>EU</option>
          </select>
        </div>
        <input
          type="text"
          name="phone-number"
          id="phone-number"
          className="p-3 block w-full rounded-md border-gray-300 pl-16 focus:border-red-500 focus:ring-red-500 sm:text-sm"
          placeholder="+1 (555) 987-6543"
        />
      </div>
    </div>
  )
}


export default DateInput;