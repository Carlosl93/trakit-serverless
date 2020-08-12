import { dynamoDb } from "../utils/dynamoDb";
import handler from "../libs/handler-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      trackId: event.pathParameters.id
    },
    UpdateExpression: "SET trackName = :trackName",
    ExpressionAttributeValues: {
      ":trackName": data.trackName || null
    },
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);

  return { status: true };
});
