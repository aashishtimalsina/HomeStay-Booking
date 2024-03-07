import React from "react";

import { locationIcon, activityimage4 } from "../Constants";
import styles from "../../style";
import Navbar from "../Navbar";

const ActivitesViewmorePage = () => {
  return (
    <div
      className=" bg-cover h-full mb-10 bg-center  w-full overflow-hidden "
      style={{
        backgroundImage: `url(${activityimage4})`,
      }}
    >
      <div className=" w-full  h-full bg-black  bg-opacity-45 ">
        <Navbar />
        <div className="p-10 py-20  w-custom  flex justify-left h-full items-end  m-auto  ">
          <div>
            <h1 className="mb-5  lg:text-4xl  text-left lg:w-auto font-semibold tracking-tight lg:leading-[70px] sm:leading-none md:leading-loose leading-loose  text-white line-clamp-5  md:text-5xl text-xl dark:text-white">
              Panauti Community Homestay <br /> Panauti Nature, lifestyle and
              Culture
            </h1>

            <p className="text-left  text-lg lg:text-md text-white ">
              {/* <img src={locationIcon} alt="location" className=" w-10 h-10" /> */}
              <span className=" text-primary-1 text-4xl">Rs 200 </span> per
              guest
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p className={`${styles.paragraph}`}>
            Embark on an unforgettable hiking adventure from the enchanting town
            of Panauti to the sacred destination of Namobuddha. Our Panauti to
            Namobuddha Hiking Experience invites you to explore the natural
            beauty, cultural richness, and spiritual serenity of the Kathmandu
            Valley. Setting off from Panauti, a town steeped in history and
            adorned with ancient temples and architecture, the trail winds
            through picturesque landscapes and traditional Nepali villages. As
            you traverse the undulating terrain, you'll be greeted by the warmth
            of the locals and the mesmerizing views of terraced fields and
            rolling hills. The journey unfolds with a visit to the revered
            Namobuddha, a sacred pilgrimage site for Buddhists. Surrounded by
            tranquility, Namobuddha offers a serene escape and a chance to
            explore the intricacies of Buddhist culture. Marvel at the sacred
            stupas, prayer flags fluttering in the breeze, and the peaceful
            ambiance that envelops this spiritual haven. Our guided hiking
            experience ensures not just a physical journey but also a cultural
            and spiritual immersion. Learn about the local flora and fauna from
            our experienced guides, and discover the stories and legends that
            have shaped the landscape. This hiking experience is designed for
            all levels of adventurers, with well-planned routes and rest stops
            to appreciate the breathtaking panoramas. Whether you are a seasoned
            hiker or someone seeking a leisurely trek, the Panauti to Namobuddha
            Hiking Experience promises an enriching journey through the heart of
            Nepal. Join us on this exploration of nature, culture, and
            spirituality. Book your spot now and embark on a soul-stirring hike
            from the historical town of Panauti to the sacred grounds of
            Namobuddha, where every step unveils the beauty of Nepal's diverse
            landscapes and ancient traditions.
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ActivitesViewmorePage;
