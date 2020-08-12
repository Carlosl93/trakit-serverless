import { dynamoDb } from "../utils/dynamoDb";
import handler from "../libs/handler-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      trackId: event.pathParameters.id
    }
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error("Item not found");
  }

  return result.Item;
});
