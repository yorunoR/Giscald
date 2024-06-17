const QUERY = /* GraphQL */ `
  query Benches {
    benches {
      id
      name
      code
      description
      createdAt
      updatedAt
    }
  }
`
export default QUERY
