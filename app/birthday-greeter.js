function BirthdayGreeter(peopleRepository, notifier) {

  this.peopleRepository = peopleRepository
  this.notifier = notifier

  this.greet = () => {
    this.peopleRepository.getPeopleBornToday().map(person => {
      this.notifier.sendBirthdayNotification(person)
    })
  }

  this.remind = () => {
    const bornToday = this.peopleRepository.getPeopleBornToday()

    if (bornToday.length <= 0)
      return

    this.peopleRepository.getPeopleNotBornToday().map(person => {
      this.notifier.sendReminderNotification(person, bornToday)
    })
  }

  this.execute = () => {
    this.greet()
    this.remind()
  }

}

module.exports = BirthdayGreeter