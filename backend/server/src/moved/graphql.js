// import {
//   ApolloLink,
//   Operation,
//   FetchResult,
//   Observable,
// } from '@apollo/client/core';
// import { print, GraphQLError } from 'graphql';
// import { createClient, ClientOptions, Client } from 'graphql-http';
// import { getSession } from './my-auth';

// class HTTPLink extends ApolloLink {
//   private client: Client;

//   constructor(options: ClientOptions) {
//     super();
//     this.client = createClient(options);
//   }

//   public request(operation: Operation): Observable<FetchResult> {
//     return new Observable((sink) => {
//       return this.client.subscribe<FetchResult>(
//         { ...operation, query: print(operation.query) },
//         {
//           next: sink.next.bind(sink),
//           complete: sink.complete.bind(sink),
//           error: sink.error.bind(sink),
//         },
//       );
//     });
//   }
// }

// const link = new HTTPLink({
//   url: 'http://where.is:4000/graphql',
//   headers: async () => {
//     const session = await getSession();
//     if (session) {
//       return {
//         Authorization: `Bearer ${session.token}`,
//       };
//     }
//   },
// });