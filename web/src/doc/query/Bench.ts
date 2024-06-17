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
      }
    }
  }
`
export default QUERY
