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

import { Addbutton } from "../components/Button/Addbutton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
  const [hosts, setHosts] = React.useState([]);

const apiUrl = "https://c23a-2400-1a00-b060-8b27-90e7-4323-28d6-9cf6.ngrok-free.app/getHostDetails";

React.useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "ngrok-skip-browser-warning": true
        }
      });
      if (response.data) {
        setHosts(response.data.list || []);
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
      id: "Image",
      numeric: false,
      disablePadding: true,
      label: "Image",
    },
    {
      id: "Name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "About",
      numeric: true,
      disablePadding: false,
      label: "About",
    },
    {
      id: "Address",
      numeric: true,
      disablePadding: false,
      label: "Address",
    },
    {
      id: "Phone Number",
      numeric: true,
      disablePadding: false,
      label: "Phone Number",
    },
    {
      id: "Action",
      numeric: true,
      disablePadding: false,
      label: "Action",
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
        <Typography variant="h4">Hosts</Typography>
        <Link to="add" display="flex" justifycontent="center">
          <Addbutton Name="Add" />
        </Link>
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer
          sx={{
            marginTop: "20px",
          }}
        >
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <HostHead headCells={headCells} />
            <TableBody>
              {hosts.map((row) => (
                <TableRow key={row.id} sx={{ cursor: "pointer" }}>
                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={row.image}
                      alt="host-img"
                      height={40}
                      width={40}
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    align="center"
                  >
                    {row.hostName}
                  </TableCell>
                  <TableCell align="center">{row.about}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell sx={{ width: "120px" }}>
                    <Box display="flex" justifyContent="space-between">
                      <Link to={``}>
                        <RemoveRedEyeIcon />
                      </Link>
                      <Link to={``}>
                        <EditOutlinedIcon />
                      </Link>
                      <DeleteForeverOutlinedIcon />
                    </Box>
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
