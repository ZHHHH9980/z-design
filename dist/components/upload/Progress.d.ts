import React from "react";
import { UploadFileStatus } from "./Upload";
export interface IProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    theme?: UploadFileStatus;
}
declare const Progress: React.FC<IProgressProps>;
export default Progress;
