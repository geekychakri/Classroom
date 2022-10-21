import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { decode } from "html-entities";

import { authProtected } from "@/components/AuthProtected";

import { ChannelType } from "types/types";

const Channel: NextPage<ChannelType> = ({ data }) => {
  const router = useRouter();
  console.log(router.query);

  const handleClick = (id: string) => {
    router.push(`/watch?v=${id}`);
  };

  return (
    <div className="flex flex-col w-3/4 tabPort:w-full sm:w-full mx-auto px-6 py-10">
      <h1 className="text-5xl font-semibold mb-5 opacity-50">
        {data.items[0].snippet.channelTitle}
      </h1>
      {data?.items?.map((video) => {
        return (
          <div
            key={video.id.videoId}
            className="flex sm:flex-col items-center sm:items-start mb-10 p-6 sm:p-0 border rounded-md bg-[#202020] border-transparent cursor-pointer border-[#313131] hover:border-[rgba(255,255,255,0.5)]"
            onClick={() => handleClick(video.id.videoId)}
          >
            <div className="shrink-0 w-[320px] sm:w-full h-[200px] relative">
              <Image
                src={video.snippet.thumbnails.medium.url}
                alt="thumbnail"
                className="rounded-md sm:rounded-none sm:w-full sm:mb-4"
                layout="fill"
              />
            </div>
            <div className="ml-5 sm:ml-0 p-4">
              <p className="mb-4 text-lg">{decode(video.snippet.title)}</p>
              <p className="opacity-50">{decode(video.snippet.channelTitle)}</p>
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
      `https://youtube-v31.p.rapidapi.com/search?channelId=${query.channelId}&part=snippet%2Cid&order=date&maxResults=50`,
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
  } catch (err) {
    return {
      props: {
        data: [],
      },
    };
  }
};

export default authProtected(Channel);
