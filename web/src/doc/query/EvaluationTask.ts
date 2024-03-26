const QUERY = /* GraphQL */ `
  query EvaluationTask($id: ID!) {
    evaluationTask(id: $id) {
      id
      name
      status
      points
      createdAt
      rates {
        id
        model
        point
        text
        finishReason
        usage
        processingTime
      }
    }
  }
`
export default QUERY
