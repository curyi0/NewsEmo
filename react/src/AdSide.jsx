import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, MessageOutlined, TeamOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdSide = () => {
  // const {sideLayout} = Layout

  const items = [
    { 
      key: "admin-info",
      icon: <UserOutlined />,
      label: <Link to="/admin/info">관리자 정보</Link>,
    },
    {
      key: "inquiries",
      icon: <MessageOutlined />,
      label: <Link to="/admin/inquiries">문의요청사항</Link>,
    },
    {
      key: "member-management",
      icon: <TeamOutlined />,
      label: <Link to="/admin/members">회원관리</Link>,
    },
  ];

  return (
    // <Layout className="site-layout-background" width={180}>

    <Menu
      mode="inline"
      defaultSelectedKeys={["admin-info"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
      />
      // </Layout>
  );
};
export default AdSide;
