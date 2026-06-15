import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-200">
      © {new Date().getFullYear()} Word Splash. All rights reserved.
    </footer>
  );
};

export default Footer;
