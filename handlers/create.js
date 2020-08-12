import { v1 } from "uuid";

import { dynamoDb } from "../utils/dynamoDb";
import handler from "../libs/handler-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      trackId: v1(),
      trackName: data.trackName,
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});
