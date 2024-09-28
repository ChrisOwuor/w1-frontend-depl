import React, { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
export default function ProfitLossTable() {
  const { userData } = useContext(AuthContext);
  console.log(userData);
  return (
    <>
      {/* Date selection */}
      <div className="full grid grid-cols-2 ">
        <div className="sm:col-span-1 w-4/5">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-white"
          >
            Start Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-1 w-4/5">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-white"
          >
            End date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* main table */}

      <div class="relative overflow-x-auto bg-inherit ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase text-white dark:text-gray-400">
            <tr className="grid grid-cols-3">
              <th scope="col" class="prxz-6 py-3 col-span-2">
                Event name
              </th>
              <th scope="col" class="prxz-6 py-3 col-span-1">
                Profit/loss
              </th>
            </tr>
          </thead>
          <tbody className="bg-inherit ">
            <tr class=" dark:bg-gray-800 grid grid-cols-3">
              <td class="prxz-6 py-1 col-span-2">Hockey</td>
              <td class="prxz-6 py-1 col-span-1">$2999</td>
            </tr>
            <tr class=" dark:bg-gray-800 grid grid-cols-3">
              <td class="prxz-6 py-1 col-span-2">Soccker</td>
              <td class="prxz-6 py-1 col-span-1">$2999</td>
            </tr>{" "}
            <tr class=" dark:bg-gray-800 grid grid-cols-3">
              <td class="prxz-6 py-1 col-span-2">Hockey</td>
              <td class="prxz-6 py-1 col-span-1">$2999</td>
            </tr>
            <tr class=" dark:bg-gray-800 grid grid-cols-3">
              <td class="prxz-6 py-1 col-span-2">Total</td>
              <td class="prxz-6 py-1 col-span-1">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
