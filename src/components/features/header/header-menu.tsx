"use client";
import React from "react";
import {
  Bars4Icon,
  ChevronDownIcon,
  GlobeAmericasIcon,
  PhoneIcon,
  SquaresPlusIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  Collapse,
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";

const navListMenuItems = [
  {
    title: "Patients",
    description: "Find the perfect solution for your needs.",
    link: "/collection/patients",
    icon: SquaresPlusIcon,
  },
  {
    title: "Doctors",
    description: "Meet and learn about our dedication",
    link: "/collection/doctors",
    icon: UserGroupIcon,
  },
  {
    title: "Medicines",
    description: "Find the perfect solution for your needs.",
    link: "/collection/medicines",
    icon: Bars4Icon,
  },
  {
    title: "Departments",
    description: "Learn how we can help you achieve your goals.",
    link: "/collection/departments",
    icon: SunIcon,
  },
  {
    title: "Medical workspaces",
    description: "Reach out to us for assistance or inquiries",
    link: "/collection/medical_workspaces",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Prescriptions",
    description: "Find the perfect solution for your needs.",
    link: "/collection/prescriptions",
    icon: PhoneIcon,
  },
];

const HeaderMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, link }, key) => (
      <Link href={link} key={key}>
        <MenuItem
          placeholder="Placeholder"
          className="flex items-center gap-3 rounded-lg"
        >
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              placeholder="Placeholder"
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              placeholder="Placeholder"
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            placeholder="Placeholder"
            as={Link}
            href="/collections"
            variant="small"
            className="font-medium"
          >
            <ListItem
              placeholder="placeholder"
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Collections
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          placeholder="placeholder"
          className="hidden max-w-screen-xl rounded-xl lg:block"
        >
          <ul className="grid grid-cols-2 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
};

export default HeaderMenu;
