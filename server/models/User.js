function User(userName, first = 'Running', last = 'Beast', schedule) {
    this.userName = userName;
    this.firstName = first;
    this.lastName = last;
    this.schedule = schedule;
}

module.exports = User;
