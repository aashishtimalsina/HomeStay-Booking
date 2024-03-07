import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

export default function DashboardCard(props) {
  // Map the label to the corresponding icon component
  const iconMap = {
    PeopleAltIcon,
    AccountBalanceWalletIcon,
    CurrencyRupeeIcon,
    RequestQuoteIcon,
  };

  const IconComponent = iconMap[props.icon];

  return (
    <Box width="200px">
      <React.Fragment>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {props.label}
              </Typography>
              <IconComponent
                sx={{ fontSize: 14, color: "#3A7198" }}
                gutterBottom
              />
            </Box>
            <Typography
              sx={{ fontSize: 25 }}
              variant="h5"
              color="text.primary"
              gutterBottom
            >
              {props.number}
            </Typography>
          </CardContent>
        </Card>
      </React.Fragment>
    </Box>
  );
}
