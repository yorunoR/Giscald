const MUTATION = /* GraphQL */ `
  mutation CreateGenerationTask(
    $benchCode: String!
    $name: String!
    $modelName: String!
    $host: String!
    $workerCount: Int!
    $tagIds: [ID!]!
    $paramStr: String
    $description: String
  ) {
    createGenerationTask(
      benchCode: $benchCode
      name: $name
      modelName: $modelName
      host: $host
      workerCount: $workerCount
      tagIds: $tagIds
      paramStr: $paramStr
      description: $description
    ) {
      id
    }
  }
`
export default MUTATION
