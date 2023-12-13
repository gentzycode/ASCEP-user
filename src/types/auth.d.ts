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

interface ForgotPasswordCredentials {
  token?: string;
  email?: string;
  password?: string;
}

interface TwoFALoginPayload {
  email: string;
  token: string;
}
