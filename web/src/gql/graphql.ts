/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** Date with time (isoformat) */
  DateTime: { input: string; output: string }
  /** Decimal (fixed-point) */
  Decimal: { input: any; output: any }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
}

export type AnswerType = {
  __typename?: 'AnswerType'
  finishReason: Scalars['String']['output']
  id: Scalars['ID']['output']
  messages: Scalars['JSON']['output']
  processingTime: Scalars['Decimal']['output']
  question: QuestionType
  text: Scalars['String']['output']
  usage: Scalars['JSON']['output']
}

export type BenchType = {
  __typename?: 'BenchType'
  code?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  questions: Array<QuestionType>
  updatedAt: Scalars['DateTime']['output']
}

export enum EvaluationTaskStatusType {
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Started = 'Started'
}

export type EvaluationTaskType = {
  __typename?: 'EvaluationTaskType'
  createdAt: Scalars['DateTime']['output']
  generationTask: GenerationTaskType
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  points: Scalars['JSON']['output']
  processingTimes: Scalars['JSON']['output']
  rates: Array<RateType>
  status: EvaluationTaskStatusType
}

export type GenerationSettingType = {
  __typename?: 'GenerationSettingType'
  host: Scalars['String']['output']
  id: Scalars['ID']['output']
  parameters: Scalars['JSON']['output']
  workerCount: Scalars['Int']['output']
}

export enum GenerationTaskStatusType {
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Started = 'Started'
}

export type GenerationTaskType = {
  __typename?: 'GenerationTaskType'
  answers: Array<AnswerType>
  bench: BenchType
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  generationSetting: GenerationSettingType
  id: Scalars['ID']['output']
  modelName: Scalars['String']['output']
  name: Scalars['String']['output']
  status: GenerationTaskStatusType
  tags: Array<TagType>
}

export type Mutation = {
  __typename?: 'Mutation'
  createEvaluationTask: EvaluationTaskType
  createGenerationTask: GenerationTaskType
  deleteEvaluationTask: EvaluationTaskType
  deleteGenerationTask: GenerationTaskType
  signin: UserType
  updateEvaluationTask: EvaluationTaskType
}

export type MutationCreateEvaluationTaskArgs = {
  evalName: Scalars['String']['input']
  generationTaskId: Scalars['ID']['input']
  model: Scalars['String']['input']
  workerCount: Scalars['Int']['input']
}

export type MutationCreateGenerationTaskArgs = {
  benchCode: Scalars['String']['input']
  description?: InputMaybe<Scalars['String']['input']>
  host: Scalars['String']['input']
  modelName: Scalars['String']['input']
  name: Scalars['String']['input']
  paramStr?: InputMaybe<Scalars['String']['input']>
  tagIds: Array<Scalars['ID']['input']>
  workerCount: Scalars['Int']['input']
}

export type MutationDeleteEvaluationTaskArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteGenerationTaskArgs = {
  id: Scalars['ID']['input']
}

export type MutationUpdateEvaluationTaskArgs = {
  id: Scalars['ID']['input']
}

export type Query = {
  __typename?: 'Query'
  bench: BenchType
  benches: Array<BenchType>
  currentUser: UserType
  evaluationTask: EvaluationTaskType
  generationTask: GenerationTaskType
  ping: Scalars['String']['output']
  question: QuestionType
  rates: Array<RateType>
  tags: Array<TagType>
}

export type QueryBenchArgs = {
  id: Scalars['ID']['input']
}

export type QueryEvaluationTaskArgs = {
  id: Scalars['ID']['input']
}

export type QueryGenerationTaskArgs = {
  id: Scalars['ID']['input']
}

export type QueryQuestionArgs = {
  id: Scalars['ID']['input']
}

export type QueryRatesArgs = {
  questionId: Scalars['ID']['input']
}

export type QuestionType = {
  __typename?: 'QuestionType'
  bench: BenchType
  category: Scalars['String']['output']
  correctAnswers: Array<Maybe<Scalars['String']['output']>>
  id: Scalars['ID']['output']
  questionNumber: Scalars['Int']['output']
  turns: Array<Scalars['String']['output']>
}

export type RateType = {
  __typename?: 'RateType'
  answer: AnswerType
  evaluationTask: EvaluationTaskType
  finishReason: Scalars['String']['output']
  id: Scalars['ID']['output']
  model: Scalars['String']['output']
  point: Scalars['Int']['output']
  processingTime: Scalars['Decimal']['output']
  text: Scalars['String']['output']
  usage: Scalars['JSON']['output']
}

export type TagType = {
  __typename?: 'TagType'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type UserType = {
  __typename?: 'UserType'
  activated: Scalars['Boolean']['output']
  email: Scalars['String']['output']
  evaluationTasks: Array<EvaluationTaskType>
  generationTasks: Array<GenerationTaskType>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  profileImage?: Maybe<Scalars['String']['output']>
  role: Scalars['Int']['output']
}

export type CreateEvaluationTaskMutationVariables = Exact<{
  generationTaskId: Scalars['ID']['input']
  evalName: Scalars['String']['input']
  model: Scalars['String']['input']
  workerCount: Scalars['Int']['input']
}>

export type CreateEvaluationTaskMutation = {
  __typename?: 'Mutation'
  createEvaluationTask: { __typename?: 'EvaluationTaskType'; id: string }
}

export type CreateGenerationTaskMutationVariables = Exact<{
  benchCode: Scalars['String']['input']
  name: Scalars['String']['input']
  modelName: Scalars['String']['input']
  host: Scalars['String']['input']
  workerCount: Scalars['Int']['input']
  tagIds: Array<Scalars['ID']['input']> | Scalars['ID']['input']
  paramStr?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
}>

export type CreateGenerationTaskMutation = {
  __typename?: 'Mutation'
  createGenerationTask: { __typename?: 'GenerationTaskType'; id: string }
}

export type DeleteEvaluationTaskMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteEvaluationTaskMutation = {
  __typename?: 'Mutation'
  deleteEvaluationTask: { __typename?: 'EvaluationTaskType'; id: string }
}

export type DeleteGenerationTaskMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteGenerationTaskMutation = {
  __typename?: 'Mutation'
  deleteGenerationTask: { __typename?: 'GenerationTaskType'; id: string }
}

export type SigninMutationVariables = Exact<{ [key: string]: never }>

export type SigninMutation = {
  __typename?: 'Mutation'
  signin: { __typename?: 'UserType'; id: string; name: string; email: string }
}

export type UpdateEvaluationTaskMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UpdateEvaluationTaskMutation = {
  __typename?: 'Mutation'
  updateEvaluationTask: { __typename?: 'EvaluationTaskType'; id: string }
}

export type BenchQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type BenchQuery = {
  __typename?: 'Query'
  bench: {
    __typename?: 'BenchType'
    id: string
    name: string
    description?: string | null
    questions: Array<{
      __typename?: 'QuestionType'
      id: string
      questionNumber: number
      category: string
      turns: Array<string>
      correctAnswers: Array<string | null>
    }>
  }
}

export type BenchesQueryVariables = Exact<{ [key: string]: never }>

export type BenchesQuery = {
  __typename?: 'Query'
  benches: Array<{
    __typename?: 'BenchType'
    id: string
    name: string
    code?: string | null
    description?: string | null
    createdAt: string
    updatedAt: string
  }>
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  currentUser: { __typename?: 'UserType'; email: string }
}

export type EvaluationTaskQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type EvaluationTaskQuery = {
  __typename?: 'Query'
  evaluationTask: {
    __typename?: 'EvaluationTaskType'
    id: string
    name: string
    status: EvaluationTaskStatusType
    points: any
    createdAt: string
    rates: Array<{
      __typename?: 'RateType'
      id: string
      model: string
      point: number
      text: string
      finishReason: string
      usage: any
      processingTime: any
      answer: {
        __typename?: 'AnswerType'
        text: string
        question: {
          __typename?: 'QuestionType'
          id: string
          questionNumber: number
          category: string
        }
      }
    }>
  }
}

export type EvaluationTasksQueryVariables = Exact<{ [key: string]: never }>

export type EvaluationTasksQuery = {
  __typename?: 'Query'
  currentUser: {
    __typename?: 'UserType'
    evaluationTasks: Array<{
      __typename?: 'EvaluationTaskType'
      id: string
      name: string
      status: EvaluationTaskStatusType
      points: any
      processingTimes: any
      createdAt: string
      generationTask: {
        __typename?: 'GenerationTaskType'
        bench: { __typename?: 'BenchType'; id: string; name: string }
      }
    }>
  }
}

export type GenerationTaskQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GenerationTaskQuery = {
  __typename?: 'Query'
  generationTask: {
    __typename?: 'GenerationTaskType'
    id: string
    name: string
    modelName: string
    description?: string | null
    status: GenerationTaskStatusType
    createdAt: string
    answers: Array<{
      __typename?: 'AnswerType'
      id: string
      messages: any
      text: string
      finishReason: string
      usage: any
      processingTime: any
      question: { __typename?: 'QuestionType'; questionNumber: number; category: string }
    }>
    tags: Array<{ __typename?: 'TagType'; id: string; name: string }>
  }
}

export type GenerationTasksQueryVariables = Exact<{ [key: string]: never }>

export type GenerationTasksQuery = {
  __typename?: 'Query'
  currentUser: {
    __typename?: 'UserType'
    generationTasks: Array<{
      __typename?: 'GenerationTaskType'
      id: string
      name: string
      modelName: string
      description?: string | null
      status: GenerationTaskStatusType
      createdAt: string
      generationSetting: {
        __typename?: 'GenerationSettingType'
        host: string
        workerCount: number
        parameters: any
      }
      tags: Array<{ __typename?: 'TagType'; id: string; name: string }>
    }>
  }
}

export type PingQueryVariables = Exact<{ [key: string]: never }>

export type PingQuery = { __typename?: 'Query'; ping: string }

export type RatesQueryVariables = Exact<{
  questionId: Scalars['ID']['input']
}>

export type RatesQuery = {
  __typename?: 'Query'
  rates: Array<{
    __typename?: 'RateType'
    id: string
    model: string
    point: number
    text: string
    answer: {
      __typename?: 'AnswerType'
      id: string
      text: string
      finishReason: string
      usage: any
      processingTime: any
    }
    evaluationTask: {
      __typename?: 'EvaluationTaskType'
      generationTask: { __typename?: 'GenerationTaskType'; modelName: string; name: string }
    }
  }>
  question: {
    __typename?: 'QuestionType'
    id: string
    questionNumber: number
    category: string
    turns: Array<string>
    bench: { __typename?: 'BenchType'; id: string }
  }
}

export type TagsQueryVariables = Exact<{ [key: string]: never }>

export type TagsQuery = {
  __typename?: 'Query'
  tags: Array<{ __typename?: 'TagType'; id: string; name: string }>
}

export const CreateEvaluationTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateEvaluationTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'generationTaskId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'evalName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'model' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'workerCount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createEvaluationTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'generationTaskId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'generationTaskId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'evalName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'evalName' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'model' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'model' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'workerCount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'workerCount' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateEvaluationTaskMutation, CreateEvaluationTaskMutationVariables>
export const CreateGenerationTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateGenerationTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'benchCode' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'modelName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'host' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'workerCount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tagIds' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
              }
            }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'paramStr' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createGenerationTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'benchCode' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'benchCode' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'modelName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'modelName' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'host' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'host' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'workerCount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'workerCount' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tagIds' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'tagIds' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'paramStr' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'paramStr' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateGenerationTaskMutation, CreateGenerationTaskMutationVariables>
export const DeleteEvaluationTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteEvaluationTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteEvaluationTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DeleteEvaluationTaskMutation, DeleteEvaluationTaskMutationVariables>
export const DeleteGenerationTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteGenerationTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteGenerationTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DeleteGenerationTaskMutation, DeleteGenerationTaskMutationVariables>
export const SigninDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Signin' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signin' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SigninMutation, SigninMutationVariables>
export const UpdateEvaluationTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateEvaluationTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateEvaluationTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateEvaluationTaskMutation, UpdateEvaluationTaskMutationVariables>
export const BenchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Bench' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'bench' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'questions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'questionNumber' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'turns' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'correctAnswers' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BenchQuery, BenchQueryVariables>
export const BenchesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Benches' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'benches' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BenchesQuery, BenchesQueryVariables>
export const CurrentUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CurrentUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>
export const EvaluationTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EvaluationTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'evaluationTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'points' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rates' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'point' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'finishReason' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'usage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'processingTime' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'answer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'question' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'questionNumber' }
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'category' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<EvaluationTaskQuery, EvaluationTaskQueryVariables>
export const EvaluationTasksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EvaluationTasks' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'evaluationTasks' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'points' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'processingTimes' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'generationTask' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'bench' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<EvaluationTasksQuery, EvaluationTasksQueryVariables>
export const GenerationTaskDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GenerationTask' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'generationTask' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'modelName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'answers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'messages' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'finishReason' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'usage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'processingTime' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'question' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'questionNumber' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'category' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tags' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GenerationTaskQuery, GenerationTaskQueryVariables>
export const GenerationTasksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GenerationTasks' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'generationTasks' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'modelName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'generationSetting' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'host' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'workerCount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'parameters' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tags' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GenerationTasksQuery, GenerationTasksQueryVariables>
export const PingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Ping' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'ping' } }]
      }
    }
  ]
} as unknown as DocumentNode<PingQuery, PingQueryVariables>
export const RatesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Rates' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'questionId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rates' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'questionId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'questionId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                { kind: 'Field', name: { kind: 'Name', value: 'point' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'answer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'finishReason' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'usage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'processingTime' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'evaluationTask' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'generationTask' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'modelName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'question' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'questionId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'questionNumber' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                { kind: 'Field', name: { kind: 'Name', value: 'turns' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bench' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RatesQuery, RatesQueryVariables>
export const TagsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Tags' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<TagsQuery, TagsQueryVariables>
