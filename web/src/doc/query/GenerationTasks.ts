const QUERY = /* GraphQL */ `
  query GenerationTasks {
    currentUser {
      generationTasks {
        id
        name
        modelName
        description
        status
        createdAt
      }
    }
  }
`
export default QUERY
