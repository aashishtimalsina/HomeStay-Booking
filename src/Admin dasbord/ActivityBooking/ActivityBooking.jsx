import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";

import { Addbutton } from "../components/Button/Addbutton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import webApi from "../../Config/config";
import Cookies from "js-cookie";

function HostHead(props) {
  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell key={headCell.id} align="center">
            <TableSortLabel>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function Host() {
  const navigate =useNavigate();
  const [activities, setActivities] = React.useState([]);
  const apiUrls = webApi.apiUrl;
  const token = Cookies.get("token"); 

  if (token === 'undefined') {
    navigate('/login')
  }
    const encodedToken = encodeURIComponent(token);
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrls+"/getAllActivityBookings", {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data) {
          setActivities(response.data.list || []);
          console.log("Response data:", response.data);
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  

  const headCells = [
  
    {
      id: "name",
      numeric: true,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "noOfGuest",
      numeric: true,
      disablePadding: false,
      label: "No Of Guest",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "country",
      numeric: true,
      disablePadding: false,
      label: "Country",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "Phone Number",
    },
    {
      id: "totalAmount",
      numeric: true,
      disablePadding: false,
      label: "Total Amount",
    },
   
  ];

  return (
    <Box sx={{ width: "100%", paddingTop: "50px" }}>
    
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer
          sx={{
            marginTop: "20px",
          }}
        >
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <HostHead headCells={headCells} />
            <TableBody>
              {activities.map((row,index) => (
                <TableRow key={row.id} sx={{ cursor: "pointer" }}>
                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                  {row.name}
                                    </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    align="center"
                  >
                    {row.noOfGuest}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.country}</TableCell>
                  <TableCell align="center">{row.contact}</TableCell>
                  <TableCell align="center">{row.totalAmount}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
