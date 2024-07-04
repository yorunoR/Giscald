const QUERY = /* GraphQL */ `
  query Bench($id: ID!) {
    bench(id: $id) {
      id
      name
      description
      locked
      questions {
        id
        questionNumber
        category
        turns
        correctAnswers
        evalAspects
      }
    }
  }
`
export default QUERY
