import { Inter, Montserrat, Pattaya } from "next/font/google";

export const mont = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const pattaya = Pattaya({
  subsets: ["latin"],
  weight: ["400"],
});
