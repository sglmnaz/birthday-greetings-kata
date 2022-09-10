const PeopleRepository = require("./people-repository")
const Notifier = require("./notifier")
const BirthdayGreeter = require("./birthday-greeter")
const Clock = require("./utils/clock")

const fileContent =
  `Doe, John, 1982/10/08, john.doe@foobar.com
Ann, Mary, 1975/09/11, mary.ann@foobar.com
Pippo, Franco, 1980/09/09, pippo.franco@foobar.com
Mastro, Lindo, 1956/09/09, mastrolindo@foobar.com`

const clock = new Clock()
const repository = new PeopleRepository(fileContent, clock)
const notifier = new Notifier()
const birthdayGreeter = new BirthdayGreeter(repository, notifier)

birthdayGreeter.execute()

