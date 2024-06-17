/* eslint-disable */
import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation CreateEvaluationTask(\n    $generationTaskId: ID!\n    $evalName: String!\n    $model: String!\n    $workerCount: Int!\n  ) {\n    createEvaluationTask(\n      generationTaskId: $generationTaskId\n      evalName: $evalName\n      model: $model\n      workerCount: $workerCount\n    ) {\n      id\n    }\n  }\n':
    types.CreateEvaluationTaskDocument,
  '\n  mutation CreateGenerationTask(\n    $benchCode: String!\n    $name: String!\n    $modelName: String!\n    $host: String!\n    $workerCount: Int!\n    $tagIds: [ID!]!\n    $paramStr: String\n    $description: String\n  ) {\n    createGenerationTask(\n      benchCode: $benchCode\n      name: $name\n      modelName: $modelName\n      host: $host\n      workerCount: $workerCount\n      tagIds: $tagIds\n      paramStr: $paramStr\n      description: $description\n    ) {\n      id\n    }\n  }\n':
    types.CreateGenerationTaskDocument,
  '\n  mutation DeleteEvaluationTask($id: ID!) {\n    deleteEvaluationTask(id: $id) {\n      id\n    }\n  }\n':
    types.DeleteEvaluationTaskDocument,
  '\n  mutation DeleteGenerationTask($id: ID!) {\n    deleteGenerationTask(id: $id) {\n      id\n    }\n  }\n':
    types.DeleteGenerationTaskDocument,
  '\n  mutation Signin {\n    signin {\n      id\n      name\n      email\n    }\n  }\n':
    types.SigninDocument,
  '\n  mutation UpdateEvaluationTask($id: ID!) {\n    updateEvaluationTask(id: $id) {\n      id\n    }\n  }\n':
    types.UpdateEvaluationTaskDocument,
  '\n  query Bench($id: ID!) {\n    bench(id: $id) {\n      id\n      name\n      description\n      questions {\n        id\n        questionNumber\n        category\n        turns\n        correctAnswers\n      }\n    }\n  }\n':
    types.BenchDocument,
  '\n  query Benches {\n    benches {\n      id\n      name\n      code\n      description\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.BenchesDocument,
  '\n  query CurrentUser {\n    currentUser {\n      email\n    }\n  }\n':
    types.CurrentUserDocument,
  '\n  query EvaluationTask($id: ID!) {\n    evaluationTask(id: $id) {\n      id\n      name\n      status\n      points\n      createdAt\n      rates {\n        id\n        model\n        point\n        text\n        finishReason\n        usage\n        processingTime\n        answer {\n          text\n          question {\n            id\n            questionNumber\n            category\n          }\n        }\n      }\n    }\n  }\n':
    types.EvaluationTaskDocument,
  '\n  query EvaluationTasks {\n    currentUser {\n      evaluationTasks {\n        id\n        name\n        status\n        points\n        processingTimes\n        createdAt\n        generationTask {\n          bench {\n            id\n            name\n            code\n          }\n        }\n      }\n    }\n  }\n':
    types.EvaluationTasksDocument,
  '\n  query GenerationTask($id: ID!) {\n    generationTask(id: $id) {\n      id\n      name\n      modelName\n      description\n      status\n      createdAt\n      answers {\n        id\n        messages\n        text\n        finishReason\n        usage\n        processingTime\n        question {\n          questionNumber\n          category\n        }\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n':
    types.GenerationTaskDocument,
  '\n  query GenerationTasks {\n    currentUser {\n      generationTasks {\n        id\n        name\n        modelName\n        description\n        status\n        createdAt\n        generationSetting {\n          host\n          workerCount\n          parameters\n        }\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n':
    types.GenerationTasksDocument,
  '\n  query Ping {\n    ping\n  }\n': types.PingDocument,
  '\n  query Rates($questionId: ID!) {\n    rates(questionId: $questionId) {\n      id\n      model\n      point\n      text\n      answer {\n        id\n        text\n        finishReason\n        usage\n        processingTime\n      }\n      evaluationTask {\n        generationTask {\n          modelName\n          name\n        }\n      }\n    }\n    question(id: $questionId) {\n      id\n      questionNumber\n      category\n      turns\n      bench {\n        id\n      }\n    }\n  }\n':
    types.RatesDocument,
  '\n  query Tags {\n    tags {\n      id\n      name\n    }\n  }\n': types.TagsDocument
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateEvaluationTask(\n    $generationTaskId: ID!\n    $evalName: String!\n    $model: String!\n    $workerCount: Int!\n  ) {\n    createEvaluationTask(\n      generationTaskId: $generationTaskId\n      evalName: $evalName\n      model: $model\n      workerCount: $workerCount\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateEvaluationTask(\n    $generationTaskId: ID!\n    $evalName: String!\n    $model: String!\n    $workerCount: Int!\n  ) {\n    createEvaluationTask(\n      generationTaskId: $generationTaskId\n      evalName: $evalName\n      model: $model\n      workerCount: $workerCount\n    ) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateGenerationTask(\n    $benchCode: String!\n    $name: String!\n    $modelName: String!\n    $host: String!\n    $workerCount: Int!\n    $tagIds: [ID!]!\n    $paramStr: String\n    $description: String\n  ) {\n    createGenerationTask(\n      benchCode: $benchCode\n      name: $name\n      modelName: $modelName\n      host: $host\n      workerCount: $workerCount\n      tagIds: $tagIds\n      paramStr: $paramStr\n      description: $description\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateGenerationTask(\n    $benchCode: String!\n    $name: String!\n    $modelName: String!\n    $host: String!\n    $workerCount: Int!\n    $tagIds: [ID!]!\n    $paramStr: String\n    $description: String\n  ) {\n    createGenerationTask(\n      benchCode: $benchCode\n      name: $name\n      modelName: $modelName\n      host: $host\n      workerCount: $workerCount\n      tagIds: $tagIds\n      paramStr: $paramStr\n      description: $description\n    ) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteEvaluationTask($id: ID!) {\n    deleteEvaluationTask(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteEvaluationTask($id: ID!) {\n    deleteEvaluationTask(id: $id) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteGenerationTask($id: ID!) {\n    deleteGenerationTask(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteGenerationTask($id: ID!) {\n    deleteGenerationTask(id: $id) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Signin {\n    signin {\n      id\n      name\n      email\n    }\n  }\n'
): (typeof documents)['\n  mutation Signin {\n    signin {\n      id\n      name\n      email\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateEvaluationTask($id: ID!) {\n    updateEvaluationTask(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateEvaluationTask($id: ID!) {\n    updateEvaluationTask(id: $id) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Bench($id: ID!) {\n    bench(id: $id) {\n      id\n      name\n      description\n      questions {\n        id\n        questionNumber\n        category\n        turns\n        correctAnswers\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Bench($id: ID!) {\n    bench(id: $id) {\n      id\n      name\n      description\n      questions {\n        id\n        questionNumber\n        category\n        turns\n        correctAnswers\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Benches {\n    benches {\n      id\n      name\n      code\n      description\n      createdAt\n      updatedAt\n    }\n  }\n'
): (typeof documents)['\n  query Benches {\n    benches {\n      id\n      name\n      code\n      description\n      createdAt\n      updatedAt\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CurrentUser {\n    currentUser {\n      email\n    }\n  }\n'
): (typeof documents)['\n  query CurrentUser {\n    currentUser {\n      email\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query EvaluationTask($id: ID!) {\n    evaluationTask(id: $id) {\n      id\n      name\n      status\n      points\n      createdAt\n      rates {\n        id\n        model\n        point\n        text\n        finishReason\n        usage\n        processingTime\n        answer {\n          text\n          question {\n            id\n            questionNumber\n            category\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query EvaluationTask($id: ID!) {\n    evaluationTask(id: $id) {\n      id\n      name\n      status\n      points\n      createdAt\n      rates {\n        id\n        model\n        point\n        text\n        finishReason\n        usage\n        processingTime\n        answer {\n          text\n          question {\n            id\n            questionNumber\n            category\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query EvaluationTasks {\n    currentUser {\n      evaluationTasks {\n        id\n        name\n        status\n        points\n        processingTimes\n        createdAt\n        generationTask {\n          bench {\n            id\n            name\n            code\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query EvaluationTasks {\n    currentUser {\n      evaluationTasks {\n        id\n        name\n        status\n        points\n        processingTimes\n        createdAt\n        generationTask {\n          bench {\n            id\n            name\n            code\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GenerationTask($id: ID!) {\n    generationTask(id: $id) {\n      id\n      name\n      modelName\n      description\n      status\n      createdAt\n      answers {\n        id\n        messages\n        text\n        finishReason\n        usage\n        processingTime\n        question {\n          questionNumber\n          category\n        }\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GenerationTask($id: ID!) {\n    generationTask(id: $id) {\n      id\n      name\n      modelName\n      description\n      status\n      createdAt\n      answers {\n        id\n        messages\n        text\n        finishReason\n        usage\n        processingTime\n        question {\n          questionNumber\n          category\n        }\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GenerationTasks {\n    currentUser {\n      generationTasks {\n        id\n        name\n        modelName\n        description\n        status\n        createdAt\n        generationSetting {\n          host\n          workerCount\n          parameters\n        }\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GenerationTasks {\n    currentUser {\n      generationTasks {\n        id\n        name\n        modelName\n        description\n        status\n        createdAt\n        generationSetting {\n          host\n          workerCount\n          parameters\n        }\n        tags {\n          id\n          name\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Ping {\n    ping\n  }\n'
): (typeof documents)['\n  query Ping {\n    ping\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Rates($questionId: ID!) {\n    rates(questionId: $questionId) {\n      id\n      model\n      point\n      text\n      answer {\n        id\n        text\n        finishReason\n        usage\n        processingTime\n      }\n      evaluationTask {\n        generationTask {\n          modelName\n          name\n        }\n      }\n    }\n    question(id: $questionId) {\n      id\n      questionNumber\n      category\n      turns\n      bench {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Rates($questionId: ID!) {\n    rates(questionId: $questionId) {\n      id\n      model\n      point\n      text\n      answer {\n        id\n        text\n        finishReason\n        usage\n        processingTime\n      }\n      evaluationTask {\n        generationTask {\n          modelName\n          name\n        }\n      }\n    }\n    question(id: $questionId) {\n      id\n      questionNumber\n      category\n      turns\n      bench {\n        id\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Tags {\n    tags {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  query Tags {\n    tags {\n      id\n      name\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
