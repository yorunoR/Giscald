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
      }
    }
  }
`
export default QUERY
