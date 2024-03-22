import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

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
      <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconComponent sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="body2" gutterBottom>
            {props.label}
          </Typography>
        </Box>
        <Typography variant="h4" gutterBottom>
          {props.number}
        </Typography>
      </Card>
    </Box>
  );
}