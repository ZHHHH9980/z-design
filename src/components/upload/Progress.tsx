import React from "react";
import { UploadFileStatus } from "./Upload";

export interface IProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  theme?: UploadFileStatus;
}

const Progress: React.FC<IProgressProps> = (props) => {
  const { percent, showText, strokeHeight, theme } = props;
  return (
    <div
      className="upload-progress-wrapper"
      style={{ height: `${strokeHeight}px` }}
    >
      <div
        className={`upload-progress-stroke upload-progress-stroke-${theme}`}
        style={{ width: `${percent}%` }}
      >
        {showText && <span className="upload-percent">{percent}%</span>}
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
};
export default Progress;
