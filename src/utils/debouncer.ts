/**
 * Debounces a function: each runTimer() call restarts the delay, 
 * so callback runs only once after calls stop for `time` in ms. 
 */
export class Debouncer {
    private timer: ReturnType<typeof setTimeout> | undefined;

    constructor(private callback: Function, private time: number) {};

    public runTimer(): void {
        // if already started, reset the timer
        if (this.timer !== undefined) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.fire();
        }, this.time);
    }

    private fire(): void {
        // reset before calling callback, because it can reschedule or throw an error
        this.timer = undefined;
        this.callback();
    }

    public cancelTimer(): void{
        if (this.timer !== undefined) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    }

}