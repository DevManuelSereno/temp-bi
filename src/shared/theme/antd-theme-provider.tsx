"use client";

import { ConfigProvider, theme as antdTheme } from "antd";
import ptBR from "antd/locale/pt_BR";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useMemo } from "react";

interface AntdThemeProviderProps {
  children: ReactNode;
}

const LIGHT_TOKENS = {
  colorPrimary: "#902828",
  colorSuccess: "#3D8B5A",
  colorWarning: "#C98A2E",
  colorError: "#C93B3B",
  colorBgBase: "#F4F4EF",
  colorBgContainer: "#FFFFFF",
  colorTextBase: "#272725",
  colorBorder: "#D6D2C8",
  borderRadius: 14,
  fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
} as const;

const DARK_TOKENS = {
  colorPrimary: "#B89050",
  colorSuccess: "#5BAF7A",
  colorWarning: "#D4A853",
  colorError: "#E05555",
  colorBgBase: "#121212",
  colorBgContainer: "#1E1F22",
  colorTextBase: "#EDEBE6",
  colorBorder: "#2C2D30",
  borderRadius: 14,
  fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
} as const;

export function AntdThemeProvider({ children }: AntdThemeProviderProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const config = useMemo(
    () => ({
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: isDark ? DARK_TOKENS : LIGHT_TOKENS,
      cssVar: { key: "capone" },
    }),
    [isDark],
  );

  return (
    <ConfigProvider locale={ptBR} theme={config}>
      {children}
    </ConfigProvider>
  );
}
