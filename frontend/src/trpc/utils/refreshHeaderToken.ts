import { Cookies } from "react-cookie";

import { jwtDecode } from "jwt-decode";
import { baseURl } from "@/constant/env";

export const refreshHeaderToken = async () => {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const accessToken = user?.access_token ?? null;
  const refreshToken = user?.refresh_token ?? null;

  if (!accessToken) {
    return {};
  }

  const userId = user?.id ?? "";
  const decodedToken: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    const rsp = await fetch(`${baseURl}/auth.refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken, userId }),
    });
    if (rsp.ok) {
      const response = await rsp.json();
      if (response.result.data) {
        cookies.set("user", response.result.data);
      }
    }
  }
  return {
    authorization: `Bearer ${accessToken}`,
  };
};
// RequestInitEsque
export const fetcher = async (
  info: RequestInfo | URL,
  options: RequestInit | undefined
) => {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const userId = user?.id ?? "";
  const refreshToken = user?.refresh_token ?? null;

  const response = await fetch(info, options);

  if (response.status === 401) {
    if (!refreshToken) {
      // navigate to login
      cookies.remove("user");
      return response;
    }

    try {
      const rsp = await fetch(`${baseURl}/auth.refreshToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken, userId }),
      });
      if (rsp.ok) {
        const response = await rsp.json();
        const accessToken = response.result.data?.access_token;
        if (response.result.data) {
          cookies.set("user", response.result.data);
        }
        return await fetch(info, {
          ...options,
          headers: {
            ...options?.headers,
            authorization: `Bearer ${accessToken}`,
          },
        });
      }
    } catch (error) {
      // navigate to login
      console.error({ message: "login error" });
      cookies.remove("user");
      return response;
    }
  }

  return response;
};

export const getAccessToken = () => {
  const cookies = new Cookies();
  const user = cookies.get("user");
  return user?.access_token ?? null;
};
