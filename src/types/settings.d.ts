type SettingsOption =
  | "User Profile"
  | "Change Password"
  | "Enable 2FA"
  | "Verify 2FA OTP"
  | "Activities"
  | "Edit Profile";

interface SettingsContextType {
  activeOption: SettingsOption;
  setActiveOption: (arg: SettingsOption) => void;
  setTwoFactorAuth: (arg: boolean) => void;
  twoFactorAuth: boolean;
}

interface SettingsOptionObj {
  title: SettingsOption;
  subtitle: string;
}
