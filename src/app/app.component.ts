// Angular library imports
import { Component, OnInit } from "@angular/core";

// Third-party library imports
import { CalendarEvent } from "angular-calendar";

// App service imports
import { DataService } from "./data.service";

// App model imports
import { Game } from "./game";
import { teams } from "./teams";
import { colors } from "./colors";

// App component imports

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

    events: Array<CalendarEvent> = [];
    filteredEvents: CalendarEvent[] = [];

    teamFilterValue: String = "";

    teamFilterOptions: String[] = [];

    view: String = "month";
    viewDate: Date = new Date();

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.getData();
    }

    filterEventsByTeam() {
        this.filteredEvents = this.events.filter((event: CalendarEvent) => {
            // if no team is selected, just return everything
            if (!this.teamFilterValue) {
                return true;
            }

            // include home teams
            if (event.meta.home_team === this.teamFilterValue) {
                return true;
            }

            // include visiting teams
            if (event.meta.visiting_team === this.teamFilterValue) {
                return true;
            }

            return false;
        });
    }

    getData(year?: number): void {
        // use the current year if none was given
        if (!year) {
            year = (new Date()).getFullYear();
        }

        // asynchronously load the schedule for the requested season
        this.dataService.getSchedule(year, (games: Array<Game>) => {
            // reset the array
            this.events = [];

            // add each game to the array
            games.map((game) => {
                let color = colors.red;

                // try to find the colors from the teams object
                if (teams[game.home_team]) {
                    color = teams[game.home_team].colors;
                }

                // add home teams to the filter options
                if (this.teamFilterOptions.indexOf(game.home_team) === -1) {
                    this.teamFilterOptions.push(game.home_team);
                }

                // add visiting teams to the filter options
                if (this.teamFilterOptions.indexOf(game.visiting_team) === -1) {
                    this.teamFilterOptions.push(game.visiting_team);
                }

                // sort the team filter options
                this.teamFilterOptions.sort();

                // add the event
                this.events.push(<CalendarEvent>{
                    start: game.date,
                    color: color,
                    title: `${game.visiting_team} at ${game.home_team}`,
                    meta: {
                        home_team: game.home_team,
                        visiting_team: game.visiting_team
                    }
                });
            });

            // make sure we setup the initial filter
            this.filterEventsByTeam();
        });
    }

}
