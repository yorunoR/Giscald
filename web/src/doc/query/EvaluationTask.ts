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
        answer {
          category
        }
      }
    }
  }
`
export default QUERY
