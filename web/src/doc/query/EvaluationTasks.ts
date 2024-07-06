const QUERY = /* GraphQL */ `
  query EvaluationTasks {
    currentUser {
      evaluationTasks {
        id
        name
        plotName
        active
        status
        points
        processingTimes
        createdAt
        generationTask {
          id
          bench {
            id
            name
            code
          }
          tags {
            id
            name
          }
        }
      }
    }
  }
`
export default QUERY
