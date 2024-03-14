import React from "react";
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
import Cookies from "js-cookie";

function ActivityHead(props) {
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

export default function Activity() {
  const [activity, setActivity] = React.useState([]);

  const apiUrl =
    "https://moved-readily-chimp.ngrok-free.app/activitiesDetails";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        if (response.data) {
          setActivity(response.data.list || []);
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Retrieve the token from cookies
      const token = Cookies.get("token");
      if (token) {
        // Encode the token to ensure it's safely transmitted in the HTTP header
        const encodedToken = encodeURIComponent(token);
  
        // Perform the delete request with the necessary headers
        await axios.delete(`https://moved-readily-chimp.ngrok-free.app/deleteActivity/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": true,
            "Authorization": `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        });
        // Update the state to reflect the deletion
        setActivity(activity.filter(item => item.id !== id));
        alert("Activity deleted successfully.");
      } else {
        console.error("Token not found");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const headCells = [
    {
      id: "Name of Activity",
      numeric: false,
      disablePadding: true,
      label: "Name of Activity",
    },
    {
      id: "Description",
      numeric: false,
      disablePadding: true,
      label: "Description",
    },
    {
      id: "Cost",
      numeric: true,
      disablePadding: false,
      label: "Cost",
    },
    {
      id: "Image",
      numeric: true,
      disablePadding: false,
      label: "Image",
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
        <Typography variant="h4">Activity</Typography>
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
            <ActivityHead headCells={headCells} />
            <TableBody>
              {activity.map((row) => (
                <TableRow key={row.id} sx={{ cursor: "pointer" }}>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    align="center"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.about}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>

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
                  <TableCell sx={{ width: "120px" }}>
                    <Box display="flex" justifyContent="space-between">
                      <Link to={`detail/${row.id}`}>
                        <RemoveRedEyeIcon />
                      </Link>
                      <Link to={`edit/${row.id}`}>
                        <EditOutlinedIcon />
                      </Link>
                      <DeleteForeverOutlinedIcon onClick={() => handleDelete(row.id)} />
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
