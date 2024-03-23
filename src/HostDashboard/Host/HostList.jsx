import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import webApi from "../../Config/config";
import axios from "axios";
import Cookies from "js-cookie";

export default function HostList() {
  const [rows, setRows] = React.useState([]);
  const Api = webApi.apiUrl;
  const username = Cookies.get("username");
  const apiUrl = Api + "/getAssignmentDetails/"+ username;
  const token = Cookies.get("token");

  const encodedToken = encodeURIComponent(token);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
          },
        });

        const data = response.data;
        if (data.status === "success") {
          setRows(data.list);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%", paddingTop: "50px" }}>
    <Box
      sx={{
        margin: "0px",
      }}
      display="flex"
      justifyContent="space-between"
    >
      <Typography variant="h4">Get Assignment Details</Typography>
      {/* <Link to="add" display="flex" justifycontent="center">
        <Addbutton Name="Add" />
      </Link> */}
    </Box>

    <Paper sx={{ width: "100%", mb: 2 }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>No of Guests</TableCell>
            <TableCell>Guest Name</TableCell>
            <TableCell>Assignment Date</TableCell>
            <TableCell>Total Stay Duration</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Host Income<assignmentDate/TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.numOfGuests}</TableCell>
              <TableCell>{row.guestName}</TableCell>
              <TableCell>{row.assignmentDate}</TableCell>
              <TableCell>{row.totalStayDuration}</TableCell>
              <TableCell>{row.totalPrice}</TableCell>
              <TableCell>{row.hostIncome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  </Box>
   

    
  );
}