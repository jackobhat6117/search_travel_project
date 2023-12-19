import React from "react";

const formatDate = (dateString: any) => {
const date = new Date(dateString);

// Format the date portion
const optionsDate: any = { day: "2-digit", month: "2-digit", year: "numeric" };
const formattedDate = date.toLocaleDateString("en-GB", optionsDate);

// Format the time portion
const optionsTime: any = { hour: "2-digit", minute: "2-digit", hour12: true };
const formattedTime = date.toLocaleString("en-GB", optionsTime);

// Convert AM/PM to uppercase
const uppercasedTime = formattedTime.toUpperCase();

// Combine date and time with a hyphen
return `${formattedDate} ${uppercasedTime}`;
};

// Helper function to add ordinal suffix to a number (e.g., 1st, 2nd, 3rd)
// const addOrdinalSuffix = (num: number) => {
//   const j = num % 10;
//   const k = num % 100;

//   if (j === 1 && k !== 11) {
//     return num + "st";
//   }
//   if (j === 2 && k !== 12) {
//     return num + "nd";
//   }
//   if (j === 3 && k !== 13) {
//     return num + "rd";
//   }

//   return num + "th";
// };

const DateFormatter = ({ dateFormat }: { dateFormat: any }) => {
  const dateToFormat = dateFormat;

  return <>{formatDate(dateToFormat)}</>;
};

export default DateFormatter;
