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
import { Link } from "react-router-dom";
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

export default function GuestAssign() {
  //   const [guest, setGuest] = React.useState([]);

  //   const apiUrl =
  //     "https://d9b6-2404-7c00-49-615-999e-18cc-f14a-a945.ngrok-free.app/getHostDetails";

  //   React.useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(apiUrl, {
  //           headers: {
  //             "ngrok-skip-browser-warning": true,
  //           },
  //         });
  //         if (response.data) {
  //           setGuest(response.data.list || []);
  //           console.log("Response data:", response.data);
  //         } else {
  //           console.error("Empty response data");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);
  const guests = [
    {
      id: 1,
      index: 1,
      guestName: "John Doe",
      noOfPax: 3,
      guestList: "ram, sam, hari",
      checkInDate: "2024-03-08",
      checkOutDate: "2024-03-15",
      country: "USA",
      phoneNumber: "+1234567890",
      specialRequest: "None",
      amount: 1000, // Added amount
    },
    {
      id: 2,
      index: 2,
      guestName: "Jane Smith",
      noOfPax: 2,
      guestList: "ram, sam, hari",
      checkInDate: "2024-03-10",
      checkOutDate: "2024-03-17",
      country: "Canada",
      phoneNumber: "+1987654321",
      specialRequest: "Vegetarian meals",
      amount: 1500, // Added amount
    },
    // Add more guests with amount as needed
  ];

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
      id: "guestList",
      numeric: true,
      disablePadding: false,
      label: "Guest List",
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
      id: "country",
      numeric: true,
      disablePadding: false,
      label: "Country",
    },
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
  ];
  return (
    <Box sx={{ width: "100%", paddingTop: "50px" }}>
      <Box
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
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer
          sx={{
            marginTop: "20px",
          }}
        >
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <GuestHead headCells={headCells} />
            <TableBody>
              {guests.map((row) => (
                <TableRow key={row.id} sx={{ cursor: "pointer" }}>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    align="center"
                  >
                    {row.index}
                  </TableCell>
                  <TableCell align="center">{row.guestName}</TableCell>
                  <TableCell align="center">{row.noOfPax}</TableCell>
                  <TableCell align="center">{row.guestList}</TableCell>
                  <TableCell align="center">{row.checkInDate}</TableCell>
                  <TableCell align="center">{row.checkOutDate}</TableCell>
                  <TableCell align="center">{row.country}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">{row.specialRequest}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>

                  {/* <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className=" bg-primary-5 p-2 text-white rounded-md hover:bg-white hover:text-primary-5 transition-all duration-500"
                    >
                      Edit
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
