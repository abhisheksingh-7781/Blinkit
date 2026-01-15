import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto lg:px-30 p-3 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>
          <i className="ri-copyright-line"></i> All Right Reserved{" "}
          {new Date(Date.now()).getFullYear()}
        </p>
        <div className="flex items-center gap-5 justify-center text-3xl">
          <a href="" className="hover:text-blue-400">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-red-300">
            <FaInstagram />
          </a>
          <a href="" className="hover:text-gray-400">
            <FaSquareXTwitter />
          </a>
          <a href="" className="hover:text-blue-500">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
