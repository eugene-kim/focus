import _ from 'lodash';
import astReader from './astReader';


/**
 * normalizeGql() doesn't make any assumptions about the query and the data coming in.
 * This is good in that it's not prescriptive, but the normalized data then needs to
 * be adjusted so that it can be put into our Redux store.
 * Entity names such as `createUser` need to be converted to its singular entity type name.
 * In this case, `createUser` will become `user`. Should a user entity already exist,
 * we'll merge the two objects.`
 */

const reduxify = (normalizedGqlResponse, operationAST, schemaDoc) => {  
  const operationName = astReader.getOperationName(operationAST);
  const rootFieldNames = astReader.getOperationRootFieldNames(operationAST);
  const rootFieldNameTypes = rootFieldNames.map(rootFieldName => ({
    name: rootFieldName,
    type: astReader.getOperationFieldType(operationName, rootFieldName, schemaDoc),
  }));
  const reduxFriendlyData = Object.assign({}, normalizedGqlResponse);

  rootFieldNameTypes.map(rootFieldNameType => {
    const reduxEntityName = getReduxEntityName(rootFieldNameType.type);

    reduxFriendlyData[reduxEntityName] = reduxFriendlyData[rootFieldNameType.name];
    delete reduxFriendlyData[rootFieldNameType.name];
  });

  return reduxFriendlyData;
}

/**
 * Formats a String to be lowercase and singular.
 * 
 * This is useful when accessing our redux store since a GraphQL type can be represented in multiple ways
 * (e.g. get a single session with `session` or get all of a user's sessions via `sessions`) while
 * an entity in our Redux store will exist in a single location.
 */
const getReduxEntityName = name => pluralize.singular(_.toLower(name));

export {getReduxEntityName};

export default reduxify;