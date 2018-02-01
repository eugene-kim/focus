import {normalize} from 'normalizr';
import request from 'request-promise';
import {graphql} from 'graphql';
import {parse} from 'graphql/language/parser';
import {introspectionQuery} from 'graphql/utilities';

import normalizeGql from './normalizeGql';
import gqlSchema from '../schema';
import reduxify from './reduxify';
import containsQueryData from './containsQueryData';

import {UPDATE_FROM_SERVER} from '~/redux/actions/types';


export default {

  // TODO: Consider being able to dynamically determine if query or mutation.
  query: async (query, store, options = {}) => {
    const schemaDocumentWhole = await graphql(gqlSchema, introspectionQuery);
    const schemaDoc = schemaDocumentWhole.data.__schema;
    const gqlOperationAST = parse(query);
    const storeContainsQueryData = containsQueryData(gqlOperationAST, schemaDoc, store);

    if (!storeContainsQueryData) {
      const normalizrSchema = await normalizeGql(gqlOperationAST, schemaDoc);
      const requestOptions = {
        method: 'POST',
        uri: 'http://localhost:3000/graphql',
        body: JSON.stringify({query}),
        headers: {
          'Content-Type':'application/json',
        },
      };

      try {
        const gqlResponse = await request(requestOptions);
        const responseObject = JSON.parse(gqlResponse);
        const normalizedData = normalize(responseObject, normalizrSchema);
        debugger
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
        console.log(error);
      }
    }
  },
}