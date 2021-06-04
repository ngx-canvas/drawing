import { Drawing } from '../../../drawing/src/public-api';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    constructor() {}

    public x?: number;
    public y?: number;
    public context?: any = {};
    public holding?: boolean = false;
    public hovering?: boolean = false;
    private drawing?: Drawing = new Drawing();

    ngOnInit(): void {
        this.drawing = new Drawing('ngx-canvas');
        
        this.drawing.events.move?.subscribe(event => {
            this.x = event.x;
            this.y = event.y;
        });
        this.drawing.events.context?.subscribe(event => {
            this.context.x = event.x;
            this.context.y = event.y;
        });
        this.drawing.events.holding?.subscribe(event => {
            this.holding = event;
        });
        this.drawing.events.hovering?.subscribe(event => {
            this.hovering = event;
        });
    };

}
