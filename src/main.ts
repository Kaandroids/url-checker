import { Debouncer } from "./utils/debouncer.js";
import { isValidUrl, UrlFormat } from "./utils/urlValidator.js";

function requireEl<T extends HTMLElement>(selector: string): T{
    const el = document.querySelector<T>(selector);
    if(!el) throw new Error(`Element not found ${selector}`);
    return el
};

const urlInputEl = requireEl<HTMLInputElement>("#url-input");
const statusEl = requireEl<HTMLElement>("#status");
let url: UrlFormat;

// TODO implement logic 
const apiRequestDebouncer = new Debouncer(() => {
    console.log("test debouncer.ts");
}, 500);

// TODO implement logic
function renderFeedbackStatus() {
    console.log("renderFeedbackStatus called....");
}

function updateFeedbackStatus(status: string) {
    console.log(`feedback status updated with ${status}`);
    renderFeedbackStatus();
}

urlInputEl.addEventListener("input", () => {
    url = isValidUrl(urlInputEl.value);
    // cancel old timer if it exist: if a part of the end url is valid, we will check that part unnecessarily
    // example: https://google.com  -> we check it unnecessarily because its a part of end url: https://google.com/index.html
    apiRequestDebouncer.cancelTimer();
    if(url.ok) {
        updateFeedbackStatus("url valid");
        // active debouncer only if the given url format is valid, to avoid unnecessary requests
        apiRequestDebouncer.runTimer();
    } else {
        updateFeedbackStatus("url invalid");
    }
});