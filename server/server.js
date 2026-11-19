const express = require('express')
const cors = require('cors')
const { randomUUID } = require('node:crypto')
const { PutCommand, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb')
const { documentClient } = require('./db')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    // Send a JSON object with a message saying the server is running.
    res.json({message: 'Server is running!' })
  })

  app.post('/players', async (req, res) => {
    const { playerName } = req.body
  
    if (typeof playerName !== 'string' || playerName.trim() === '') {
      return res.status(400).json({
        message: 'A player name is required.'
      })
    }
  
    const player = {
      playerID: randomUUID(),
      playerName: playerName.trim(),
      wins: 0,
      losses: 0
    }
  
    try {
      await documentClient.send(new PutCommand({
        TableName: 'Players',
        Item: player,
        ConditionExpression: 'attribute_not_exists(playerID)'
      }))
  
      res.status(201).json(player)
    } catch (error) {
      console.error('Error creating player:', error)
      res.status(500).json({
        message: 'Could not create player.'
      })
    }
  })

  app.get('/players', async (req, res) => {
    const playerName = req.query.playerName
  
    if (typeof playerName !== 'string' || playerName.trim() === '') {
      return res.status(400).json({
        message: 'A player name is required.'
      })
    }
  
    try {
      const result = await documentClient.send(new QueryCommand({
        TableName: 'Players',
        IndexName: 'playerName-index',
        KeyConditionExpression: 'playerName = :name',
        ExpressionAttributeValues: {
          ':name': playerName.trim()
        }
      }))
  
      const players = result.Items || []
  
      if (players.length === 0) {
        return res.status(404).json({
          message: 'Player not found.'
        })
      }
  
      res.json(players)
    } catch (error) {
      console.error('Error finding players:', error)
      res.status(500).json({
        message: 'Could not find players.'
      })
    }
  })

  app.put('/players/:playerID', async (req, res) => {
    const { playerID } = req.params
    const { wins, losses } = req.body
  
    if (
      !Number.isInteger(wins) ||
      !Number.isInteger(losses) ||
      wins < 0 ||
      losses < 0
    ) {
      return res.status(400).json({
        message: 'Wins and losses must be nonnegative integers.'
      })
    }
  
    try {
      const result = await documentClient.send(new UpdateCommand({
        TableName: 'Players',
        Key: { playerID },
        UpdateExpression: 'SET wins = :wins, losses = :losses',
        ExpressionAttributeValues: {
          ':wins': wins,
          ':losses': losses
        },
        ConditionExpression: 'attribute_exists(playerID)',
        ReturnValues: 'ALL_NEW'
      }))
  
      res.json(result.Attributes)
    } catch (error) {
      if (error.name === 'ConditionalCheckFailedException') {
        return res.status(404).json({
          message: 'Player not found.'
        })
      }
  
      console.error('Error updating player:', error)
      res.status(500).json({
        message: 'Could not update player.'
      })
    }
  })


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})