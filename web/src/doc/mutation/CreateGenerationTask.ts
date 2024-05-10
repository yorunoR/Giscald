const MUTATION = /* GraphQL */ `
  mutation CreateGenerationTask(
    $benchName: String!
    $name: String!
    $modelName: String!
    $host: String!
    $workerCount: Int!
    $paramStr: String
    $description: String
  ) {
    createGenerationTask(
      benchName: $benchName
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
