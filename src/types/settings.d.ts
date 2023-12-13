/* eslint-disable @typescript-eslint/no-explicit-any */
type SettingsOption =
  | "User Profile"
  | "Change Password"
  | "Enable 2FA"
  | "Verify 2FA OTP"
  | "Activities"
  | "Edit Profile";

interface SettingsContextType {
  timeLimit: number;
  setTimeLimit: (arg: number) => void;
  activeOption: SettingsOption;
  setActiveOption: (arg: SettingsOption) => void;
  setTwoFactorAuth: (arg: boolean) => void;
  twoFactorAuth: boolean;
}

interface SettingsOptionObj {
  title: SettingsOption;
  subtitle: string;
}

interface UserData {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  mobile: string;
  bio: any;
  role: number;
  dob: any;
  last_login: string;
  date_joined: string;
  profile_picture: any;
  analytic: any;
  twoFA: TwoFA | null;
  roleDetail: RoleDetail;
}

interface TwoFA {
  verified: boolean;
}

interface RoleDetail {
  id: number;
  name: string;
  rolePermission: any[];
}

interface TwoFactorAuthForm {
  type: "email" | "authenticator app" | "sms";
  email?: string;
}
