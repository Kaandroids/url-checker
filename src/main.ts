import { Debouncer } from "./utils/debouncer.js";
import { checkUrlExistence } from "./utils/mockAPI.js";
import { UrlFeedBackStatus } from "./utils/urlFeedbackStatus.js";
import { isValidUrl, UrlFormat } from "./utils/urlValidator.js";

function requireEl<T extends HTMLElement>(selector: string): T{
    const el = document.querySelector<T>(selector);
    if(!el) throw new Error(`Element not found ${selector}`);
    return el
};

const urlInputEl = requireEl<HTMLInputElement>("#url-input");
const statusEl = requireEl<HTMLElement>("#status");
let url: UrlFormat;
let urlFeedback : UrlFeedBackStatus = {status : "idle"};
let currentRequestId = 0;

const apiRequestDebouncer = new Debouncer(async () => {
    if (!url.ok) return;

    const myRequestId = ++currentRequestId;

    updateFeedbackStatus({status: "checking", url : url});
    const result = await checkUrlExistence(url.url.href);

    if (myRequestId !== currentRequestId) {
        console.log(`Request #${myRequestId} ignored`);
        return;
    }

    updateFeedbackStatus(result.isLive 
        ? {status: "success", url: url, typ: result.typ}
        : {status: "notLive", url: url}
    );
}, 500);

function renderFeedbackStatus() {
    console.log(urlFeedback);
    switch (urlFeedback.status) {
        case "idle":
            statusEl.textContent = "Enter a URL to start...";
            break;
        case "invalidFormat":
            statusEl.textContent = "URL format invalid, enter a valid URL (e.g., https://example.com).";
            break;
        case "validFormat":
            statusEl.textContent = "Url Format valid.";
            break;
        case "checking":
            statusEl.textContent = "Checking URL existence...";
            break;
        case "notLive":
            statusEl.textContent = "URL doesnt exist.";
            break;
        case "success":
            statusEl.textContent = `URL does exist and its type: [${urlFeedback.typ.toUpperCase()}]`;
            break;

        default:
            // exhaustiveness check
            const _exhaustiveCheck: never = urlFeedback;
            return _exhaustiveCheck;
    }
}

function updateFeedbackStatus(status: UrlFeedBackStatus) {
    urlFeedback = status;
    renderFeedbackStatus();
}

urlInputEl.addEventListener("input", () => {
    url = isValidUrl(urlInputEl.value);
    // cancel old timer if it exist: if a part of the end url is valid, we will check that part unnecessarily
    // example: https://google.com  -> we check it unnecessarily because its a part of end url: https://google.com/index.html
    apiRequestDebouncer.cancelTimer();
    if(url.ok) {
        updateFeedbackStatus({status: "validFormat", url : url});
        // active debouncer only if the given url format is valid, to avoid unnecessary requests
        apiRequestDebouncer.runTimer();
    } else {
        updateFeedbackStatus({status: "invalidFormat", url: url});
    }
});