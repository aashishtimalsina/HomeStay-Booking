import React from "react";
import { useRef } from "react";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, getElementAtEvent } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,

  Tooltip,
  Legend
);

const LineGraph = () => {
  const data = {
    labels: ["2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "REACT",
        data: [50, 60, 80, 100],
        borderColor: "rgba(0, 0, 0, 0.5)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        tension: 0.4,
        link: [
          "https://www.chartjs.org",
          "https://www.chartjs3.com",
          "https://www.google.com",
        ],
      },
      {
        label: "FLUTTER",
        data: [40, 44, 55, 80],
        borderColor: "BLACK",
        backgroundColor: "BLACK",
        tension: 0.4,
        link: [
          "https://www.chartjs.org",
          "https://www.chartjs3.com",
          "https://www.google.com",
        ],
      },
    ],
  };
  const options = {};
  const chartRef = useRef();

  const onClick = (e) => {
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
      <Typography lable="lineChart" varient="h6" />
      <Box>
        <Line
          data={data}
          options={options}
          onClick={onClick}
          ref={chartRef}
        ></Line>
      </Box>
    </Box>
  );
};

export default LineGraph;
