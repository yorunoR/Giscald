const QUERY = /* GraphQL */ `
  query Benches {
    benches {
      id
      name
      code
      description
      template
      systemTemplate
      locked
      createdAt
      updatedAt
    }
  }
`
export default QUERY
