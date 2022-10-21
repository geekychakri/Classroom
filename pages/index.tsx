import { useState } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";

import { NavArrowRight, VideoCamera } from "iconoir-react";

import { useNhostClient, useAuthenticated } from "@nhost/nextjs";

const ModalVideo = dynamic(() => import("@/components/ModalVideo"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlight, setHighlight] = useState<boolean>(false);

  const nhost = useNhostClient();
  const isAuthenticated = useAuthenticated();

  const router = useRouter();

  const handleSignIn = () => {
    nhost.auth.signIn({
      provider: "github",
      options: {
        redirectTo: "/explore",
      },
    });
  };

  if (isAuthenticated) {
    router.push("/explore");
    return null;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-2">
      <div className="sm:flex sm:flex-col">
        <h1 className="text-9xl sm:text-5xl tabPort:text-6xl tabLand:text-6xl tabProPort:text-7xl  tabProLand:text-8xl font-bold tracking-tight leading-[1.2] sm:leading-[1.2] tabPort:leading-normal tabLand:leading-normal tabProPort:leading-normal tabProLand:leading-normal">
          <span className="block opacity-50">Learning with YouTube</span>
          <span className="block mb-8">
            made{" "}
            <span
              className={`${
                highlight ? "text-[#ff0000]" : "text-[#fff]"
              } duration-300`}
            >
              exciting
            </span>
            .
          </span>
        </h1>
        <div className="flex sm:flex-col mb-8">
          <button
            className="flex items-center bg-[#cc0000] border border-transparent px-4 py-3 rounded-md text-white text-lg font-semibold mr-6 sm:mr-0 sm:mb-6 hover:bg-[#fff] hover:text-[#000] transition-all duration-200"
            onClick={handleSignIn}
            onMouseEnter={() => setHighlight(true)}
            onMouseLeave={() => setHighlight(false)}
          >
            <span className="mr-2">Start learning</span>
            <NavArrowRight strokeWidth="2" />
          </button>
          <button
            className="flex items-center border border-transparent px-4 py-3 rounded-md text-white text-lg font-semibold hover:bg-[#fff] hover:text-[#000] transition-all duration-200"
            onClick={() => setIsOpen(true)}
          >
            <span className="mr-2">Watch demo</span>
            <VideoCamera strokeWidth="2" />
          </button>
        </div>

        <p>
          Made with love by{" "}
          <a
            href="https://twitter.com/geekyChakri"
            target="__blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            Chakri
          </a>
        </p>
      </div>
      <ModalVideo
        //@ts-ignore
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="CLeZyIID9Bo"
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Home;
