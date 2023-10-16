import { removeRefreshTokenByToken } from "~~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event);
    const token = cookies.refresh_token;
    await removeRefreshTokenByToken(token);
  } catch (error) {
    console.log(error);
  }
  sendRefreshToken(event, null)

  return {
    message: "Done",
  };
});
