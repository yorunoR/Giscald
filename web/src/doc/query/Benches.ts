const QUERY = /* GraphQL */ `
  query Benches {
    benches {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`
export default QUERY
