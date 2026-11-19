const { CreateTableCommand } = require('@aws-sdk/client-dynamodb')
const { client } = require('./db')

const command = new CreateTableCommand({
    TableName: 'Players',
  
    AttributeDefinitions: [
      { AttributeName: 'playerID', AttributeType: 'S' },
      { AttributeName: 'playerName', AttributeType: 'S' }
    ],
  
    KeySchema: [
      { AttributeName: 'playerID', KeyType: 'HASH' }
    ],
  
    GlobalSecondaryIndexes: [
      {
        IndexName: 'playerName-index',
        KeySchema: [
          { AttributeName: 'playerName', KeyType: 'HASH' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        }
      }
    ],
  
    BillingMode: 'PAY_PER_REQUEST'
  })

  async function createTable() {
    const maxAttempts = 10
  
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await client.send(command)
        console.log('Players table created!')
        return
      } catch (error) {
        if (error.name === 'ResourceInUseException') {
          console.log('Players table already exists.')
          return
        }
  
        if (attempt === maxAttempts) {
          throw error
        }
  
        console.log(
          `Database setup attempt ${attempt} failed. Retrying in 2 seconds...`
        )
  
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
  }
  
  createTable().catch(error => {
    console.error('Could not initialize Players table:', error)
    process.exitCode = 1
  })
  
  createTable()