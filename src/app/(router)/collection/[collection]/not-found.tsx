"use client"
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className=" h-full flex flex-col justify-center items-center">
      <NoSymbolIcon className="h-20 w-20 text-gray-500 dark:text-gray-400 mb-8" />
      <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl mb-4">
        404 Not Found
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
        Oops! The collection you're looking for does not exist. It might have been
        moved or deleted.
      </p>
      <Link href="/">
        <Button placeholder="Go home">Go to Homepage</Button>
      </Link>
    </div>
  );
};

export default NotFound;
