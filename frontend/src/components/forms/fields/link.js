import React from "react";

export const LinkInput = () => {
  return (
    <div>
      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
        Company Website
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
          http://
        </span>
        <input
          type="text"
          name="company-website"
          id="company-website"
          className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-red-500 sm:text-sm"
          placeholder="www.example.com"
        />
      </div>
    </div>
  )
}


export default LinkInput;