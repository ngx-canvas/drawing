import { Subject } from 'rxjs';

export class Drawing {

    public events: DRAWING_EVENTS = {
        move: new Subject(),
        holding: new Subject(),
        release: new Subject(),
        context: new Subject(),
        hovering: new Subject()
    };
    private canvas?: HTMLCanvasElement;
    private pressing: string[] = [];

    constructor(args?: string) {
        if (typeof (args) != 'undefined' && args != null) {
            this.canvas = <HTMLCanvasElement>document.getElementById(args);

            this.canvas.addEventListener('mouseup', (event: MouseEvent) => {
                this.events.holding?.next(false);
                this.events.release?.next({
                    x: event.pageX,
                    y: event.pageY
                });
            });
            this.canvas.addEventListener('touchend', (event: TouchEvent) => {
                this.events.holding?.next(false);
                this.events.hovering?.next(false);
                this.events.release?.next({
                    x: event.touches[0].pageX,
                    y: event.touches[0].pageY
                });
            });
            this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
                this.events.move?.next({
                    x: event.pageX,
                    y: event.pageY
                });
            });
            this.canvas.addEventListener('touchmove', (event: TouchEvent) => {
                this.events.move?.next({
                    x: event.touches[0].pageX,
                    y: event.touches[0].pageY
                });
            });
            this.canvas.addEventListener('mousedown', (event: MouseEvent) => {
                this.events.holding?.next(true);
                this.events.hovering?.next(true);
            });
            this.canvas.addEventListener('touchstart', (event: TouchEvent) => {
                this.events.holding?.next(true);
            });
            this.canvas.addEventListener('mouseenter', (event: MouseEvent) => {
                this.events.hovering?.next(true);
            });
            this.canvas.addEventListener('mouseleave', (event: MouseEvent) => {
                this.events.hovering?.next(false);
            });
            document.addEventListener('keyup', (event: KeyboardEvent) => {
                event.preventDefault();
                this.pressing.splice(this.pressing.indexOf(event.key.toLocaleLowerCase()), 1);
            });
            document.addEventListener('keydown', (event: KeyboardEvent) => {
                event.preventDefault();
                if (!this.pressing.includes(event.key.toLocaleLowerCase())) {
                    this.pressing.push(event.key.toLocaleLowerCase())
                }
                console.log(this.pressing.join('-'));
            });
            document.addEventListener('contextmenu', (event: MouseEvent) => {
                event.preventDefault();
                this.events.context?.next({
                    x: event.pageX,
                    y: event.pageY
                });
            });
        };
    }

}

interface XY {
    x: number;
    y: number;
}

interface DRAWING_EVENTS {
    move?: Subject<XY>;
    context?: Subject<XY>;
    release?: Subject<XY>;
    holding?: Subject<boolean>;
    hovering?: Subject<boolean>;
}
