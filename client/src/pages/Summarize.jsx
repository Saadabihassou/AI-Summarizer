import React, { useState, useEffect } from "react";
import useSummarize from "../hooks/useSummarize";
import Navbar from "../components/Navbar";
import axios from "axios";
import Footer from "../components/Footer";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function Summarize() {
  const [inputText, setInputText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const { summary, isLoading, error, getSummarize } = useSummarize({
    text_to_summarize: inputText,
  });
  const [summarizingPage, setSummarizingPage] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      await getSummarize();
    }
  };

  async function getSummarizePage() {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/summarizing-page?populate=*"
      );
      setSummarizingPage(response.data.data);
    } catch (error) {
      console.error("Failed to load summarize page:", error);
    }
  }

  React.useEffect(() => {
    getSummarizePage();
  }, []);

  return (
    <main
      className={`flex flex-col gap-y-10 min-h-screen ${
        darkMode ? "dark bg-gray-900" : "bg-white"
      }`}
    >
      <div className="self-center pt-10 flex flex-col text-center gap-y-7 w-full max-w-2xl px-4">
        <h1
          className={`text-3xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${
            darkMode
              ? "from-orange-400 to-pink-400"
              : "from-orange-500 to-pink-500"
          } border-b-2 ${
            darkMode ? "border-orange-400" : "border-orange-500"
          } pb-1`}
        >
          {summarizingPage?.title}
        </h1>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-y-4 rounded-lg border-2 ${
            darkMode
              ? "border-orange-400 bg-gray-800"
              : "border-orange-500 bg-white"
          } p-4 text-center`}
        >
          <h1
            className={`text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r ${
              darkMode
                ? "from-orange-400 to-pink-400"
                : "from-orange-500 to-pink-500"
            } border-b-2 ${
              darkMode ? "border-orange-400" : "border-orange-500"
            } w-fit mx-auto`}
          >
            {summarizingPage?.form?.title}
          </h1>

          {/* input */}
          <div className="flex flex-col items-start w-full">
            <span
              className={`font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Text:
            </span>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={summarizingPage?.form?.placeholder}
              className={`w-full rounded-lg border-2 ${
                darkMode
                  ? "border-orange-400 bg-gray-700 text-white"
                  : "border-orange-500"
              } p-2 min-h-[150px]`}
            />
          </div>

          {/* Signed in users can summarize */}
          <SignedIn>
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className={`${
                darkMode
                  ? "bg-orange-400 hover:bg-orange-500"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white font-semibold py-2 px-4 rounded-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Summarizing...
                </span>
              ) : (
                "Summarize Text"
              )}
            </button>
          </SignedIn>

          {/* Signed out users see login prompt */}
          <SignedOut>
            <div className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-orange-50"
            }`}>
              <p className={`mb-4 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}>
                Please sign in to use the summarization feature.
              </p>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className={`${
                    darkMode
                      ? "bg-orange-400 hover:bg-orange-500"
                      : "bg-orange-500 hover:bg-orange-600"
                  } text-white font-semibold py-2 px-4 rounded-full transition duration-300`}
                >
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        </form>

        {/* Summary output */}
        {summary && (
          <div
            className={`rounded-lg border-2 ${
              darkMode
                ? "border-green-400 bg-gray-800"
                : "border-green-500 bg-white"
            } p-4`}
          >
            <h2
              className={`text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r ${
                darkMode
                  ? "from-green-400 to-blue-400"
                  : "from-green-500 to-blue-500"
              } border-b-2 ${
                darkMode ? "border-green-400" : "border-green-500"
              } pb-1 mb-3`}
            >
              Summary
            </h2>
            <p className={darkMode ? "text-gray-200" : "text-gray-700"}>
              {summary}
            </p>

            {/* Copy button */}
            <button
              onClick={() => window.navigator.clipboard.writeText(summary)}
              className={`mt-4 rounded-lg border-2 ${
                darkMode
                  ? "border-green-400 bg-gray-800"
                  : "border-green-500 bg-white"
              } p-2 ${darkMode ? "text-green-400" : "text-green-500"}`}
            >
              Copy
            </button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            className={`rounded-lg border-2 ${
              darkMode
                ? "border-red-400 bg-gray-800"
                : "border-red-500 bg-white"
            } p-4 ${darkMode ? "text-red-400" : "text-red-500"}`}
          >
            Error: {error}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}