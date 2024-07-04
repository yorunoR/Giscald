const QUERY = /* GraphQL */ `
  query Benches {
    benches {
      id
      name
      code
      description
      template
      systemTemplate
      createdAt
      updatedAt
    }
  }
`
export default QUERY
