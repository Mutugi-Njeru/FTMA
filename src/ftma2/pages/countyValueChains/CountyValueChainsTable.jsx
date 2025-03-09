import React from "react";

const CountyValueChainsTable = ({ data }) => {
  return (
    <div className="border rounded-lg mt-6 p-1 bg-white">
      <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
              Product ID
            </th>
            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
              Name
            </th>
            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
              County
            </th>
            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
              Date Created
            </th>
            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
              Date Updated
            </th>
            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.countyProductId}>
              <td className="px-2 py-2 text-sm text-gray-500">
                {item.countyProductId}
              </td>
              <td className="px-2 py-2 text-sm text-gray-500">
                {item.product}
              </td>
              <td className="px-2 py-2 text-sm text-gray-500">{item.county}</td>
              <td className="px-2 py-2 text-sm text-gray-500">
                {item.createdAt}
              </td>
              <td className="px-2 py-2 text-sm text-gray-500">
                {item.updatedAt}
              </td>
              <td className="px-2 py-2 text-sm text-gray-500">Active</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountyValueChainsTable;
