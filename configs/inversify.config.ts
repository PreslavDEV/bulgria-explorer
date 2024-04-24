import { Container } from "inversify";

import { AuthStore } from "@/stores/auth/auth.store";

import { TYPES } from "./di-types.config";

const container = new Container({
  defaultScope: "Singleton",
});

container.bind<AuthStore>(TYPES.AuthStore).to(AuthStore);

export { container };
