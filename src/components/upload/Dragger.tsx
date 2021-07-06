import React, { useState } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);

  const dClass = classNames("z-upload-dragger", {
    [`is-dragover`]: dragOver,
  });

  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
      className={dClass}
    >
      {children}
    </div>
  );
};

export default Dragger;
