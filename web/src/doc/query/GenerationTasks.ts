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
        bench {
          id
          code
        }
        tags {
          id
          name
        }
        evaluationTasks {
          id
        }
      }
    }
  }
`
export default QUERY
