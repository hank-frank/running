const Run = require("./Run.js");
const Week = require("./Week.js");

const beginner1 =require("../training_scheules/beginner1.json");

const _generateSchedule = function(difficulty) {
    let runId = 0;
    difficulty = difficulty || beginner1;

    let schedule = [];

    difficulty.forEach((distances, index) => {
        let runs = []

        distances.forEach((distance) => {
            const run = new Run(distance, runId, index);
            runs.push(run);
            runId++;
        });

        const week = new Week(index, runs);
        schedule.push(week);
    });

    return schedule;
};

function Schedule (difficulty, start) {
    this.weeks = _generateSchedule(difficulty);
    this.startDate = start || new Date();
    this.currentWeek = 0;
}

module.exports = Schedule;