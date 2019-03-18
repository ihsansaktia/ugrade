import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { AddressInfo } from 'net'
import { createResolvers } from './api'
import { InMemoryAuthService, users as authFixture } from './auth/inmemory'
import { AppContext } from './context'
import { logger } from './logger'
import { schema } from './schema'

dotenv.config()

// const contestStore = new InMemoryContestStore(contestFixture)
// const languageStore = new InMemoryLanguageStore(languageFixture)
// const authStore = new InMemoryAuthStore(authFixture)
// const profileStore = new InMemoryProfileStore()

const authService = new InMemoryAuthService(authFixture)

const resolvers = createResolvers(
  // contestStore,
  // languageStore,
  authService
  // profileStore
)

const app = express()
app.use(morgan('combined'))

const apollo = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers as any,
  debug: process.env.NODE_ENV !== 'production',
  context: ({ req }): AppContext => {
    let authToken
    if (req.headers.authorization) {
      const headerParts = req.headers.authorization.split(' ')
      if (headerParts[0].toLowerCase() === 'bearer') authToken = headerParts[1]
    }

    const requestIp = (
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      '-'
    ).toString()
    const requestId = Math.round(Math.random() * 1000000).toString()

    return { authToken, requestId, requestIp }
  },
})
apollo.applyMiddleware({ app })

const port = Number.parseInt(process.env.PORT || '5000', 10)
const server = app.listen({ port }, () => {
  const addr = server.address() as AddressInfo
  logger.info(
    `Server started at port: ${addr.address}:${addr.port}${apollo.graphqlPath}`
  )
})
