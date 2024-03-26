const MUTATION = /* GraphQL */ `
  mutation CreateEvaluationTask(
    $generationTaskId: ID!
    $evalName: String!
    $model: String!
    $workerCount: Int!
  ) {
    createEvaluationTask(
      generationTaskId: $generationTaskId
      evalName: $evalName
      model: $model
      workerCount: $workerCount
    ) {
      id
    }
  }
`
export default MUTATION
