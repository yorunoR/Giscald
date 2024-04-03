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
      }
    }
  }
`
export default QUERY
