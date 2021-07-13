import React, { ReactElement } from "react";
export declare type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
    uid: string;
    size?: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface IUploadProps {
    /**
     * request url
     */
    action: string;
    /**
     * File size limit
     */
    limitSize?: number;
    defaultFileList?: UploadFile[];
    /**
     * fire event before upload
     */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**
     * fire event during upload
     */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /**
     * fire event after upload successfully
     */
    onSuccess?: (data: any, file: UploadFile) => void;
    /**
     * fire event when upload failed
     */
    onError?: (err: any, file: UploadFile) => void;
    /**
     * click close icon to remove,then excute your custom event
     */
    onRemove?: (file: UploadFile) => void;
    /**
     * fire when upload status change
     */
    onChange?: (file: UploadFile) => void;
    /**
     * custom post header
     */
    headers?: {
        [key: string]: any;
    };
    /**
     * custom upload file name
     */
    name?: string;
    /**
     *  Custom formdata
     */
    data?: {
        [key: string]: any;
    };
    /**
     *  request with cookie
     */
    withCredentials?: boolean;
    /**
     *  decide file type
     * see: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input
     */
    accept?: string;
    /**
     *  upload multiple files
     */
    multiple?: boolean;
    children?: string | ReactElement | ReactElement[];
    /**
     *  drag file to load
     */
    drag?: boolean;
}
declare const Upload: React.FC<IUploadProps>;
/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either printed beside the avatar or in a tooltip.
**/
export default Upload;
