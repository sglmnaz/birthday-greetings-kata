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

    const clockMocked = {
      getTodayDate: () => new Date(),
      getDate: (stringDate) => new Date(stringDate)
    }
    const repository = new PeopleRepository(fileContent, clockMocked)

    let bdayNotifications = 0
    const mockNotifier = {
      sendBirthdayNotification: () => bdayNotifications++,
    }

    const birthdayGreeter = new BirthdayGreeter(repository, mockNotifier)
    birthdayGreeter.greet()

    expect(bdayNotifications).toBe(1)
  })

  it('should remind people NOT born today', () => {

    const clockMocked = {
      getTodayDate: () => new Date(),
      getDate: (stringDate) => new Date(stringDate)
    }
    const repository = new PeopleRepository(fileContent, clockMocked)

    let reminderNotifications = 0
    const mockNotifier = {
      sendReminderNotification: () => reminderNotifications++
    }

    const birthdayGreeter = new BirthdayGreeter(repository, mockNotifier)
    birthdayGreeter.remind()

    expect(reminderNotifications).toBe(2)
  })

  it('should greet people born on 29/02 on 28/02', () => {

    const fileContentMock =
      `Pasquale, Gentile, 1996/02/29, pasquale@foobar.com
Ciro, Esposito, 1980/03/10, ciroesposito@foobar.com`

    const clockMocked = {
      getTodayDate: () => new Date("2022/02/28"),
      getDate: (stringDate) => new Date(stringDate)
    }

    const repository = new PeopleRepository(fileContentMock, clockMocked)

    let bdayNotifications = 0
    let reminderNotifications = 0

    const mockNotifier = {
      sendBirthdayNotification: () => bdayNotifications++,
      sendReminderNotification: () => reminderNotifications++
    }

    const birthdayGreeter = new BirthdayGreeter(repository, mockNotifier)
    birthdayGreeter.execute()

    expect(reminderNotifications).toBe(1)
    expect(bdayNotifications).toBe(1)

  })

})