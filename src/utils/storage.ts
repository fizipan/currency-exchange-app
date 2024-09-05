import Cookies from "js-cookie";

export const Cookie = {
  setToken(token: string) {
    const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
    Cookies.set("token", token, {
      secure: true,
      sameSite: "lax",
      expires: inOneHour,
    });
  },
  getToken() {
    return Cookies.get("token");
  },
  clearTokens() {
    Cookies.remove("token", {
      secure: true,
      sameSite: "lax",
    });
  },
};
