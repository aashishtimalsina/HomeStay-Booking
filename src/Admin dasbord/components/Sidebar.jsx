import * as React from "react";
import { styled, useTheme, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/LoginRounded";
import ProfileIcon from "@mui/icons-material/People";
import BellIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
// import { withRouter } from "react-router-dom";

import { navbar } from "../constants";
import { logo } from "../assets";
import { Avatar, Menu, MenuItem, Select, TextField } from "@mui/material";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#FF5733",
      light: "#FFFFFF",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
    ternary: {
      light: "#FFFFFF",
      dark: "#000000",
    },
  },
});

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: customTheme.palette.primary.light,
  boxShadow: "none",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  color: customTheme.palette.ternary.dark,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Navbardashboard = () => {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [pathname, setPathname] = React.useState("");
  const pathnames = location.pathname;
  const checkpathname = pathnames.split("/").filter((x) => x);
  const pathnameArray = ` /${checkpathname.slice(0, 2).join("/")}`;
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 2,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                ...(open && { display: "none" }),
              }}
            >
              pch
            </Typography>
          </Toolbar>
          <Toolbar>
            <Box>
              <Box>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    height: "40px",
                    width: "40px",
                    bgcolor: "#3A7198",
                    color: "#fffff",
                  }}
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                />
                <Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      marginTop="20px"
                      onClick={handleClose}
                      sx={{
                        width: "200px",
                      }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                          sx={{
                            height: "30px",
                            width: "30px",
                            margin: "auto",
                            bgcolor: "#3A7198",
                            color: "#fffff",
                          }}
                          onClick={handleClick}
                          style={{ cursor: "pointer" }}
                        />
                        <Box marginLeft="10px">
                          <Typography
                            variant="h6"
                            lineHeight="15px"
                            fontSize="16px"
                            color="rgba(0, 0, 0, 0.6)"
                          >
                            Jhon Doe
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="rgba(0, 0, 0, 0.5)"
                          >
                            Admin
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                    <Link>
                      <MenuItem marginTop="20px" onClick={handleClose}>
                        <SettingsIcon fontSize="25px" />{" "}
                        <Typography marginLeft="20px">Settings</Typography>
                      </MenuItem>{" "}
                    </Link>
                    <Link>
                      <MenuItem marginTop="20px" onClick={handleClose}>
                        <LogoutIcon fontSize="25px" />{" "}
                        <Typography marginLeft="20px">Logout</Typography>
                      </MenuItem>
                    </Link>
                  </Menu>
                </Box>
              </Box>
              <Box
                max-width="120px"
                display="flex"
                justifyContent="space-between"
                alignItems={"center"}
              ></Box>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            display="flex"
            marginLeft="8px"
            width="130px"
            justifyContent="space-between"
          >
            {/* <img src="/favicon.svg" alt="logo" width={35} height={35} /> */}
            <Typography variant="h6" noWrap component="div">
              PCH
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navbar.map((text) => {
            return (
              <ListItem key={text.id} disablePadding sx={{ display: "block" }}>
                <Link to={`${text.url}`}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <img src={text.icon} alt="icon" width={20} height={20} />
                    </ListItemIcon>

                    <ListItemText
                      primary={text.label}
                      sx={{
                        opacity: open ? 1 : 0,
                        color:
                          text.url === checkpathname[1]
                            ? "black"
                            : "rgba(0, 0, 0, 0.5)",
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
};
export default Navbardashboard;
