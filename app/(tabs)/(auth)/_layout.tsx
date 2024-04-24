import React from "react";

import TabsLayout from "@/components/tabs-layout";
import { AUTH_TABS } from "@/constants/tabs.constants";

export default function AuthTabsLayout() {
  return <TabsLayout tabs={AUTH_TABS} />;
}
