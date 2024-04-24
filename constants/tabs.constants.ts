const COMMON_TABS = [{ name: "index", title: "Home" }];

export const AUTH_TABS = [
  ...COMMON_TABS,
  { name: "sign-in", title: "Sign In" },
  { name: "sign-up", title: "Sign Up" },
];

export const USER_TABS = [
  ...COMMON_TABS,
  { name: "leaderboard", title: "Leaderboard" },
  { name: "profile", title: "Profile" },
];
