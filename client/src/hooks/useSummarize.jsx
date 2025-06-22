import { useState } from "react";
import axios from "axios";

export default function useSummarize({ text_to_summarize }) {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getSummarize() {
    if (!text_to_summarize) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        { inputs: text_to_summarize },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.REACT_APP_HF_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      if (response.data && response.data[0]?.summary_text) {
        setSummary(response.data[0].summary_text);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Summarization error:", error);
      setError(
        error.response?.data?.error ||
          error.message ||
          "Failed to summarize text"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { summary, isLoading, error, getSummarize };
}
