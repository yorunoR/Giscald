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
        generationSetting {
          host
          workerCount
          parameters
        }
      }
    }
  }
`
export default QUERY
