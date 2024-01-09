import React from "react";
import styles from "../../style";
import { logo } from "../Constants";
import { footerLinks, socialMedia, footerDetails } from "./constant";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className={` ${styles.paddingY} p-3 w-full flex-col bg-black `}>
      <div
        className={` flex justify-between w-full md:flex-row flex-col mb-8w-full`}
      >
        <div className=" flex w-full  lg:w-1/2 h-full items-center justify-center ">
          <img src={logo} alt="logo" className="w-64  my-auto h-64  " />
        </div>
        <div className="w-full lg:w-1/2 flex item-center justify-around">
          <div className=" hidden lg:w-full lg:flex lg:flex-row lg:justify-between lg:flex-wrap md:mt-0 mt-10 ">
            {footerLinks.map((footerLink) => (
              <div key={footerLink.key} className="flex flex-col mt-5 ">
                <h4 className="font-poppins font-medium text-[16px] leading-[27px] text-white  ">
                  {footerLink.title}
                </h4>
                <ul className="list-none  mt-2">
                  {footerLink.links.map((link, index) => (
                    <li className="mt-2">
                      <Link
                        to={link.url}
                        key={link.id}
                        className={`font-poppins font-normal text-[16px] leading-[24px] text-gray-200 hover:text-secondary cursor-pointer  ${
                          index !== link.length - 1 ? "mb-4" : "mb-0"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="  md:mt-0 ">
            {footerDetails.map((data) => (
              <div
                key={data.id} // Fixing the key attribute to reference data.id
                className="flex flex-col mt-5"
              >
                <h4 className="font-poppins font-medium h-full text-white">
                  {data.name}: {data.label}{" "}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3f3r45] ">
        <p className="font-poppins font-normal text-center text-[16px] leading-[27px] text-white  ">
          2021 Panauti Community Services. All Right Reserved.
        </p>
        <div className=" flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social, index) => (
            <img
              key={social.id}
              src={social.icon}
              alt={social.id}
              className={`w-[21px] h-[21] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
