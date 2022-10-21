import { useState } from "react";

const CodeEditor = () => {
  const [template, setTemplate] = useState<string>("static");
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleEditorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow(!show);
    show
      ? window.scrollTo({ top: 0, behavior: "smooth" })
      : window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
  };

  return (
    <>
      <label htmlFor="template" className="opacity-50">
        Select template
      </label>
      <select
        name="template"
        id="template"
        className="block w-1/2 bg-transparent border border-[#313131] mb-3 rounded-lg p-2 appearance-none editor-select"
        onChange={(e) => setTemplate(e.target.value)}
      >
        <option value="static" className="bg-[#181818]">
          HTML CSS JS
        </option>
        <option value="react" className="bg-[#181818]">
          React
        </option>
      </select>
      <button
        className="border border-[#313131] rounded-md px-2 py-1 mb-5 hover:bg-[#fff] hover:text-[#000] duration-300"
        onClick={handleEditorClick}
      >
        {!show ? "Open editor" : "Close editor"}
      </button>
      {show && loading && <div>Loading...</div>}
      {template === "static" && show && (
        <iframe
          src="https://stackblitz.com/edit/web-platform-4ftwz4?embed=1&file=index.html"
          width="100%"
          height={484}
          onLoad={() => setLoading(false)}
          className={loading ? "opacity-0" : "opacity-1"}
        ></iframe>
      )}

      {template === "react" && show && (
        <iframe
          src="https://stackblitz.com/edit/react-f48lv8?embed=1&file=src/App.js&hideNavigation=1"
          width="100%"
          height={484}
          onLoad={() => setLoading(false)}
          className={loading ? "opacity-0" : "opacity-1"}
        ></iframe>
      )}
    </>
  );
};

export default CodeEditor;
