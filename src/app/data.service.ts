// Angular library imports
import { Injectable } from "@angular/core";

// Third-party library imports
import axios from "axios";

// App service imports

// App model imports
import { Game } from "./game";

@Injectable()
export class DataService {

    constructor() { }

    getSchedule(year: number, callback) {
        // get new data
        axios(`/data/${year}_schedule.csv`).then((response) => {
            let headerRow = [];
            let rawRows   = [];
            const games: Array<Game> = [];

            // split the raw text into rows
            rawRows = response.data.split(/\n\r?/);

            // remove the header row but save its contents
            headerRow = rawRows.shift().split(",");

            // split each row into an object and add it to the games array
            rawRows.map(row => {
                const data = {};
                const split = row.split(",");

                headerRow.map((key, index) => {
                    data[key] = split[index];
                });

                games.push(new Game(data));
            });

            callback(games);
        }).catch((error) => {
            console.warn("Error loading data:");
            console.warn(error.data);

            callback([]);
        });
    }

}
