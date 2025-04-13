// /import fonts/
import localFont from "next/font/local";

// Roboto Font (Variable Font)
const roboto = localFont({
  src: [
    {
      path: "../fonts/Roboto-VariableFont_wdth,wght.ttf", // Variable font for normal style
      weight: "100 900", // Range of weights supported
      style: "normal",
    },
    {
      path: "../fonts/Roboto-Italic-VariableFont_wdth,wght.ttf", // Variable font for italic style
      weight: "100 900", // Range of weights supported
      style: "italic",
    },
  ],
  variable: "--font-roboto", // CSS variable for Roboto
});

// Tajawal Font (Multiple Weights)
const tajawal = localFont({
  src: [
    {
      path: "../fonts/cairo.ttf", // Light weight
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Tajawal-Regular.ttf", // Regular weight
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Tajawal-Medium.ttf", // Medium weight
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Tajawal-Bold.ttf", // Bold weight
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tajawal", // CSS variable for Tajawal
});

const cairo = localFont({
  src: [
    {
      path: "../fonts/cairo.ttf", // Variable font for normal style
      weight: "200 1000", // Range of weights supported
      style: "normal",
    },
  ],
  variable: "--font-cairo", // CSS variable for Cairo
});

export { roboto, tajawal, cairo };
