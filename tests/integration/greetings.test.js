const PeopleRepository = require("../../app/people-repository")
const BirthdayGreeter = require("../../app/birthday-greeter")

var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const fileContent =
  `Pippo, Franco, ${today.toISOString()}, pippo.franco@foobar.com
Mastro, Lindo, ${tomorrow.toISOString()}, mastrolindo@foobar.com
Ciro, Esposito, ${tomorrow.toISOString()}, ciroesposito@foobar.com`

describe('Greeting notification process', () => {

  it('should greet people born today', () => {

    const repository = new PeopleRepository(fileContent)

    let bdayNotifications = 0
    const mockNotifier = {
      sendBirthdayNotification: () => bdayNotifications++,
    }

    const birthdayGreeter = new BirthdayGreeter(repository, mockNotifier)
    birthdayGreeter.greet()

    expect(bdayNotifications).toBe(1)
  })

  it('should remind people NOT born today', () => {
    const repository = new PeopleRepository(fileContent)

    let reminderNotifications = 0
    const mockNotifier = {
      sendReminderNotification: () => reminderNotifications++
    }

    const birthdayGreeter = new BirthdayGreeter(repository, mockNotifier)
    birthdayGreeter.remind()

    expect(reminderNotifications).toBe(2)
  })

})