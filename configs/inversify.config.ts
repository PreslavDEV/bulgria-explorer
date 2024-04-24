import { Container } from "inversify";

import { AuthStore } from "@/stores/auth/auth.store";
import { LayoutStore } from "@/stores/layout/layout.store";
import { LeaderboardStore } from "@/stores/leaderboard/leaderboard.store";
import { CreatePostStore } from "@/stores/post/create-post.store";
import { PostStore } from "@/stores/post/post.store";
import { PostFeedStore } from "@/stores/post/post-feed.store";

import { TYPES } from "./di-types.config";

const container = new Container({
  defaultScope: "Singleton",
});

container.bind<AuthStore>(TYPES.AuthStore).to(AuthStore);
container.bind<LayoutStore>(TYPES.LayoutStore).to(LayoutStore);
container.bind<LeaderboardStore>(TYPES.LeaderboardStore).to(LeaderboardStore);
container.bind<CreatePostStore>(TYPES.CreatePostStore).to(CreatePostStore);
container.bind<PostStore>(TYPES.PostStore).to(PostStore);
container.bind<PostFeedStore>(TYPES.PostFeedStore).to(PostFeedStore);

export { container };
