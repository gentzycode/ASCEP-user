import { format, parseISO } from "date-fns";

// Convert date string
export const formattedDate = (dateString: string) => {
    const date = parseISO(dateString);
    const formattedDate = format(date, "yyyy-MM-dd");
    return formattedDate

}

