import { Button } from "@/components/ui";
import React from "react";

export const HeaderLogin = () => (
  <div className="hidden gap-2 lg:flex">
    <Button
      placeholder="Placeholder"
      variant="text"
      size="sm"
      color="blue-gray"
    >
      Log In
    </Button>
    <Button placeholder="Placeholder" variant="gradient" size="sm">
      Sign In
    </Button>
  </div>
);

export const HeaderloginMobile = () => (
  <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
    <Button
      placeholder="Placeholder"
      variant="outlined"
      size="sm"
      color="blue-gray"
      fullWidth
    >
      Log In
    </Button>
    <Button placeholder="Placeholder" variant="gradient" size="sm" fullWidth>
      Sign In
    </Button>
  </div>
);
