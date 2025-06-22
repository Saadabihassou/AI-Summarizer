import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const [footer, setFooter] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Sync with the rest of the app's dark mode
  useEffect(() => {
    const htmlElement = document.documentElement;
    setDarkMode(htmlElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setDarkMode(htmlElement.classList.contains("dark"));
    });

    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  async function getFooter() {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/footer?populate=*"
      );
      setFooter(response.data.data);
    } catch (error) {
      console.error("Failed to load footer:", error);
    }
  }

  React.useEffect(() => {
    getFooter();
  }, []);

  return (
    <footer
      className={`flex flex-col md:flex-row border-t-2 ${
        darkMode
          ? "border-orange-400 bg-gray-900"
          : "border-orange-500 bg-white"
      } justify-between items-start md:items-center pt-2 pb-3 px-6 md:px-20`}
    >
      <div className="mb-8 md:mb-0 flex flex-row items-center gap-3">
        <img
          alt="Logo"
          className={`w-14 rounded-full h-14 border p-2 object-contain ${
            darkMode ? "border-orange-400" : "border-orange-500"
          }`}
          src={"http://localhost:1337" + footer?.logo?.url}
        />
        <span
          className={`bg-clip-text text-transparent bg-gradient-to-r ${
            darkMode
              ? "from-orange-400 to-pink-400"
              : "from-orange-500 to-pink-500"
          } text-xl font-semibold`}
        >
          Brevity
        </span>
      </div>

      <div className="flex flex-col mb-8 md:mb-0">
        <p
          className={`font-semibold text-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
            darkMode
              ? "from-orange-400 to-pink-400"
              : "from-orange-500 to-pink-500"
          } border-b-2 ${darkMode ? "border-orange-400" : "border-orange-500"}`}
        >
          Quick Links
        </p>
        <div className="flex flex-row space-x-3">
          {footer?.quickLinks?.map((quickLink, index) => (
            <a
              key={index}
              href={quickLink.url}
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-orange-400"
                  : "text-gray-600 hover:text-orange-600"
              } transition duration-300 font-medium text-md`}
            >
              {quickLink.text}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <p
          className={`font-semibold text-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
            darkMode
              ? "from-orange-400 to-pink-400"
              : "from-orange-500 to-pink-500"
          } border-b-2 ${darkMode ? "border-orange-400" : "border-orange-500"}`}
        >
          Socials
        </p>
        <div className="flex flex-row space-x-3">
          <a
            href="https://www.facebook.com"
            className={`${
              darkMode
                ? "text-gray-300 hover:text-orange-400"
                : "text-gray-600 hover:text-orange-600"
            } transition duration-300 font-medium text-md`}
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://www.twitter.com"
            className={`${
              darkMode
                ? "text-gray-300 hover:text-orange-400"
                : "text-gray-600 hover:text-orange-600"
            } transition duration-300 font-medium text-md`}
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://www.github.com"
            className={`${
              darkMode
                ? "text-gray-300 hover:text-orange-400"
                : "text-gray-600 hover:text-orange-600"
            } transition duration-300 font-medium text-md`}
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
