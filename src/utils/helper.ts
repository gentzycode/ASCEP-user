/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, parseISO } from "date-fns";

// Convert date string
export const formattedDate = (dateString: string) => {
  const date = parseISO(dateString);
  const formattedDate = format(date, "yyyy-MM-dd");
  return formattedDate;
};

export function appendObjectToFormData(
  formData: FormData,
  data: any,
  parentKey: string = ""
): void {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof File || value instanceof Blob) {
        formData.append(newKey, value);
      } else if (typeof value === "object" && value !== null) {
        appendObjectToFormData(formData, value, newKey);
      } else {
        formData.append(newKey, value);
      }
    }
  }
}

export function getPastDays(days: number) {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - days);

  // Format the date to ISO 8601 format
  const isoDate = lastWeek.toISOString().split("T")[0];

  return isoDate;
}

export function getAlphabetLetter(number: number) {
  // Check if the number is in the valid range (1 to 26)
  if (number >= 1 && number <= 26) {
    // Convert the number to its corresponding ASCII code for 'a'
    const asciiCodeForA = "a".charCodeAt(0);

    // Calculate the ASCII code for the corresponding alphabet letter
    const asciiCodeForLetter = asciiCodeForA + number - 1;

    // Convert the ASCII code back to a character (alphabet letter)
    const alphabetLetter = String.fromCharCode(asciiCodeForLetter);

    return alphabetLetter;
  } else {
    // Handle the case when the number is outside the valid range
    console.error("Invalid number. Please provide a number between 1 and 26.");
    return null;
  }
}

export const formatStringWithLineBreaks = (textAreaValue: string) => {
  // Split the textarea value using the newline character
  const lines = textAreaValue.split("\n");

  // Map through the lines and create a new array with <p> tags for each line
  const formattedLines = lines.map((line) => `<p>${line}</p>`);

  return formattedLines;
};
