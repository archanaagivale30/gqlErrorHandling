const express = require('express')
const graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql');
import UserController from './controllers/Users.js';

const app = express()

app.set('port', process.env.PORT || 7000)

const getErrorCode = require('./config/errors')
const schema = buildSchema(`
scalar DateTime
scalar Object
scalar JSON
input UserInput {
    name:String
    email: String
  }         
  type Query {
    users(filter:Object): [User]
    userbyid(id: ID!):User
          },
type Mutation{
  updateuser(id:ID!,input:Object):Object
}
  type User {
    id:ID!
    name:String
    createdAt:DateTime
  }
       `);
const root = {
  users: UserController.getListUsers,
  userbyid: UserController.getUser,
  updateuser: UserController.updateUser
}

app.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: root,
    customFormatErrorFn: (err) => {
      const error = getErrorCode(err.message)
      return ({ message: error.message, statusCode: error.statusCode })
    }
  })(req, res)
})

const server = app.listen(app.get('port'), () => {
  console.log(`Server running -> PORT ${server.address().port}`)
})

module.exports = app
