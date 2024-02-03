"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { HeaderLogin, HeaderloginMobile } from "./header-login";
import HeaderNav from "./header-nav";
import Link from "next/link";

export const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <header className=" p-2">
      <Navbar
        placeholder="Placeholder"
        className="mx-auto max-w-screen-xl px-4 py-2"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            placeholder="Placeholder"
            as="a"
            href="/"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            Alfa 3 - Database System
          </Typography>
          <div className="hidden lg:block">
            <HeaderNav />
          </div>
          {/* <HeaderLogin /> */}
          <IconButton
            placeholder="Placeholder"
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <HeaderNav />
          {/* <HeaderloginMobile /> */}
        </Collapse>
      </Navbar>
    </header>
  );
};
