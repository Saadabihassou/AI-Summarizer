import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  const [hero, setHero] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Sync with navbar's dark mode by checking the HTML class
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

  async function getHero() {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/hero?populate=*"
      );
      setHero(response.data.data);
    } catch (error) {
      console.error("Failed to load hero:", error);
    }
  }

  useEffect(() => {
    getHero();
  }, []);

  return (
    <header
      className={`flex flex-col md:flex-row justify-between items-center px-12 py-[65px] px-6 md:px-20 ${
        darkMode ? "dark bg-gray-800" : ""
      }`}
    >
      <div className="flex flex-col gap-4 w-full md:w-1/2 items-start">
        <h1
          className={`text-3xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${
            darkMode
              ? "from-orange-400 to-pink-400"
              : "from-orange-500 to-pink-500"
          }`}
        >
          {hero?.title}
        </h1>
        <p
          className={`text-md max-w-lg ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {hero?.description}
        </p>
        <a
          href="/summarize"
          className={`mt-4 inline-flex items-center ${
            darkMode
              ? "bg-orange-400 hover:bg-orange-500 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-orange-400 hover:ring-offset-4 hover:ring-offset-gray-800 hover:shadow-orange-200"
              : "bg-orange-500 hover:bg-orange-600 hover:-translate-y-1 hover:shadow-2xl "
          } text-white font-semibold py-2 px-6 rounded-full transition duration-300`}
        >
          Get Started
          <FaArrowRight className="ml-2" />
        </a>
      </div>

      <img
        src={"http://localhost:1337" + hero?.heroImage?.url}
        alt="Hero"
        className={`w-full md:w-1/2 mt-8 md:mt-0 rounded-3xl border-2 shadow-2xl hover:-translate-y-2 duration-300 ${
          darkMode ? "border-orange-400 shadow-orange-300" : "border-orange-500"
        }`}
      />
    </header>
  );
}
