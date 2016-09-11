import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { profileActionMiddleware } from 'redux-devtools-profiler-monitor';
import DevTools from './components/DevTools';
import App from './containers/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'

const enhancer = compose(
  applyMiddleware(profileActionMiddleware),
  DevTools.instrument()
);

const store = createStore(reducer, undefined, enhancer)

render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)
