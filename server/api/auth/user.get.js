import { userTransformer } from "../../transformers/user";

export default defineEventHandler(async (event) => {
  // console.log("event.context: ", event.context.sessions);
  return {
    user: userTransformer(event.context.auth?.user),
  };
});
