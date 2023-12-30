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
