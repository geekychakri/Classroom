import { useState, useRef, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import cn from "clsx";

import { Notes, LogOut } from "iconoir-react";

import {
  useUserAvatarUrl,
  useSignOut,
  useNhostClient,
  useAuthenticationStatus,
} from "@nhost/nextjs";

import SearchBar from "./Search";

const Navigation = () => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const router = useRouter();
  const userAvatarUrl = useUserAvatarUrl();

  const { signOut } = useSignOut();
  const nhost = useNhostClient();

  console.log({ userAvatarUrl });

  const dropDownRef = useRef<HTMLDivElement>(null);

  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  console.log({ isAuthenticated });

  const displayDropDown = () => {
    setDropDown((prevState) => !prevState);
    console.log("CLICKED");
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current?.contains(e.target as Node)
    ) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignIn = () => {
    nhost.auth.signIn({
      provider: "github",
      options: {
        redirectTo: "/explore",
      },
    });
  };

  const DropDown = () => {
    return (
      <div className="relative text-base font-normal" ref={dropDownRef}>
        <div
          className="w-[40px] h-[40px] bg-[#313131] rounded-full overflow-hidden cursor-pointer  border-[3px] border-[#313131]"
          onClick={displayDropDown}
        >
          <img src={userAvatarUrl} className="w-full h-full rounded-full" />
        </div>

        <div
          className={cn(
            "w-[200px] absolute top-[70px] right-0 bg-[#313131] border border-[#fff] dropdown rounded-md [&>*]:cursor-pointer hover:[&>*]:bg-white hover:[&>*]:text-black",
            dropDown ? "block" : "hidden"
          )}
        >
          <div className="flex items-center border-b rounded-sm  border-[#202020]">
            <Link href="/notes">
              <a
                className="flex items-center w-full px-4 py-2"
                onClick={() => setDropDown(false)}
              >
                <Notes className="mr-2" />
                <span>My notes</span>
              </a>
            </Link>
          </div>

          <div
            className="flex items-center rounded-sm px-4 py-2"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            <LogOut className="mr-2" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <nav className="flex items-center justify-between sm:flex-wrap text-xl sticky top-0 px-5 py-4 bg-[#202020] font-semibold z-50">
        <Link href="/">
          <span>
            Classroom<span className="text-[red]">.</span>
          </span>
        </Link>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between sm:flex-wrap text-xl sticky top-0 px-5 py-4 bg-[#202020] font-semibold z-50">
      <Link href="/">
        <span>
          Classroom<span className="text-[red]">.</span>
        </span>
      </Link>
      {router.pathname !== "/" &&
      router.pathname !== "/explore" &&
      router.pathname !== "/404" ? (
        <SearchBar />
      ) : null}
      {!isAuthenticated ? (
        <div>
          <button
            className="px-4 py-2 rounded-md font-medium text-sm opacity-50 hover:opacity-100 duration-300"
            onClick={handleSignIn}
          >
            Log in
          </button>
          <button
            className="px-4 py-2 rounded-md font-medium text-sm hover:bg-[#fff] hover:text-[#000] duration-300"
            onClick={handleSignIn}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <DropDown />
      )}
    </nav>
  );
};

export default Navigation;
