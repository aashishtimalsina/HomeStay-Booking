import { Box } from "@mui/material";
import React from "react";
import DashboardCard from "../reuseable/cards/DashboardCard";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";


const cardDatas = [
  {
    label: "Total Hosts",
    number: 50000,
    icon: "PeopleAltIcon",
  },
  {
    label: "Total Activities",
    number: 85000,
    icon: "AccountBalanceWalletIcon",
  },
  {
    label: "Total Booking",
    number: 200000,
    icon: "CurrencyRupeeIcon",
  },
  {
    label: "Total Reviews",
    number: 200000,
    icon: "RequestQuoteIcon",
  },
];
const username = Cookies.get("username");

const HostDashboard = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Box width="100%" pt="100px">
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Hello {username}! Welcome to your Dashboard.
        </Alert>
      </Collapse>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
       
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
      ></Box>
    </Box>
  );
};

export default HostDashboard;
