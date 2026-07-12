export type UrlExistence = 
    | {isLive: false}
    | {isLive: true, typ: "file" | "folder"}

export function checkUrlExistence(url: string): Promise<UrlExistence>{
    return new Promise((resolve) => {
        // simulate network delay (500-1500 ms)
        const delay = Math.floor(Math.random() * 1000) + 500;

        setTimeout(() => {
            const isLive = Math.random() > 0.3;
            console.log(`[API MOCK] checked url: ${url} with ${delay} ms delay and result: ${isLive}`);

            if (!isLive) {
                resolve({isLive: false});
            } else {
                const isFile = Math.random() > 0.5;
                if (isFile){
                    resolve({isLive: true, typ: "file"});
                } else {
                    resolve({isLive: true, typ: "folder"});
                }
            }

        }, delay);
    });

}