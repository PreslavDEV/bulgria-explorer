import { Container } from "inversify";

import { AuthStore } from "@/stores/auth/auth.store";
import { PostStore } from "@/stores/post/post.store";

import { TYPES } from "./di-types.config";

const container = new Container({
  defaultScope: "Singleton",
});

container.bind<AuthStore>(TYPES.AuthStore).to(AuthStore);
container.bind<PostStore>(TYPES.PostStore).to(PostStore);

export { container };
