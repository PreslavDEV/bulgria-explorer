import React, { useCallback } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
    (color: string) => <TabBarIcon name="code" color={color} />,
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
