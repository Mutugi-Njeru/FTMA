import React from "react";

const CountyValueChainsTable = ({ data }) => {
  return (
    <div className="border shadow-sm rounded-lg mt-2 p-1 bg-white">
      <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
        <thead className="">
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
              <td className="px-2 py-2 text-sm text-blue-500">
                #{item.countyProductId}
              </td>
              <td className="px-2 py-2 text-sm">{item.product}</td>
              <td className="px-2 py-2 text-sm">{item.county}</td>
              <td className="px-2 py-2 text-sm">{item.createdAt}</td>
              <td className="px-2 py-2 text-sm">{item.updatedAt}</td>
              <td className="px-2 py-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountyValueChainsTable;
