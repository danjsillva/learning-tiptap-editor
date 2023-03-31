import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
} from "react-icons/bs";

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
  const [fileContent, setFileContent] = useState<String>("");

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(fileContent);
    }
  }, [fileContent]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: exampleContent,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <section className="flex justify-between rounded bg-gray-100 p-1">
        <div>
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
        </div>

        <FileUploader setFileContent={setFileContent} />
      </section>

      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
