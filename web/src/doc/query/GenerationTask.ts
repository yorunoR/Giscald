const QUERY = /* GraphQL */ `
  query GenerationTask($id: ID!) {
    generationTask(id: $id) {
      id
      name
      modelName
      description
      status
      createdAt
      answers {
        id
        messages
        text
        finishReason
        usage
        processingTime
        question {
          questionNumber
          category
        }
      }
      tags {
        id
        name
      }
    }
  }
`
export default QUERY
