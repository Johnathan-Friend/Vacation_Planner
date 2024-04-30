class KeywordFilter {
  constructor () {
    this.FilterChoices = []
  }

  setFilterChoices (Choices) {
    for (let i = 0; i < Choices.length; i++) {
      this.FilterChoices.push(Choices[i])
    }
  }

  getFilterChoices () {
    return this.FilterChoices
  }
}
export default KeywordFilter
