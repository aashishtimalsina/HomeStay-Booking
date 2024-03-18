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

export default function AboutUs() {
  const [homestayDetails, setHomestayDetails] = React.useState(null);
  const apiUrl = "https://moved-readily-chimp.ngrok-free.app/getHomeStayInfo/1";
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        if (response.data && response.data.homestay_details) {
          setHomestayDetails(response.data.homestay_details);
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
      id: "Id",
      numeric: false,
      disablePadding: true,
      label: "Id",
    },
    {
      id: "Title",
      numeric: true,
      disablePadding: false,
      label: "Title",
    },
    {
      id: "Price",
      numeric: false,
      disablePadding: true,
      label: "Price",
    },
    {
      id: "Address",
      numeric: true,
      disablePadding: false,
      label: "Address",
    },
    {
      id: "Gallery",
      numeric: true,
      disablePadding: false,
      label: "Gallery",
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
        <Typography variant="h4">Homestay Details</Typography>
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
              {homestayDetails && (
                <TableRow key={homestayDetails.id} sx={{ cursor: "pointer" }}>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    align="center"
                  >
                    {homestayDetails.id}
                  </TableCell>
                  <TableCell align="center">{homestayDetails.title}</TableCell>
                  <TableCell align="center">{homestayDetails.price}</TableCell>
                  <TableCell align="center">{homestayDetails.address}</TableCell>
                  <TableCell align="center">
                  <ul>
                      {homestayDetails.galleryImages.map((image, index) => (
                        <li key={index}>
                          <img src={image} alt={`Gallery Image ${index}`} style={{ maxWidth: '100px' }} />
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/admin/aboutUs/edit/${homestayDetails.id}`}>
                      <EditOutlinedIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}