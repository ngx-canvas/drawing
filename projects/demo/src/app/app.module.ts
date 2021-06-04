/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* --- COMPONENTS --- */
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ]
})

export class AppModule { }
