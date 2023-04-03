import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsCode,
  BsParagraph,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsListUl,
  BsListOl,
  BsCodeSlash,
  BsBlockquoteLeft,
  BsArrowsCollapse,
  BsPaintBucket,
  BsTextCenter,
  BsTextLeft,
  BsTextRight,
  BsTextParagraph,
  BsDownload,
  BsImage,
} from "react-icons/bs";
import {
  AiOutlineTable,
  AiOutlineInsertRowBelow,
  AiOutlineInsertRowRight,
} from "react-icons/ai";

import EditorButton from "./EditorButton";
import FileUploader from "./FileUploader";

const exampleContent = `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `;

const Editor = () => {
  const [fileContent, setFileContent] = useState<string>(exampleContent);
  const [previewContent, setPreviewContent] = useState<string>(exampleContent);
  const replacementVariables = {
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "123-456-7890",
    address: "123 Main St.",
    city: "New York",
    state: "NY",
    zip: "10001",
    company: "Company Name",
  };

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(fileContent);
      setPreviewContent(getPreviewContentWithData(fileContent));
    }
  }, [fileContent]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        HTMLAttributes: {
          resizable: true,
          class: "table-fixed border-collapse border border-solid",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-solid",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-solid",
        },
      }),
      Image.configure({
        inline: true,
      }),
    ],
    content: fileContent,
    onUpdate: ({ editor }) => {
      setPreviewContent(getPreviewContentWithData(editor.getHTML()));
    },
  });

  const getPreviewContentWithData = (content: string) => {
    for (const [key, value] of Object.entries(replacementVariables)) {
      content = content.replace(`{{${key}}}`, value);
    }

    return content;
  };

  const exportHTML = (content: string, extension = "docx") => {
    let header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    let footer = "</body></html>";
    let sourceHTML = header + content + footer;
    let source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    let fileDownload = document.createElement("a");

    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = "document." + extension;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <section className="sticky top-5 flex justify-between rounded bg-gray-100 p-1 z-10">
        <div>
          <EditorButton
            active={editor.isActive("textStyle", {
              fontFamily: "Comic Sans MS, Comic Sans",
            })}
            onClick={() =>
              editor
                .chain()
                .focus()
                .setFontFamily("Comic Sans MS, Comic Sans")
                .run()
            }
          >
            Comic Sans
          </EditorButton>

          <EditorButton
            active={editor.isActive("textStyle", {
              color: "#ff0000",
            })}
            onClick={() =>
              editor.isActive("textStyle", {
                color: "#ff0000",
              })
                ? editor.commands.setColor("#000000")
                : editor.commands.setColor("#ff0000")
            }
          >
            <BsPaintBucket />
          </EditorButton>

          <EditorButton
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <BsTextLeft />
          </EditorButton>

          <EditorButton
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <BsTextCenter />
          </EditorButton>

          <EditorButton
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <BsTextRight />
          </EditorButton>

          <EditorButton
            active={editor.isActive({ textAlign: "justify" })}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <BsTextParagraph />
          </EditorButton>

          <EditorButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
          >
            <BsTypeBold />
          </EditorButton>

          <EditorButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          >
            <BsTypeItalic />
          </EditorButton>

          <EditorButton
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
          >
            <BsTypeStrikethrough />
          </EditorButton>

          <EditorButton
            active={editor.isActive("code")}
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
          >
            <BsCode />
          </EditorButton>

          <EditorButton
            active={editor.isActive("paragraph")}
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <BsParagraph />
          </EditorButton>

          <EditorButton
            active={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <BsTypeH1 />
          </EditorButton>

          <EditorButton
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <BsTypeH2 />
          </EditorButton>

          <EditorButton
            active={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <BsTypeH3 />
          </EditorButton>

          <EditorButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <BsListUl />
          </EditorButton>

          <EditorButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <BsListOl />
          </EditorButton>

          <EditorButton
            active={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <BsCodeSlash />
          </EditorButton>

          <EditorButton
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <BsBlockquoteLeft />
          </EditorButton>

          <EditorButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <BsArrowsCollapse />
          </EditorButton>

          <EditorButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            <AiOutlineTable />
          </EditorButton>

          <EditorButton onClick={() => editor.commands.addColumnAfter()}>
            <AiOutlineInsertRowRight />
          </EditorButton>

          <EditorButton onClick={() => editor.commands.addRowAfter()}>
            <AiOutlineInsertRowBelow />
          </EditorButton>

          <EditorButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .setImage({
                  src: "https://img.setka.io/clients/D3SuW9_Vtk6NhYeFXfduUy55A4Dromkt/post_images/screenshot-2022-01-31-at-15.41.00-2022013112411228.png",
                })
                .run()
            }
          >
            <BsImage />
          </EditorButton>
        </div>

        <div className="flex justify-between">
          <EditorButton onClick={() => exportHTML(previewContent, "docx")}>
            <BsDownload />{" "}
            <span className="text-[0.5rem] text-white px-1 py-0.5 ml-1 bg-gray-700 rounded">
              .docx
            </span>
          </EditorButton>

          <EditorButton onClick={() => exportHTML(previewContent, "odt")}>
            <BsDownload />{" "}
            <span className="text-[0.5rem] text-white px-1 py-0.5 ml-1 bg-gray-700 rounded">
              .odt
            </span>
          </EditorButton>

          <FileUploader setFileContent={setFileContent} />
        </div>
      </section>

      <section className="flex justify-center my-9">
        <EditorContent
          editor={editor}
          className="w-[48rem] min-h-[100vh] p-12 shadow shadow-gray-300"
        />

        {/*<div
          dangerouslySetInnerHTML={{ __html: previewContent }}
          className="max-w-[50%] ml-1"
        />*/}
      </section>
    </>
  );
};

export default Editor;
