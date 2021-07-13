import React from "react";
import { UploadFile } from "./Upload";
export interface IUploadListProps {
    fileList?: UploadFile[];
    onRemove: (item: UploadFile) => void;
}
declare const UploadList: React.FC<IUploadListProps>;
export default UploadList;
