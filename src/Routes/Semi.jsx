import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

//기업 상세 페이지
const Semi = () => {
  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Sider width={240} style={{ background: "#fff", minHeight: "100vh" }}>
        <Sidebar />
      </Sider>
      <Layout>
        <Content style={{ padding: 24, minHeight: '100vh' , background:'#e3e3eeff'}}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Semi;
