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
        answers {
          text
          question {
            id
            questionNumber
            category
          }
        }
      }
    }
  }
`
export default QUERY
