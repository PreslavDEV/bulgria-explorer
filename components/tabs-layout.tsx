import React, { useCallback } from "react";
import { Tabs } from "expo-router";

import Colors from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";

import Icon from "./ui/icon/icon";

interface ITabItem {
  name: string;
  title: string;
}

interface ITabsLayoutProps {
  tabs: ITabItem[];
}

export default function TabsLayout(props: ITabsLayoutProps) {
  const { tabs } = props;
  const colorScheme = useColorScheme();

  const renderTabBarIcon = useCallback(
    (color: string) => (
      <Icon name="code" color={color} style={{ marginBottom: -3 }} />
    ),
    [],
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
      }}
    >
      {tabs.map(({ name, title }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => renderTabBarIcon(color),
            // headerRight: () => renderHeaderRight(),
          }}
        />
      ))}
    </Tabs>
  );
}
