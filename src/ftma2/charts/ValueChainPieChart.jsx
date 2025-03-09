import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ValueChainPieChart = () => {
  const data = {
    labels: ["Approved", "Rejected", "Waiting"],
    datasets: [
      {
        data: [5, 12, 10],
        backgroundColor: [
          "#A19E3B", // lemonGinger for Approved
          "#413324", // taupe for Rejected
          "#94C9E2", // skyBlue for Waiting
        ],
        hoverBackgroundColor: [
          "#C3B00A", // brownYellow (darker lemonGinger) for Approved
          "#FCB040", // butterScotch (darker taupe) for Rejected
          "#00599A", // mediumElectricBlue (darker skyBlue) for Waiting
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Value Chain Prices
      </h3>
      <div className="w-44 h-44">
        <Pie data={data} options={options} />
      </div>
      <div className="flex space-x-2 text-sm font-medium mt-8">
        <span className="flex items-center">
          <span className="w-3 h-3 bg-[#A19E3B] inline-block rounded-full mr-1"></span>
          Approved
        </span>
        <span className="flex items-center">
          <span className="w-3 h-3 bg-[#413324] inline-block rounded-full mr-1"></span>
          Rejected
        </span>
        <span className="flex items-center">
          <span className="w-3 h-3 bg-[#94C9E2] inline-block rounded-full mr-1"></span>
          Waiting
        </span>
      </div>
    </div>
  );
};

export default ValueChainPieChart;
