import React from "react";
import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Pencil,
  Trash,
  Trash2,
} from "lucide-react";
import ReactPaginate from "react-paginate";

function FarmServiceCentersTable({ data }) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Name",
                "Phone Number",
                "Market",
                "County",
                "Subcounty",
                "Ward",
                "Points",
                "Date",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.farmServiceCenterId} className="hover:bg-gray-100">
                <td className="px-4 py-4 text-sm text-gray-500">
                  {item.farmServiceCenterId}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  {item.firstName} {item.lastName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {item.msisdn}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {item.market}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {item.county}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {item.subCounty}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">{item.ward}</td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {item.marketPointsBalance}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {item.createdAt
                    ? format(new Date(item.createdAt), "dd/MM/yyyy")
                    : "N/A"}
                </td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex gap-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Edit2 size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FarmServiceCentersTable;
