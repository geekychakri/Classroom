import { useRouter } from "next/router";

import useSWR from "swr";

import { gql } from "@apollo/client";
import { useAuthQuery } from "@nhost/react-apollo";

import Player from "@/components/Player";
import { authProtected } from "@/components/AuthProtected";

import Tiptap from "@/components/TipTap";

import fetcher from "lib/fetch";
import CodeEditor from "@/components/CodeEditor";

const GET_NOTES = gql`
  query {
    notes {
      note
      note_id
      video_id
    }
  }
`;

type YTMetaData = {
  title: string;
};

const Watch = () => {
  const router = useRouter();
  const videoId = router.query.v;

  const { data, loading, error } = useAuthQuery(GET_NOTES, {
    fetchPolicy: "network-only",
  });

  // console.log({ data });

  const { data: ytMetaData, error: ytMetaDataError } = useSWR<YTMetaData>(
    `/api/ytmetadata?v=${videoId}`,
    fetcher
  );

  // console.log({ ytMetaData });

  const findNote = data?.notes?.find((note: any) => note.video_id === videoId);

  // console.log({ findNote });

  if (error || ytMetaDataError) {
    return <div>Something went wrong</div>;
  }

  if (loading && !ytMetaData) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex-1 flex sm:flex-col lg:flex-col tabProLand:flex-col">
      <div className="w-[70%] sm:w-[100%] lg:w-[100%] border-r sm:border-0 border-[#313131]">
        <div className="relative sm:relative lg:relative aspect-video mb-5 sm:mt-0 sm:overflow-hidden bg-[#202020]">
          <Player />
        </div>
        <div className="">
          <h1 className="text-3xl sm:text-2xl font-bold p-5 opacity-60 border-b-2 border-[#313131]">
            {ytMetaData?.title}
          </h1>
        </div>
        <div className="sm:hidden px-5 my-8">
          <CodeEditor />
        </div>
      </div>

      <div className="sm:flex-1 lg:flex-1 flex flex-col w-[30%] sm:w-[100%] lg:w-[100%] fixed sm:static lg:static top-[75px] right-0 bottom-0 editor p-4">
        <Tiptap
          videoId={router.query.v}
          videoTitle={ytMetaData?.title}
          findNote={findNote}
        />
      </div>
    </div>
  );
};

export default authProtected(Watch);
