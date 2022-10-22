import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import SearchBar from "@/components/Search";
import { authProtected } from "@/components/AuthProtected";

const options = [
  "HTML",
  "CSS",
  "JavaScript",
  "Tapas Adhikary",
  "Nhost",
  "ReactJS",
  "TED",
];

const Explore: NextPage = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/results?search=${e.currentTarget.innerText}`);
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-5 w-1/2 sm:w-full mx-auto">
      <h1 className="text-7xl sm:text-3xl opacity-50 font-semibold mb-7">
        Explore
      </h1>
      <div className="explore flex gap-3 flex-wrap text-xl mb-8 [&>*]:bg-transparent [&>*]:border [&>*]:border-gray-500 [&>*]:px-4 [&>*]:py-2 [&>*]:rounded-lg hover:[&>*]:bg-white hover:[&>*]:text-black [&>*]:duration-300 cursor-pointer">
        {options.map((option, index) => {
          return (
            <div onClick={handleClick} key={index}>
              {option}
            </div>
          );
        })}
      </div>
      <SearchBar />
    </div>
  );
};

export default authProtected(Explore);
