import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";

import { Toaster } from "react-hot-toast";

import { EditorView } from "prosemirror-view";

import TipTapNav from "./TipTapNav";

import { TipTapProps } from "types/types";

EditorView.prototype.updateState = function updateState(state) {
  //@ts-ignore
  if (!this.docView) return; // Prevents the matchesNode error on hot reloads
  //@ts-ignore
  this.updateStateInner(state, this.state.plugins != state.plugins);
};

const Tiptap = ({ videoId, videoTitle, findNote }: TipTapProps) => {
  const CustomDocument = Document.extend({
    content: "heading block*",
  });

  const editor = useEditor(
    {
      extensions: [
        CustomDocument,
        StarterKit.configure({
          document: false,
        }),
        Placeholder.configure({
          //@ts-ignore
          placeholder: ({ node }) => {
            if (node.type.name === "heading") {
              return "Title";
            }
          },
        }),
      ],
      content: findNote?.note || videoTitle,
      editorProps: {
        handleClickOn: (_, pos, node) => {},
        attributes: {
          class:
            "prose prose-sm h-full sm:h-[500px] lg:h-[500px] text-lg flex-1 p-3 focus:outline-none  text-[#fff] rounded-md overflow-auto",
        },
      },
    },
    [findNote, videoTitle]
  );

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <TipTapNav
          findNote={findNote}
          notes={editor?.view.dom.innerHTML}
          videoId={videoId}
          videoTitle={videoTitle}
        />
      </div>
      <EditorContent editor={editor} spellCheck={false} />
      <Toaster
        position="bottom-right"
        toastOptions={{ style: { zIndex: "100" } }}
      />
    </>
  );
};

export default Tiptap;
