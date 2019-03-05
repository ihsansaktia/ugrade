import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { StoreContext } from 'redux-react-hook'
import App from 'ugrade/scenes/App'
import { ErrorBoundary } from './ErrorBoundary'
import { InMemoryAnnouncementService } from './services/announcement/InMemoryAnnouncementService'
import { InMemoryAuthService } from './services/auth/InMemoryAuthService'
import { InMemoryContestService } from './services/contest/InMemoryContestService'
import { InMemoryProblemService } from './services/problem/InMemoryProblemService'
import { InMemoryServerStatusService } from './services/serverStatus/InMemoryServerStatusService'
import { InMemoryUserService } from './services/user/InMemoryUserService'
import * as serviceWorker from './serviceWorker'
import { createStore } from './store'

import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

const history = createBrowserHistory()
const serverStatusService = new InMemoryServerStatusService()
const authService = new InMemoryAuthService(serverStatusService)
const userService = new InMemoryUserService(authService)
const problemService = new InMemoryProblemService(authService)
const announcementService = new InMemoryAnnouncementService(authService)
const contestService = new InMemoryContestService(
  serverStatusService,
  authService
)

export const store = createStore(history, {
  authService,
  userService,
  serverStatusService,
  contestService,
  problemService,
  announcementService,
})

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <StoreContext.Provider value={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </StoreContext.Provider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
)

serviceWorker.unregister()
