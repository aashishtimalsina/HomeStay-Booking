import React from "react";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
} from "../Constants";

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
  };

  const images = [image1, image2, image3, image4, image5, image6, image7];

  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-4xl w-full text-center m-4 mb-16">
        Welcome to {data.homestay.name}
      </h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {Object.entries(data).map(([key, value], index) => (
            <React.Fragment key={key}>
              {index % 2 === 0 ? (
                <>
                  <div className="text-center md:text-left">
                    <h3 className="text-lg uppercase leading-6 font-medium text-gray-900 mb-2">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <p className="text-base text-gray-500">
                      {value.description}
                    </p>
                  </div>
                  <div className="text-center">
                    <img
                      src={images[index % images.length]}
                      alt={`Homestay Image ${index + 1}`}
                      className="w-60 h-60 md:w-auto inline-block mb-4 mx-auto"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <img
                      src={images[index % images.length]}
                      alt={`Homestay Image ${index + 1}`}
                      className="w-60 h-60 md:w-auto inline-block mb-4 mx-auto"
                    />
                  </div>
                  <div className="text-center md:text-right">
                    <h3 className="text-lg uppercase leading-6 font-medium text-gray-900 mb-2">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <p className="text-base text-gray-500">
                      {value.description}
                    </p>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeStaySection;
