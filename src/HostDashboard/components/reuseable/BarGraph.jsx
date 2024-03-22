import React, { useRef } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(
  BarElement,
  CategoryScale,

  LinearScale,
  Tooltip,
  Legend
);
const BarGraph = () => {
  const chartRef = useRef();
  const data = {
    labels: ["Week 2 ", "Week 2", "Week 3", "week 4"],

    datasets: [
      {
        label: "Income",
        data: [50, 100, 150, 200],
        borderColor: "black",

        backgroundColor: ["black"],
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: [45, 105, 125, 155],
        borderColor: "black",
        backgroundColor: ["rgba(0, 0, 0, 0.5)"],
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.5)",
      },
    ],
  };
  const options = {
    scales: {
      x: {
        id: "x-axis-1",
        name: "Rs in thoushand",
      },
      y: {
        id: "y-axis-1",
        name: "Years",
      },
    },
  };
  const onClick = () => {
    if (getElementAtEvent(chartRef.current, e).length > 0) {
      // console.log(getElementAtEvent(chartRef.current, e));
      const clickDatasetIndex = getElementAtEvent(chartRef.current, e)[0]
        .datasetIndex;
      // console.log(clickDatasetIndex, "clickdataEvent");
      const dataPoint = getElementAtEvent(chartRef.current, e)[0].datasetIndex;
      // console.log(dataPoint, "datapoint");
      console.log(data.datasets[clickDatasetIndex].link);
      window.open("https://www.chartjs3.com", "_blank");
    }
  };

  return (
    <Box>
      <Bar data={data} options={options} onClick={onClick} ref={chartRef}></Bar>
    </Box>
  );
};

export default BarGraph;
