interface OTPPayload {
  email: string;
  token: string;
}

interface LoginResp {
  type: string;
  accessToken: string;
  expiresAt: string;
  refreshToken: string;
}
