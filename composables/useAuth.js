import jwt_decode from "jwt-decode";

export default () => {
  // 状态管理 分别处理 token 和 user信息
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");
  const useAuthLoading = () => useState("auth_loading", () => true);

  // 包装设置token方法
  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  // 包装设置user信息方法
  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const setAuthLoading = (value) => {
    const authLoading = useAuthLoading();
    authLoading.value = value;
  };

  //用于登录用户
  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "Post",
          body: {
            username,
            password,
          },
        });

        setToken(data.access_token);
        setUser(data.user);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    });
  };

    //用于登录用户
    const logout = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await useFetchApi("/api/auth/logout", {
            method: "Post"
          });
  
          setToken(null);
          setUser(null);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      });
    };

  // 调用此函数以刷新cookie中的token
  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // 在服务端 调用 后端接口 使用$fetch
        const data = await $fetch("/api/auth/refresh");

        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  //获取用户的用户信息
  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi("/api/auth/user");

        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  //初始化用户认证，包括刷新令牌和获取用户信息
  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setAuthLoading(true);
      try {
        await refreshToken();
        await getUser();

        reRefreshAccessToken();

        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setAuthLoading(false);
      }
    });
  };

  const reRefreshAccessToken = () => {
    const token = useAuthToken();

    if (!token.value) {
      return;
    }

    const jwt = jwt_decode(token.value);

    // console.log(jwt);
    // alert("refreshAccessToken");

    const newExpireTime = (jwt.exp - jwt.iat - 5) * 1000;
    console.log("newExpireTime: ", newExpireTime);

    setTimeout(async () => {
      await getUser(jwt.userId);
      reRefreshAccessToken();
    }, newExpireTime);
  };

  return {
    login,
    useAuthUser,
    useAuthToken,
    useAuthLoading,
    initAuth,
    reRefreshAccessToken,
    logout
  };
};
