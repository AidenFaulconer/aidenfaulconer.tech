// https://read.reduxbook.com/markdown/part2/12-clientside-persistance.html

// const persistMiddleware = (store) => (next) => (action) => {
//   const result = next(action);
//   const shouldPersist = actionsToPersist[action.type];

//   if (shouldPersist) {
//     // We often don't have any urgency here
//     // we can just tell the browser to do this
//     // when it's not busy. Which is exactly
//     // what requestIdleCallback lets us do.
//     ric(() => {
//       const appState = store.getState();
//       shouldPersist.forEach((reducerName) => {
//         const stateToPersist = appState[reducerName];
//         cacheLibrary.set(reducerName, stateToPersist);
//       });
//     });
//   }

//   return result;
// };

// cacheLibrary.getAll().then((data) => {
//   createStore(rootReducer, data);
// });
