"use client";

import { Input } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import { pattaya } from "@/app/font";
import { useEffect, useState } from "react";
import ToggleTheme from "./ui/ToggleTheme";
import { AppBar } from "@mui/material";

const Navbar = (props) => {
  const [searchInp, setSearchInp] = useState("");
  const [theme, setTheme] = useState("light");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    isChecked ? setTheme("dark") : setTheme("light");
  }, [isChecked]);

  return (
    <div className="navbar">
      <p className={`${pattaya.className} text-2xl sm:text-3xl`}>
        Image Gallery
      </p>
      <Input
        value={searchInp}
        onChange={(event) => setSearchInp(event.target.value)}
        placeholder="Search Images here"
        startDecorator={<SearchIcon />}
        sx={{
          flex: 1,
          marginLeft: "64px",
          marginRight: "27px",
          padding: "14px 12px ",
          borderRadius: 6,
          border: "1px solid #ECECEC",
          backgroundColor: "#FAFAFA",
          boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.05) inset",
        }}
      />

      <div className="navlinks">
        <p className="navlink">Explore</p>
        <p className="navlink">Collection</p>
        <p className="navlink">Communities</p>
      </div>

      <div className="darkToggle">
        <p className="text-xs font-semibold">{`${
          theme === "light" ? "Dark" : "Light"
        } mode`}</p>
        <ToggleTheme
          theme={theme}
          isChecked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default Navbar;
