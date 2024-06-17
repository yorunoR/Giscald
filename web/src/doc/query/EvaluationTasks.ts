const QUERY = /* GraphQL */ `
  query EvaluationTasks {
    currentUser {
      evaluationTasks {
        id
        name
        status
        points
        processingTimes
        createdAt
        generationTask {
          bench {
            id
            name
            code
          }
        }
      }
    }
  }
`
export default QUERY
