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

import { Addbutton } from "../Button/Addbutton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button } from "@mui/base";
import { Stack } from "@mui/system";
import { useState } from "react";
import webApi from "../../../Config/config";
import Cookies from "js-cookie";

function GuestHead(props) {
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

export default function Booking() {
  const navigate = useNavigate();
  const [guest, setGuest] = React.useState([]);

  const apiUrl = webApi.apiUrl + "/getAllBooking";
  const token = Cookies.get("token");
 

   React.useEffect(() => {
    if (!token || token == 'undefined') {
      navigate('/login');
    }
      const encodedToken = encodeURIComponent(token);
    
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data) {
          setGuest(response.data.list || []);
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
      id: "sn",
      numeric: false,
      disablePadding: true,
      label: "S.N",
    },
    {
      id: "guestName",
      numeric: false,
      disablePadding: true,
      label: "Guest Name",
    },
    {
      id: "noOfPax",
      numeric: false,
      disablePadding: true,
      label: "No Of Guest",
    },
    {
      id: "noOfRooms",
      numeric: true,
      disablePadding: false,
      label: "No Of Rooms",
    },
 
    // {
    //   id: "country",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Country",
    // },
    {
      id: "phoneNumber",
      numeric: true,
      disablePadding: false,
      label: "Phone Number",
    },
    {
      id: "specialRequest",
      numeric: true,
      disablePadding: false,
      label: "Special Request",
    },
    {
      id: "amount",
      numeric: true,
      disablePadding: false,
      label: "Amount",
    },
    {
      id: "paymentStatus",
      numeric: true,
      disablePadding: false,
      label: "Payment Status",
    },
    {
      id: "checkInDate",
      numeric: true,
      disablePadding: false,
      label: "Check In",
    },
    {
      id: "checkOutDate",
      numeric: true,
      disablePadding: false,
      label: "Check Out",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
    },
  ];
  return (
    <Box sx={{ width: "100%", paddingTop: "50px" }}>
      {/* <Box
        sx={{
          margin: "0px",
        }}
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h4">guest</Typography>

        <Link to="guestAsignForm" display="flex" justifycontent="center">
          <Addbutton Name="Asign" />
        </Link>
      </Box> */}
      <Typography variant="h4">Guest</Typography>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer
          sx={{
            marginTop: "20px",
          }}
        >
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <GuestHead headCells={headCells} />
            <TableBody>
              {guest.map((row,index) => (
                <TableRow key={row.id} sx={{ cursor: "pointer" }}>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    align="center"
                  >
                    {index+1}
                  </TableCell>
                  <TableCell align="center">
                  {row.guestNames.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index !== row.guestNames.length - 1 && ", "}
                        </span>
                      ))}
                  </TableCell>
                  <TableCell align="center">{row.noOfGuest}</TableCell>
                  <TableCell align="center">{row.noOfRooms}</TableCell>
                  
                  {/* <TableCell align="center">{row.country}</TableCell> */}
                  <TableCell align="center">{row.contact}</TableCell>
                  <TableCell align="center">{row.specialRequest}</TableCell>
                  <TableCell align="center">{row.totalAmount}</TableCell>
                  <TableCell align="center">{row.paymentStatus}</TableCell>
                  <TableCell align="center">{row.checkIn}</TableCell>
                  <TableCell align="center">{row.checkOut}</TableCell>
                  <TableCell align="center">
                    <Link
                     to={{
                      pathname: "guestAsignForm",
                      state: { id: row.id },
                    }}
                      display="flex"
                      justifycontent="center"
                    >
                      <Button
                        variant="contained"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className=" bg-primary-5 p-2 text-white rounded-md hover:bg-white hover:text-primary-5 transition-all duration-500"
                      >
                        Asign
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
