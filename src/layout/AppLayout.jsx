import { Layout } from "antd";
import { AppHeader } from "./AppHeader";
import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
