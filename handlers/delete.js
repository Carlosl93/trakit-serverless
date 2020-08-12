import { dynamoDb } from "../utils/dynamoDb";
import handler from "../libs/handler-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      trackId: event.pathParameters.id
    }
  };

  await dynamoDb.delete(params);

  return { status: true };
});
