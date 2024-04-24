import React, { useMemo } from "react";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import Tabs, { ITabItem } from "@/components/tabs-layout";
import { TYPES } from "@/configs/di-types.config";
import { AUTH_TABS, COMMON_TABS, USER_TABS } from "@/constants/tabs.constants";
import { AuthStore } from "@/stores/auth/auth.store";

export const TabsLayout = observer(() => {
  const { user } = useInjection<AuthStore>(TYPES.AuthStore);

  const tabs = useMemo(() => {
    let userTabs: ITabItem[] = [];
    let authTabs: ITabItem[] = [];
    if (user) {
      userTabs = USER_TABS.map((tab) => ({
        ...tab,
        options: { href: tab.name },
      }));
      authTabs = AUTH_TABS.map((tab) => ({
        ...tab,
        options: { href: null },
      }));
    } else {
      authTabs = AUTH_TABS.map((tab) => ({
        ...tab,
        options: { href: tab.name },
      }));
      userTabs = USER_TABS.map((tab) => ({
        ...tab,
        options: { href: null },
      }));
    }

    return [...COMMON_TABS, ...authTabs, ...userTabs];
  }, [user]);

  return <Tabs tabs={tabs} />;
});

export default TabsLayout;
