import React from "react";
import ReactQuill from "react-quill";

const TextEditor = ({ onChange, value, className }) => {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: ["right", "center", "justify"] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "color",
    "background",
  ];

  return (
    <React.Fragment>
      <ReactQuill
        theme="snow"
        className={className}
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
        placeholder="Write something..."
        
      />
    </React.Fragment>
  );
};

export default TextEditor;
