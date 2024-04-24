export const COMMON_TABS = [
  { name: "index", title: "Home", options: { href: "(tabs)/" } },
  { name: "create-post/index", title: "Create Post", options: { href: null } },
] as const;

export const AUTH_TABS = [
  { name: "(auth)/sign-in", title: "Sign In" },
  { name: "(auth)/sign-up", title: "Sign Up" },
] as const;

export const USER_TABS = [
  { name: "(user)/leaderboard", title: "Leaderboard" },
  { name: "(user)/profile", title: "Profile" },
] as const;
