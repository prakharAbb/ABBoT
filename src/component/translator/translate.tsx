import React, { useState, useEffect } from "react";

// Define a type for storing translations
interface LanguageText {
  [key: string]: string;
}

// Define props for LanguageTranslator component
interface TranslatorProps {
  language: string;   // The language to translate to
}

// Translator component takes a language, fetches the translation, and returns a function to translate keys
const Translator = ({ language }: TranslatorProps) => {
  // State to store translation data
  const [languageData, setLanguageData] = useState<LanguageText | null>(null);

  // Effect to fetch translation when language changes
  useEffect(() => {
    const fetchLanguageData = async () => {
      try {
        // Load the JSON file based on the provided language
        const data = require(`./languages/${language}.json`);
        setLanguageData(data);
      } catch (error) {
        console.error("Error fetching language data:", error);
      }
    };

    fetchLanguageData();
  }, [language]); // Re-run effect when language changes

  // Function to translate a given key
  const translate = (key: string): string => {
    if (!languageData) {
      return "Language data not loaded";
    }

    let nestedData: LanguageText | string | undefined = languageData;
    const keys = key.split(".");

    // Traverse the nested object to find the text
    for (const key of keys) {
      if (
        nestedData &&
        typeof nestedData === "object" &&
        key in nestedData
      ) {
        nestedData = nestedData[key] as LanguageText | string;
      } else {
        return "Text not found";
      }
    }
    // Store the result in a variable
    const translatedText = nestedData && typeof nestedData === "string" ? nestedData : "Text not found";
    // Return the translated text
    return translatedText;
  };

  return translate;
};

export default Translator;
