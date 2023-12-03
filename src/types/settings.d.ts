type SettingsOption =
  | "User Profile"
  | "Change Password"
  | "Enable 2FA"
  | "Activities"
  | "Edit Profile";

interface SettingsContextType {
  activeOption: SettingsOption;
  setActiveOption: (arg: SettingsOption) => void;
}

interface SettingsOptionObj {
  title: SettingsOption;
  subtitle: string;
}
