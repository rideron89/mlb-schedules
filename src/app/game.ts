
export class Game {
    date:            Date;
    home_league:     string;
    home_team:       string;
    time:            string;
    visiting_league: string;
    visiting_team:   string;

    constructor(data) {
        this.home_league = data.home_league;
        this.home_team = data.home_team;
        this.time = data.time;
        this.visiting_league = data.visiting_league;
        this.visiting_team = data.visiting_team;

        this.date = this.parseDate(data.date);
    }

    parseDate(dateString: string): Date {
        let month: number;
        let year:  number;
        let day:   number;

        year  = parseInt(dateString.slice(0, 4), 10);
        month = parseInt(dateString.slice(4, 6), 10) - 1;
        day   = parseInt(dateString.slice(6, 8), 10);

        return new Date(year, month, day);
    }
}
