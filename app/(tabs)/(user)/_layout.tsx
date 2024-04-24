import React from "react";

import TabsLayout from "@/components/tabs-layout";
import { USER_TABS } from "@/constants/tabs.constants";

export default function UserTabsLayout() {
  return <TabsLayout tabs={USER_TABS} />;
}
