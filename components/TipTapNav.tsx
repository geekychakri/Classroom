import { useState } from "react";

import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import DOMPurify from "isomorphic-dompurify";

import { ArrowDown } from "iconoir-react";

import { TipTapNavProps } from "types/types";

const ADD_NOTE = gql`
  mutation AddNote($note: notes_insert_input!) {
    insert_notes(objects: [$note]) {
      affected_rows
      returning {
        note_id
      }
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote($note_id: uuid!, $note: String!) {
    update_notes_by_pk(
      pk_columns: { note_id: $note_id }
      _set: { note: $note }
    ) {
      note_id
      note
    }
  }
`;

const TipTapNav = ({
  findNote,
  notes,
  videoId,
  videoTitle,
}: TipTapNavProps) => {
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);

  const [insertNote, { data: noteData }] = useMutation(ADD_NOTE, {
    errorPolicy: "none",
  });
  const [updateNote] = useMutation(UPDATE_NOTE, { errorPolicy: "none" });

  const noteId = noteData?.insert_notes?.returning?.[0]?.note_id;

  const handleSubmit = () => {
    try {
      toast.promise(
        insertNote({
          variables: {
            note: {
              note: DOMPurify.sanitize(`${notes}`),
              video_id: videoId,
              video_title: videoTitle,
            },
          },
        }),
        {
          loading: "Loading",
          success: () => {
            setShowUpdateBtn(true);
            return "Saved";
          },
          error: "Something went wrong",
        }
      );
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = () => {
    try {
      toast.promise(
        updateNote({
          variables: {
            note: DOMPurify.sanitize(`${notes}`),
            note_id: noteId || findNote.note_id,
          },
        }),
        {
          loading: "Loading",
          success: "Updated",
          error: "Something went wrong",
        }
      );
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <p className="font-semibold text-xl opacity-50">
        <span className="mr-2">Notepad</span>
        <span className="font-normal text-base bg-[#313131] p-1 rounded-md">
          M<ArrowDown className="inline" height={16} width={16} /> supported
        </span>
      </p>
      {findNote || showUpdateBtn ? (
        <button
          className="border border-[#313131] rounded-md px-4 py-1 hover:bg-[#fff] hover:text-[#000] duration-300"
          onClick={handleUpdate}
        >
          Update
        </button>
      ) : (
        <button
          className="border border-[#313131] rounded-md px-4 py-1 hover:bg-[#fff] hover:text-[#000] duration-300"
          onClick={handleSubmit}
        >
          Save
        </button>
      )}
    </>
  );
};

export default TipTapNav;
