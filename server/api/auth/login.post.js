import { sendError, readBody } from "h3";
import { getUserByUsername } from "../../db/users";
import bcrypt from "bcrypt";
import { genTokens, sendRefreshToken } from "../../utils/jwt";
import { userTransformer } from "../../transformers/user";
import { createRefreshToken } from "../../db/refreshTokens";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid params",
      })
    );
  }

  // if user registered
  const user = await getUserByUsername(username);
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  // compare the password
  const doseThePasswordMatch = await bcrypt.compare(password, user.password);

  if (!doseThePasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  // Generate Tokens
  const { accessToken, refreshToken } = genTokens(user);

  // save it into db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  // Add http only cookie
  sendRefreshToken(event, refreshToken);

  return {
    user: userTransformer(user),
    access_token: accessToken,
  };
});
