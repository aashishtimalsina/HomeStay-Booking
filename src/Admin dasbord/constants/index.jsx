import { dashboard, watch } from "../assets";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import GiteRoundedIcon from "@mui/icons-material/GiteRounded";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ReviewsIconRoundedIcon from '@mui/icons-material/ReviewsRounded';
import InfoIconRoundedIcon from "@mui/icons-material/InfoRounded";
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import { BookmarkAddTwoTone } from "@mui/icons-material";

export const navbar = [
  {
    id: 1,
    label: "Dashboard",
    url: "dashboard",
    icon: <GridViewRoundedIcon />,
  },
  {
    id: 2,
    label: "About Us",
    url: "aboutUs",
    icon: <InfoIconRoundedIcon />,
  },
  {
    id: 3,
    label: "Host",
    url: "host",
    icon: <GiteRoundedIcon />,
  },
  {
    id: 4,
    label: "SignUp Host",
    url: "signupHost",
    icon: <GiteRoundedIcon />,
  },
  {
    id: 5,
    label: "Activity",
    url: "activity",
    icon: <LocalActivityRoundedIcon />,
  },
  {
    id: 6,
    label: "Activity Booking",
    url: "activityBooking",
    icon: <BookmarkAddTwoTone />,
  },
  {

    id: 7,
    label: "Booking",
    url: "booking",
    icon: <BookmarkRoundedIcon />,
  },
  {
    id: 8,
    label: "Review",
    url: "review",
    icon: <ReviewsIconRoundedIcon />,
  },
  {
    id: 7,
    label: "Contact Us",
    url: "contact",
    icon: <ContactMailRoundedIcon />,
  },
];
export const HostHeadTitle = [
  {
    id: "Image",

    label: "Image",
  },
  {
    id: "Name",

    label: "Name",
  },
  {
    id: "Course",
    numeric: true,
    disablePadding: false,
    label: "Course",
  },
  {
    id: "Address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "Email_Id",
    numeric: true,
    disablePadding: false,
    label: "Email_Id",
  },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];
export const TableHeadTitle = [
  {
    header: [
      {
        id: "Image",
        label: "Image",
      },
      {
        id: "Name",
        label: "Name",
      },
      {
        id: "About",
        label: "About",
      },
      {
        id: "Address",
        label: "Address",
      },
      {
        id: "Phone no",
        label: "Phone no",
      },
      {
        id: "Action",
        label: "Action",
      },
    ],
  },
  {
    detail: [
      {
        hostName: "ShreyaSth",
        address: "Panauti-5",
        about: "Host of the homestay",
        image: "",
        phone: "800000000",
      },
      {
        hostName: "ShreyaSth",
        address: "Panauti-5",
        about: "Host of the homestay",
        image: "",
        phone: "800000000",
      },
    ],
  },
];
export const datas = [
  {
    year: 2010,
    count: 10,
    color: "rgba(255, 99, 132, 0.2)",
    backGroundColor: "rgb(255, 99, 132)",
  },
  {
    year: 2011,
    count: 20,
    color: "rgba(255, 99, 132, 0.2)",
    backGroundColor: "rgb(255, 99, 132)",
  },
  {
    year: 2012,
    count: 15,
    color: "rgba(255, 99, 132, 0.2)",
    backGroundColor: "rgb(255, 99, 132)",
  },
  {
    year: 2013,
    count: 25,
    color: "rgba(255, 99, 132, 0.2)",
    backGroundColor: "rgb(255, 99, 132)",
  },
  {
    year: 2014,
    count: 22,
    color: "rgba(255, 99, 132, 0.2)",
    backGroundColor: "rgb(255, 99, 132)",
  },
  {
    year: 2015,
    count: 30,
    color: "rgba(255, 99, 132, 0.2)",
    backGroundColor: "rgb(255, 99, 132)",
  },
  {
    year: 2016,
    count: 28,
    color: "rgba(255, 99, 132, 0.2)",
    backGroundColor: "rgb(255, 99, 132)",
  },
];
