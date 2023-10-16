import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const refreshToken = cookies.refresh_token;
  const config = useRuntimeConfig();
  const at = jwt.sign({foo: "abc"}, config.jwtAccessSecret, {
    expiresIn: "4h"
  });
  console.dir(event);
  return {
    test: jwt.verify(refreshToken, config.jwtRefreshSecret)
  }
})