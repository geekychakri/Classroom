import React, { useState } from "react";
import { Search as SearchIcon } from "iconoir-react";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (router.query.search === search) return;
    if (search.length >= 1) {
      router.push(`/results?search=${search}`);
    }
  };

  return (
    <form
      className="sm:order-3 sm:mt-3 flex items-center sm:w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className={`bg-[#181818] sm:w-full border border-gray-500 rounded-tl-md font-normal rounded-bl-md  px-2 py-2 text-base focus:border-gray-200 outline-none duration-200`}
        placeholder="Search"
        onChange={handleChange}
      />
      <button
        className={`bg-[#313131] border border-gray-500 text-base hover:bg-white hover:text-black hover:border-[#fff] rounded-tr-md rounded-br-md px-4 py-2 duration-200`}
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
