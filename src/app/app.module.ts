// Angular library imports
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgModule } from "@angular/core";

// Third-party library imports
import { CalendarModule } from "angular-calendar";

// App service imports
import { DataService } from "./data.service";

// App component imports
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot(),
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatToolbarModule,
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
