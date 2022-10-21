import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import { GetServerSideProps } from "next";

import { decode } from "html-entities";

import { authProtected } from "@/components/AuthProtected";

import { SearchType } from "types/types";

const Videos: NextPage<SearchType> = ({ data }) => {
  const router = useRouter();
  console.log(router.query.search);

  const handleRoute = (type: string, id: string) => {
    switch (type) {
      case "youtube#channel":
        router.push(`/channel?channelId=${id}`);
        break;
      case "youtube#playlist":
        router.push(`/playlist?playlistId=${id}`);
        break;
      case "youtube#video":
        router.push(`/watch?v=${id}`);
    }
  };

  return (
    <div className="flex flex-col w-3/4 tabPort:w-full sm:w-full mx-auto px-6 py-10 ">
      {data?.items?.map((video, index) => {
        return (
          <div
            key={index}
            className="flex sm:flex-col items-center sm:items-start mb-10 p-6 sm:p-4 border rounded-md bg-[#202020] border-transparent cursor-pointer border-[#313131] hover:border-[rgba(255,255,255,0.5)]"
            onClick={() => {
              handleRoute(
                video.id.kind,
                video.id.videoId || video.id.channelId || video.id.playlistId
              );
            }}
          >
            <div
              className={`shrink-0 w-[320px] sm:w-full h-[200px] relative ${
                video.id.kind === "youtube#channel"
                  ? "!w-[180px] !h-[180px] rounded-full overflow-hidden"
                  : ""
              }`}
            >
              <Image
                src={video.snippet.thumbnails.medium.url}
                alt="thumbnail"
                className="rounded-sm sm:w-full sm:mb-4"
                layout="fill"
              />
            </div>

            <div className="ml-5 sm:ml-0 py-4">
              <p className="mb-4 text-xl">{decode(video.snippet.title)}</p>

              {video.id.kind === "youtube#channel" ? (
                <p className="opacity-50 text-lg">
                  {decode(video.snippet.description)}
                </p>
              ) : (
                <p className="opacity-50 text-lg">
                  {decode(video.snippet.channelTitle)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  try {
    const searchRes = await fetch(
      `https://youtube-v31.p.rapidapi.com/search?q=${query.search}&part=snippet%2Cid&maxResults=50&regionCode=US`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY as string,
          "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
      }
    );
    const data = await searchRes.json();
    return {
      props: {
        data,
      },
    };
  } catch (err) {}
  return {
    props: {
      data: [],
    },
  };
};

export default authProtected(Videos);
