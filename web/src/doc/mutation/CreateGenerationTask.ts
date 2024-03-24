const MUTATION = /* GraphQL */ `
  mutation CreateGenerationTask(
    $name: String!
    $modelName: String!
    $host: String!
    $workerCount: Int!
    $paramStr: String
    $description: String
  ) {
    createGenerationTask(
      name: $name
      modelName: $modelName
      host: $host
      workerCount: $workerCount
      paramStr: $paramStr
      description: $description
    ) {
      id
    }
  }
`
export default MUTATION
