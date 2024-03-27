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
        category
        text
        finishReason
        usage
        processingTime
      }
    }
  }
`
export default QUERY
