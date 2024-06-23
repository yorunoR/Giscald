const QUERY = /* GraphQL */ `
  query EvaluationTasks {
    currentUser {
      evaluationTasks {
        id
        name
        plotName
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
