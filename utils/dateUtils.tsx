/**
 * Converts a UTC date to the local time zone (e.g., UTC+3 for Saudi Arabia).
 * @param {Date | string} utcDate - The UTC date to convert (can be a Date object or ISO string).
 * @param {string} timeZone - The target time zone (default is 'Asia/Riyadh').
 * @returns {string} - The formatted date/time in the local time zone.
 */
function convertToLocalTime(
  utcDate: Date | string,
  timeZone: string = "Asia/Riyadh"
): string {
  // Convert input to Date object
  const date = new Date(utcDate);

  // Validate the date
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", utcDate);
    return "Invalid Date";
  }

  // Convert using `toLocaleString`
  return date.toLocaleString("en-US", { timeZone });
}

export default convertToLocalTime;
