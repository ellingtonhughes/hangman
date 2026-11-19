# AI Contribution Statement

## 1. Tools Used

ChatGPT

## 2. Prompts and Assistance

ChatGPT played a substantial role in this assignment. I initially asked it to explain the concepts needed to expand my React Hangman game with a backend API and database. We worked through setting up an Express server, connecting to DynamoDB Local, creating a player table, and implementing GET, POST, and PUT endpoints. As I worked, I shared my code for feedback and used its suggestions to correct errors. ChatGPT initially provided explanations and incomplete examples so I could attempt parts myself. ChatGPT also helped connect the React login form to the API using fetch and async/await, display player statistics, save game results, handle duplicate player names, and configure Docker Compose. It guided me through testing requests in Postman and helped revise the README.

## 3. What It Got Wrong

The initial Docker Compose configuration included persistent database storage but did not account for the data folder's ownership. DynamoDB could not open its database file, preventing database requests from completing. After I shared the logs, ChatGPT helped identify the likely permissions issue and provided a correction. The configuration was later updated to prepare storage permissions during startup.

## 4. Reflection

Using AI helped me connect the React concepts from the original project to backend development. I gained a better understanding of
how the frontend sends requests to an API and how the API reads and updates database records. Testing with Postman helped me understand
the differences between GET, POST, and PUT requests. I also learned that a running container does not necessarily mean the application inside it is working correctly. Checking logs and testing the complete request helped identify problems. Because I incorporated complete code examples, I still need to review parts of the backend and Docker configuration more closely. The project works in my testing, but being able to run the code and being able to explain every line are different levels of understanding.