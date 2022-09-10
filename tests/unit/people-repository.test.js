const PeopleRepository = require("../../app/people-repository")

var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const fileContent =
  `Pippo, Franco, ${today.toISOString()}, pippo.franco@foobar.com
Mastro, Lindo, ${tomorrow.toISOString()}, mastrolindo@foobar.com
Ciro, Esposito, ${tomorrow.toISOString()}, ciroesposito@foobar.com`

const clockMocked = {
  getTodayDate: () => new Date(),
  getDate: (stringDate) => new Date(stringDate)
}
const repository = new PeopleRepository(fileContent, clockMocked)

describe('PeopleRepository', () => {

  it('should return people', () => {
    const people = repository.getPeople()
    expect(Object.keys(people[0])).toEqual(["lastName", "firstName", "birthDate", "email"])
  })

  it('should return people born today', () => {
    const people = repository.getPeopleBornToday()
    expect(people.length).toEqual(1)
  })

  it('should return people NOT born today', () => {
    const people = repository.getPeopleNotBornToday()
    expect(people.length).toEqual(2)
  })

})