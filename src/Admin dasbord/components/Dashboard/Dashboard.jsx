import { Box } from "@mui/material";
import React from "react";
import BarGraph from "../reuseable/BarGraph";

import LineGraph from "../reuseable/lineGraph";
import BreadcrumbsComponent from "../reuseable/Breadcrumbs";
import DashboardCard from "../reuseable/cards/DashboardCard";

const cardDatas = [
  {
    label: "Total Income",
    number: 50000,
    icon: "AccountBalanceWalletIcon",
  },
  {
    label: "Total Expenses",
    number: 85000,
    icon: "CurrencyRupeeIcon",
  },
  {
    label: "Fee to be collected",
    number: 200000,
    icon: "RequestQuoteIcon",
  },
  {
    label: "Fee to be collected",
    number: 200000,
    icon: "RequestQuoteIcon",
  },
];

const Dashboard = () => {
  return (
    <Box width="100%" pt="100px">
    
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{
          mt: "20px",
        }}
      >
        {cardDatas.map((data, index) => (
          <DashboardCard
            key={index}
            label={data.label}
            number={data.number}
            icon={data.icon}
          />
        ))}
      </Box>
      <Box
        display="flex"
        flexWrap={"wrap"}
        width="100%"
        justifyContent="space-between"
        sx={{
          mt: "80px",
        }}
      >
        <Box width="45%">
          <BarGraph />
        </Box>
        <Box width="45%">
          <LineGraph />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
