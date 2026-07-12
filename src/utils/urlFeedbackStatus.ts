import { UrlFormat } from "./urlValidator.js";

export type UrlFeedBackStatus = 
    | {status: "idle"}  // no url check has run yet
    | {status: "invalidFormat", url: UrlFormat}  // format check failed, existence check has not run yet
    | {status: "checking", url: UrlFormat}  // format is valid, existence check is in progress
    | {status: "notLive", url: UrlFormat} // format is valid, existence check failed
    | {status: "success", url: UrlFormat, typ: "file" | "folder"} // both checks passed