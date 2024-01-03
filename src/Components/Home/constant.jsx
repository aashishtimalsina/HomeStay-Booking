import {
  home1,
  home2,
  locationIcon,
  activityimage,
  activityimage2,
  activityimage3,
  activityimage4,
  car,
  laundry,
  wifi,
  pool,
  breakfast,
  housekeeping,
  swimming,
  service,
  delux,
  double,
  luxury,
  guest,
  bed,
  bathroom,
} from "../Constants";

export const HomeDetails = [
  {
    id: 1,
    label: "Experience Ancient Newari Culture Close To Kathmandu",
    image: [{ id: 1, image1: home1, image2: home2 }],

    location: "Panauti-Kushadevi Rd, Panauti 45209, Nepal ",
    locationIcon: locationIcon,
    preview: "Welcome Everyone",
  },
];
export const activities = [
  {
    id: 1,
    label: "Hiking",
    price: 100,
    photo: activityimage,
    catagory: "OUTDOOR",
  },
  {
    id: 2,
    label: "Local Livestyle",
    price: 100,
    photo: activityimage2,
    catagory: "OUTDOOR",
  },
  {
    id: 3,
    label: " Culture",
    price: 100,
    photo: activityimage3,
    catagory: "OUTDOOR",
  },
  {
    id: 4,
    label: "Sight Seeing",
    price: 100,
    photo: activityimage4,
    catagory: "OUTDOOR",
  },
];
export const services = [
  {
    id: 1,
    name: "Pick up services",
    description:
      "Lorem ipsum proin gravida velit auctor sde re sit amet space.",
    icon: car,
  },
  {
    id: 2,
    name: "Hosekeeper Services",
    description:
      "Lorem ipsum proin gravida velit auctor sde re sit amet space.",
    icon: housekeeping,
  },
  {
    id: 3,
    name: "Wifi & Internet",
    description:
      "Lorem ipsum proin gravida velit auctor sde re sit amet space.",
    icon: wifi,
  },
  {
    id: 4,
    name: "Laundry Services",
    description:
      "Lorem ipsum proin gravida velit auctor sde re sit amet space.",
    icon: laundry,
  },
  {
    id: 5,
    name: "Breakfast in Bed",
    description:
      "Lorem ipsum proin gravida velit auctor sde re sit amet space.",
    icon: breakfast,
  },
  {
    id: 6,
    name: "Swimming Pool",
    description:
      "Lorem ipsum proin gravida velit auctor sde re sit amet space.",
    icon: pool,
  },
];
export const servicePhotos = [
  {
    id: 1,
    photo1: swimming,
    photo2: service,
  },
];
export const room = [
  {
    id: 1,
    label: "Delux Room",
    image: delux,
    price: 300,
    discription: [
      {
        id: 1,
        bedicon: bed,
        bed: "1 Bed",
      },
      {
        id: 2,
        bathroomicon: bathroom,
        bathroom: "1 Bathroom",
      },
      {
        id: 3,
        guesticon: guest,
        capacity: "2 Guests",
      },
    ],
  },
  {
    id: 2,
    price: 300,

    label: " Luxury Suite",
    image: luxury,
    discription: [
      {
        id: 1,

        icon: bed,
        name: "2 Beds",
      },
      {
        id: 2,
        icon: bathroom,
        name: "1 Bathrooms",
      },
      {
        id: 3,
        icon: guest,
        name: "4 Guests",
      },
    ],
  },
  {
    id: 3,
    label: "Double Room",
    price: 300,

    image: double,
    discription: [
      {
        id: 1,
        icon: bed,
        name: "2 Beds",
      },
      {
        id: 2,
        icon: bathroom,
        name: "1 Bathrooms",
      },
      {
        id: 3,
        icon: guest,
        name: "2 Guests",
      },
    ],
  },
];
