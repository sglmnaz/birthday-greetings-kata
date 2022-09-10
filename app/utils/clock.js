function Clock() {

  this.getTodayDate = () => {
    return new Date()
  }

  this.getDate = (dateString) => {
    return new Date(dateString)
  }

}

module.exports = Clock