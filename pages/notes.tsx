import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { gql } from "@apollo/client";
import { useAuthQuery } from "@nhost/react-apollo";

import Loader from "@/components/Loader";
import { authProtected } from "@/components/AuthProtected";
import { dateConverter } from "utils/DateConverter";
import { Notes } from "types/types";

const GET_NOTES = gql`
  query {
    notes {
      note_id
      video_id
      video_title
      created_at
    }
  }
`;

const Notes: NextPage = () => {
  const router = useRouter();

  const { data, loading, error } = useAuthQuery<Notes>(GET_NOTES, {
    fetchPolicy: "network-only",
  });
  console.log({ data });

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-3/4 tabPort:w-full sm:w-full mx-auto px-6 py-10 ">
      <h1 className="text-4xl font-bold mb-5 opacity-50">My notes</h1>
      {data?.notes?.length ? (
        <>
          {data?.notes?.map((note, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start border border-[#313131] p-6 mb-8 bg-[#202020] rounded-md"
              >
                <h1 className="text-xl mb-3">{note.video_title}</h1>
                <p className="mb-5 opacity-50">
                  {dateConverter(note.created_at)}
                </p>
                <button
                  className="border px-4 py-2 rounded-md hover:bg-[#fff] hover:text-[#000]"
                  onClick={() => {
                    router.push(`/watch?v=${note.video_id}`);
                  }}
                >
                  Read Notes
                </button>
              </div>
            );
          })}
        </>
      ) : (
        <div>
          <p className="mb-4">You've not added any notes yet !</p>
          <Link href="/explore">
            <a className="border border-[#313131] rounded-md px-4 py-2 hover:bg-[#fff] hover:text-[#000] duration-300">
              Add note
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default authProtected(Notes);
