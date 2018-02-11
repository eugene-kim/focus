import {normalize} from 'normalizr';
import {graphql} from 'graphql';
import {parse} from 'graphql/language/parser';
import {introspectionQuery} from 'graphql/utilities';

import normalizeGql from './normalizeGql';
import gqlSchema from '../schema/typeDefSchema';
import reduxify from './reduxify';
import containsQueryData from './containsQueryData';

import { UPDATE_FROM_SERVER } from 'redux/actions/types';


export default ({endpoint = 'http://localhost:3000/graphql', store} = {}) => {

  if (!store) {
    throw `A Redux store must be provided to construct the client!`;
  }

  return {
    // TODO: Consider being able to dynamically determine if query or mutation.
    query: async function(query, options = {}) {
      const schemaDocumentWhole = await graphql(gqlSchema, introspectionQuery);
      const schemaDoc = schemaDocumentWhole.data.__schema;
      const gqlOperationAST = parse(query);
      const storeContainsQueryData = containsQueryData(gqlOperationAST, schemaDoc, store);

      if (storeContainsQueryData) {
        console.log('Store contains query data - no need to make GraphQL request.');

        return {};
      } else {
        console.log('Store does not contain query data - making a request to the GraphQL server.');

        const normalizrSchema = await normalizeGql(gqlOperationAST, schemaDoc);

        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',  
            },
            body: JSON.stringify({query}),
          });

          const {status} = response;
          const responseBody = response._bodyText;

          if (status !== 200) {
            throw `GraphQL operation failed! Status: ${status}; ${responseBody}`;
          }

          const gqlResponse = JSON.parse(responseBody);
          const normalizedData = normalize(gqlResponse, normalizrSchema);
          const reduxFriendlyData = reduxify(normalizedData, gqlOperationAST, schemaDoc);

          store.dispatch({
            type: UPDATE_FROM_SERVER,
            payload: reduxFriendlyData,
          });

          // TODO: We don't need to be returning back this data when we're using the client.
          // We'll probably we sending back something like a response object indicating the status
          // of the GraphQL request.
          return reduxFriendlyData;
        } catch(error) {
          console.error(error);
        }
      }
    },

    getStore: function() {
      return store;
    },
  };
}