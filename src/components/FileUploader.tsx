import mammoth from "mammoth";

const FileUploader = ({ setFileContent }) => {
  const handleFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    if (!event.target.files) return;

    let file = event.target.files[0];
    console.log(file);

    if (file) {
      let reader = new FileReader();

      reader.onload = function (_e) {
        let content = reader.result;

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
      };

      reader.readAsArrayBuffer(file);
    }
  };

  // return <input type="file" className="my-1" onChange={handleFileInput} />;

  return (
    <div className="flex justify-center">
      <div className="w-64 m-1 mr-8">
        <input
          className="relative w-full rounded border border-solid px-3 text-base file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:py-[0.32rem] file:[margin-inline-end:0.5rem] focus:text-neutral-700 dark:border-neutral-600 dark:file:bg-neutral-700 dark:file:text-neutral-100 cursor-pointer file:cursor-pointer"
          type="file"
          onChange={handleFileInput}
        />
      </div>
    </div>
  );
};

export default FileUploader;
