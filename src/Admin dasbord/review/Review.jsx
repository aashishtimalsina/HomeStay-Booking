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
import { Rating, Typography } from "@mui/material";
import axios from "axios";

import { Addbutton } from "../components/Button/Addbutton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import webApi from "../../Config/config";
import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'


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

export default function Review() {
  const [reviews, setReviews] = React.useState([]);
  const apiUrls = webApi.apiUrl ;
  const MySwal = withReactContent(Swal)
  const token = Cookies.get('token');
  const navigate = useNavigate( );

  React.useEffect(() => {
    
    const fetchData = async () => {
      try {
        if (token) {
          const encodedToken = encodeURIComponent(token);
        const response = await axios.get(apiUrls +"/getReviews", {
          headers: {
            
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data) {
          setReviews(response.data.list || []);
          console.log("Response data:", response.data);
        } else {
          console.error("Empty response data");
        }}else{
          navigate('/login')
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDeleteHost = async (id) => {
    try {
      if (token) {
        const encodedToken = encodeURIComponent(token);
      await axios.delete(
        
        apiUrls +  "/deleteReviews/"+id,  {
          headers: {
            
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${encodedToken}`,
            "Content-Type": "application/json",
          },
        });
      // After successful deletion, you may want to update the hosts state to reflect the changes
      setReviews(reviews.filter((reviews) => reviews.id !== id));
      return MySwal.fire({
        icon: 'success',
        title: 'Review Deleted Successful',
       });
    }else{
      navigate('/login')
    }
    } catch (error) {
      console.error("Error deleting host:", error);
    }
  };

  const headCells = [
    {
      id: "Id",
      numeric: false,
      disablePadding: true,
      label: "Id",
    },
    {
      id: "Name",
      numeric: true,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "Review",
      numeric: false,
      disablePadding: true,
      label: "Review",
    },
    {
      id: "Rating",
      numeric: false,
      disablePadding: true,
      label: "Rating",
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
        <Typography variant="h4">Reviews</Typography>
        {/* <Link to="add" display="flex" justifycontent="center">
          <Addbutton Name="Add" />
        </Link> */}
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
              {reviews.map((row,index) => (
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
                   <TableCell align="center">{row.review}</TableCell>
                  <TableCell align="center"><Rating name="read-only" value={row.rating||  0} readOnly /></TableCell>
                   <TableCell sx={{ width: "120px" }}>
                    <Box display="flex" justifyContent="space-between">
                      {/* <Link to={`detail/${row.phone}`}>
                        <RemoveRedEyeIcon />
                      </Link> */}
                      {/* <Link to={`update/${row.phone}`}>
                        <EditOutlinedIcon />
                      </Link> */}
                      <DeleteForeverOutlinedIcon
                        onClick={() => handleDeleteHost(row.id)}
                      />
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
