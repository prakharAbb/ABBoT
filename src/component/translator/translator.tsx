//tranlator.tsx
import React, { useState, useEffect } from "react";

// Define a type for storing translations
interface LanguageText {
  [key: string]: string;
}

// Define props for LanguageTranslator component
interface TranslatorProps {
  language: string;   // The language to translate to
  keyName: string;    // The key to look up in the language JSON file
}

// Translator component takes a language and a keyName, fetches the translation, and displays it
const Translator: React.FC<TranslatorProps> = ({ language, keyName }) => {
  
  // State to store translated text
  const [translatedText, setTranslatedText] = useState<string>("");

  // Effect to fetch translation when language or keyName changes
  useEffect(() => {
    const fetchText = async () => {
      try {
        // Load the JSON file based on the provided language
        const languageData = await import(`component/translator/languages/${language}.json`);
        const data: LanguageText = languageData.default;
        const keys = keyName.split(".");

        let nestedData: LanguageText | string | undefined = data;

        // Traverse the nested object to find the text
        for (const key of keys) {
          if (
            nestedData &&
            typeof nestedData === "object" &&
            key in nestedData
          ) {
            nestedData = nestedData[key] as LanguageText | string;
          } else {
            setTranslatedText("Text not found");
            return;
          }
        }
        // Extract the text based on the provided keyName
        setTranslatedText(typeof nestedData === "string" ? nestedData : "Text not found");
      } catch (error) {
        console.error("Error fetching text:", error);
      }
    };

    fetchText();
  }, [language, keyName]); // Re-run effect when language or keyName changes

  // Render translated text
  return <>{translatedText}</>;
};

// LanguageTranslatorProvider is a simple wrapper component around LanguageTranslator
// It passes language and keyName props to LanguageTranslator and renders its output
const LanguageTranslatorProvider = ({ language, keyName }: TranslatorProps) => {
  const translatedText = Translator({ language, keyName });
  return translatedText;
};

export { Translator, LanguageTranslatorProvider };
