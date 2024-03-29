import { useState } from "react";
import mammoth from "mammoth";
import { BsUpload } from "react-icons/bs";

import EditorButton from "./EditorButton";

interface FileUploaderProps {
  setFileContent: (content: string) => void;
}

const FileUploader = ({ setFileContent }: FileUploaderProps) => {
  const [_fileName, setFileName] = useState("");

  const handleFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    if (!event.target.files) return;

    let file = event.target.files[0];
    console.log(file);

    if (file) {
      setFileName(file.name);

      let reader = new FileReader();

      reader.onload = function (_e) {
        let content = reader.result;

        if (!content || typeof content === "string") return;

        if (file.name.split(".").pop() === "html") {
          setFileContent(new TextDecoder().decode(content));
        } else {
          mammoth
            .convertToHtml({ arrayBuffer: content })
            .then(function (result) {
              let html = result.value; // The generated HTML
              let messages = result.messages; // Any messages, such as warnings during conversion

              console.log(html);
              console.log(messages);

              setFileContent(html);
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <EditorButton>
        <label htmlFor="input-file" className="cursor-pointer">
          <BsUpload />
          <span className="text-[0.5rem] text-white px-1 py-0.5 ml-2 bg-gray-700 rounded">
            .docx/.odt/.html
          </span>
        </label>
      </EditorButton>
      <input
        id="input-file"
        className="hidden text-sm file:bg-gray-300 rounded border border-solid border-gray-300 file:border-0 px-3 py-0.5 file:py-[0.32rem] file:-mx-3 file:-my-[0.32rem] file:[margin-inline-end:0.5rem] cursor-pointer file:cursor-pointer"
        type="file"
        onChange={handleFileInput}
      />
    </>
  );
};

export default FileUploader;
