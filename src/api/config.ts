import config from "@/utils/config";

export const configOptions = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.accessToken)) return {};

  const accessToken = window.localStorage.getItem(config.key.accessToken);

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
};
