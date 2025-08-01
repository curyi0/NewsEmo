import AdSide from "./AdSide"
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const Admin = () => {
  return (
    <>
      <h3 style={{textAlign:"center", fontFamily:"'Noto Sans KR', sans-serif"}}>관리자 전용 페이지 입니다.</h3>
      <Layout style={{height:"100vh", width:"180px"}}>
        <AdSide/>
        <Outlet/>
      </Layout>
    </>
  );
};
export default Admin;
