import React from "react";
import { activityimage4 } from "../Constants";

const HomeStaySection = () => {
  const data = {
    homestay: {
      name: "Panauti Community Homestay",
      description:
        "Your Nepali Home Away From Home. Immerse yourself in local culture as our guests stay in individual homes. Our dedicated mothers prepare authentic Nepali meals, creating a unique, warm experience. Beyond accommodation, it's a journey into the heart of Panauti, with a special emphasis on women empowerment. Join us for a stay where every meal tells a story, and every moment is a celebration of Nepali hospitality and community strength.",
    },
    aboutPanauti: {
      description:
        "Panauti, a hidden gem in the Kathmandu Valley, is a town steeped in history and charm. Its narrow winding streets, ancient temples, and well-preserved architecture transport visitors to a bygone era. As you stroll through the cobblestone lanes, you'll encounter centuries-old structures, each telling a story of the town's cultural heritage. Panauti is not just a destination; it's a living museum where time seems to stand still. The town is known for its three medieval squares, offering a glimpse into Newari architecture and craftsmanship. The sacred confluence of the Roshi Khola and Punyamati rivers adds to the town's mystical allure.",
    },
    yourNepaliHome: {
      description:
        "Panauti Community Homestay provides an authentic experience, allowing you to live with local families in their traditional homes. Participate in daily rituals, share stories, and connect with the community on a personal level. Our hosts extend genuine warmth, ensuring your stay is not just comfortable but filled with meaningful interactions and shared experiences. Indulge in the taste of Nepal with our homemade traditional cuisine, prepared using locally sourced ingredients. Immerse yourself in the local way of life through guided tours, cultural workshops, and participation in community events. Explore the historic charm of Panauti and learn traditional crafts. Enjoy the serenity of your private room, equipped with basic amenities, providing a cozy retreat after a day of exploration.",
    },
    sustainableTourism: {
      description:
        "By choosing Panauti Community Homestay, you contribute to sustainable tourism, supporting the local community's women empowerment, education, healthcare, and overall development.",
    },
    closing: {
      message:
        "Embark on a journey of cultural discovery and create lasting memories at Panauti Community Homestay. Your Nepali home awaits, nestled in the heart of the historically rich and enchanting town of Panauti. Where every visit is not just a stay but an unforgettable experience woven with the threads of genuine hospitality and cultural immersion.",
    },
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Welcome to {data.homestay.name}
            </h2>
            <p className="mt-3 max-w-5xl mx-auto text-sm text-gray-500 sm:mt-4">
              {data.homestay.description}
            </p>
          </div>
          <div className="text-center">
            {/* Replace 'image-url' with the URL of your image */}
            <img
              src={activityimage4}
              alt="Homestay Image"
              className="w-full h-auto md:w-auto md:h-full"
            />
          </div>
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeStaySection;
