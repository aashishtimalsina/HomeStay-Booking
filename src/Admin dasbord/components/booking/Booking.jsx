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
import TablePagination from "@mui/material/TablePagination";
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [guest, setGuest] = React.useState([]);

  const apiUrl = webApi.apiUrl + "/getAllBooking";
  const token = Cookies.get("token");
  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - guest.length) : 0;

const visibleGuests = React.useMemo(
  () =>
    guest.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  [guest, page, rowsPerPage]
);

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
      id: "name",
      numeric: false,
      disablePadding: true,
      label: " Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: " Email",
    },
    {
      id: "Guest",
      numeric: false,
      disablePadding: true,
      label: "Guest Name",
    },
    {
      id: "unAssaignName",
      numeric: false,
      disablePadding: true,
      label: "UnAssaign Guest",
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
    // {
    //   id: "phoneNumber",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Phone Number",
    // },
    {
      id: "specialRequest",
      numeric: true,
      disablePadding: false,
      label: "Special Request",
    },
    {
      id: "totalAmount",
      numeric: true,
      disablePadding: false,
      label: "totalAmount",
    },
    // {
    //   id: "paymentStatus",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Payment Status",
    // },
    {
      id: "paymentMethod",
      numeric: true,
      disablePadding: false,
      label: "Payment Method",
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
              {visibleGuests.map((row,index) => (
                <TableRow key={row.id} sx={{ cursor: "pointer" }}>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    align="center"
                  >
                    {index+1}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>

                  <TableCell align="center">
                  {row.guestNames.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index !== row.guestNames.length - 1 && ", "}
                        </span>
                      ))}
                  </TableCell>
                  <TableCell align="center">
                  {row.unassignedGuests.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index !== row.guestNames.length - 1 && ", "}
                        </span>
                      ))}
                  </TableCell>
                  <TableCell align="center">{row.noOfGuest}</TableCell>
                  <TableCell align="center">{row.noOfRooms}</TableCell>
                  
                   <TableCell align="center">{row.country}</TableCell>
                  <TableCell align="center">{row.contact}</TableCell> 
                  <TableCell align="center">{row.specialRequest}</TableCell>
                  <TableCell align="center">{row.totalAmount}</TableCell>
                 <TableCell align="center">{row.paymentStatus}</TableCell> 
                  <TableCell align="center">{row.paymentMethod}</TableCell>
               
                  <TableCell align="center">{row.checkIn}</TableCell>
                  <TableCell align="center">{row.checkOut}</TableCell> 
                  <TableCell align="center">
                    <Link
                    to ={`guestAsignForm/${row.id}`}
                   
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
          <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={guest.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={(event, newPage) => setPage(newPage)}
  onRowsPerPageChange={(event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }}
/>
        </TableContainer>
      </Paper>
    </Box>
  );
}
