# Redux DevTools Profiler Monitor
=================================

A custom monitor for Redux DevTools to profile a given action in Chrome DevTools

### Installation

```
npm install --save redux-devtools-profiler-monitor
```

### Usage

This library comes with 2 pieces, a Redux Middleware and Redux DevTools Monitor.

#### Middleware

##### `createStore.js`

```js
import { createStore, applyMiddleware } from 'redux';
import { profileActionMiddleware } from 'redux-devtools-profiler-monitor';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(profileActionMiddleware)
);
```

Then, whenever an action is dispatched whose type matches the value of `window.profileAction`, it will be profiled in Chrome's DevTools. The accompanying Monitor (below) provides a friendly UI to set this value.

#### Monitor

You can use `ProfilerMonitor` as the only monitor in your app:

##### `containers/DevTools.js`

```js
import React from 'react';
import { createDevTools } from 'redux-devtools';
import ProfilerMonitor from 'redux-devtools-profiler-monitor';

export default createDevTools(
  <ProfilerMonitor />
);
```
Then you can render `<DevTools>` to any place inside app or even into a separate popup window.

Alternative, you can use it together with [`DockMonitor`](https://github.com/gaearon/redux-devtools-dock-monitor) to make it dockable.  
Consult the [`DockMonitor` README](https://github.com/gaearon/redux-devtools-dock-monitor) for details of this approach.

[Read how to start using Redux DevTools.](https://github.com/gaearon/redux-devtools)

### Features

Provides a Redux DevTools with an input field where you can type in the name of an action type that you want to be profiled in [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/profile/rendering-tools/js-execution). Whenever that action is dispatched, its handling will automatically be profiled.

The profiling happens in the provided middleware. If the browser does not contain the `console.profile` function, then the middleware will no-op and pass the action through without attempting to profile. This ensures that the middleware is safe to include in all browsers. It should also be considered performant enough to include in production builds, where profiling can be helpful. It's even usable when not rendering the ProfilerMonitor, which is typical for production builds.

In Redux applications, each dispatched action encompasses computing the next state by running the action through all the reducers an re-rendering each connected component. This is a very valuable area of the application to optimize as this process is synchronous and blocking of all downstream processing.

### Tips

Always, ALWAYS, profile with the [production build of React](https://facebook.github.io/react/docs/advanced-performance.html#use-the-production-build).
