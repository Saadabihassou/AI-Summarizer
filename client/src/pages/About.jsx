import React, { useEffect, useState } from "react";
import axios from "axios";


export default function About() {
  const [about, setAbout] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Sync with the app's dark mode
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

  async function getAbout() {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/about?populate=*"
      );
      setAbout(response.data.data);
    } catch (error) {
      console.error("Failed to load about:", error);
    }
  }

  useEffect(() => {
    getAbout();
  }, []);

  return (
    <main
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-white"}`}
    >

      <section
        className={`flex flex-col justify-center items-center gap-y-12 py-12 px-4 md:px-8 lg:px-12 transition-colors duration-300 ${
          darkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        {/* Header with animated gradient */}
        <h1
          className={`text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r ${
            darkMode
              ? "from-pink-400 to-violet-400"
              : "from-pink-500 to-violet-500"
          } border-b-4 ${
            darkMode ? "border-pink-400" : "border-pink-500"
          } px-5 pb-2 animate-gradient`}
        >
          {about?.title}
        </h1>

        {/* About content with responsive layout */}
        <div
          className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full max-w-6xl p-6 rounded-2xl ${
            darkMode ? "bg-gray-800" : "bg-gray-50"
          } shadow-xl`}
        >
          {/* Text content */}
          <div
            className={`flex-1 text-lg leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {about?.description?.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}

            {/* Image with fancy frame */}
            <div className="flex-1 flex justify-center">
              <div
                className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl ${
                  darkMode ? "ring-2 ring-pink-400" : "ring-2 ring-pink-500"
                }`}
              >
                <img
                  src={"http://localhost:1337" + about?.aboutImage?.url}
                  alt={about?.title}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
                <div
                  className={`absolute inset-0 ${
                    darkMode ? "bg-pink-900" : "bg-pink-100"
                  } mix-blend-multiply opacity-20`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
