import React, { useContext, useMemo } from "react";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react-lite";

import Tabs, { ITabItem } from "@/components/tabs-layout";
import { TYPES } from "@/configs/di-types.config";
import { AUTH_TABS, COMMON_TABS, USER_TABS } from "@/constants/tabs.constants";
import { DictContext } from "@/providers/dictionary/dictionary.provider";
import { AuthStore } from "@/stores/auth/auth.store";

export const TabsLayout = observer(() => {
  const { user } = useInjection<AuthStore>(TYPES.AuthStore);
  const { tabs: tabsDict } = useContext(DictContext);

  const tabs = useMemo(() => {
    let userTabs: ITabItem[] = [];
    let authTabs: ITabItem[] = [];
    if (user) {
      userTabs = USER_TABS.map((tab) => ({
        ...tab,
        title: tabsDict[tab.title],
        options: { href: tab.name },
      }));
      authTabs = AUTH_TABS.map((tab) => ({
        ...tab,
        title: tabsDict[tab.title],
        options: { href: null },
      }));
    } else {
      authTabs = AUTH_TABS.map((tab) => ({
        ...tab,
        title: tabsDict[tab.title],
        options: { href: tab.name },
      }));
      userTabs = USER_TABS.map((tab) => ({
        ...tab,
        title: tabsDict[tab.title],
        options: { href: null },
      }));
    }

    const commonTabs = COMMON_TABS.map((tab) => ({
      ...tab,
      title: tabsDict[tab.title],
    }));

    return [...commonTabs, ...authTabs, ...userTabs];
  }, [tabsDict, user]);

  return <Tabs tabs={tabs} />;
});

export default TabsLayout;
