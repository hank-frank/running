function Run(distance, id, week) {
    this.distance = distance;
    this.isComplete = false;
    this.dateCompleted = null;
    this.id = id;
    this.week = week;
}

module.exports = Run;