const QUERY = /* GraphQL */ `
  query Bench($id: ID!) {
    bench(id: $id) {
      id
      name
      description
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
