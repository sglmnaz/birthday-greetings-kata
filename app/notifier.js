function Notifier() {

  this.sendBirthdayNotification = (person) => {
    console.log(`TO: ${person.firstName} ${person.lastName}, Subject: Happy Birthday!, Body: Happy Bday, dear ${person.firstName}`);
  }

  this.sendReminderNotification = (person, bornToday) => {
    console.log(`TO: ${person.firstName} ${person.lastName}, Subject: Bday reminder, Body: Dear ${person.firstName}, today is ${bornToday.map(p => {
      return p.firstName + ' ' + p.lastName
    }).join(', ')} Bday`);
  }

}

module.exports = Notifier