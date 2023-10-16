import { sendError, parseCookies } from "h3";
import { decodeRefreshToken } from "../../utils/jwt";
import { getRefreshTokenByToken } from "../../db/refreshTokens";
import { getUserById } from "../../db/users";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const refreshToken = cookies.refresh_token;

  if (!refreshToken) {
    return sendError({
      statusCode: 401,
      statusMessage: "refresh token is invalid",
    });
  }

  // 验证 refreshToken 是否存在
  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken) {
    return sendError({
      statusCode: 401,
      statusMessage: "refresh token is invalid",
    });
  }

  const token = decodeRefreshToken(refreshToken);
  // console.log('token: ', token);

  try {
    const user = await getUserById(token.userId);

    const { accessToken } = genTokens(user);

    return {
      access_token: accessToken,
    };
  } catch (error) {
    console.log(error);
    sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "something went wrong",
      })
    );
  }
});
