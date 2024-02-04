import { List, ListItem, Typography } from "@material-tailwind/react";
import HeaderMenu from "./header-menu";
import Link from "next/link";

const HeaderNav = () => {
  return (
    <List
      placeholder="Placeholder"
      className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 lg:min-w-[300px]"
    >
      <Typography
        placeholder="Placeholder"
        as={Link}
        href="/tester"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem
          placeholder="Placeholder"
          className="flex items-center gap-2 py-2 pr-4"
        >
          Tester
        </ListItem>
      </Typography>
      <HeaderMenu />
      <Typography
        placeholder="Placeholder"
        as={Link}
        href="/docs"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem
          placeholder="Placeholder"
          className="flex items-center gap-2 py-2 pr-4"
        >
          Docs
        </ListItem>
      </Typography>
    </List>
  );
};

export default HeaderNav;
