
function PeopleRepository(peopleText, clock) {

  this.clock = clock
  this.peopleText = peopleText

  this.getPeople = () => {
    const people = this.peopleText.split('\n')
    return people.map(person => {
      const personData = person.split(', ')
      return {
        lastName: personData[0],
        firstName: personData[1],
        birthDate: personData[2],
        email: personData[3]
      }
    })
  }

  this.getPeopleBornToday = () => {
    return this.getPeople().filter(person => {
      const today = this.clock.getTodayDate()
      const birthDate = this.clock.getDate(person.birthDate)

      if (today.getDate() === 29 && today.getMonth() === 1) {
        return false
      }

      if (today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth()) {
        return true
      }

      if (today.getDate() === 28 && today.getMonth() === 1 && birthDate.getDate() === 29 && birthDate.getMonth() === 1) {
        return true
      }

      return false

    })
  }

  this.getPeopleNotBornToday = () => {
    return this.getPeople().filter(person => {
      const today = this.clock.getTodayDate()
      const birthDate = this.clock.getDate(person.birthDate)

      if (today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth()) {
        return false
      }

      if (today.getDate() === 28 && today.getMonth() === 1 && birthDate.getDate() === 29 && birthDate.getMonth() === 1) {
        return false
      }

      return true

    })
  }

}

module.exports = PeopleRepository