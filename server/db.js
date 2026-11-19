const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')

const client = new DynamoDBClient({
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local'
  }
})

const documentClient = DynamoDBDocumentClient.from(client)

module.exports = { client, documentClient }