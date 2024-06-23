const QUERY = /* GraphQL */ `
  query Rates($questionId: ID!) {
    rates(questionId: $questionId) {
      id
      model
      point
      text
      answers {
        id
        text
        finishReason
        usage
        processingTime
      }
      evaluationTask {
        generationTask {
          modelName
          name
        }
      }
    }
    question(id: $questionId) {
      id
      questionNumber
      category
      turns
      bench {
        id
        name
      }
    }
  }
`
export default QUERY
