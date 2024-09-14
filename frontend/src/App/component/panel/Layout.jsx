import React, { useState, useEffect } from "react";
import { Link, useLocation , NavLink } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "../../../assets/layout.css";
import { Button, Divider, Layout, Menu, Drawer } from "antd";
import SidebarLinks from "../../../helpers/constants/SideBarLinks";
import { useAuth } from "../../../context/auth.context";
import { useTheme } from "../../../context/theme.context";
import { _useAuth } from "../../../action/_useAuth";
import Footer from '../common/Footer' 
const { Header, Content,Sider } = Layout;

const useActive = (pathItem, location, theme) => {
  const isActive = pathItem === location;
  return isActive
    ? { backgroundColor: theme?.primary, color: theme?.secondary }
    : {};
};

const LayoutRes = ({ children }) => {
  const [ auth ] = useAuth();
  const role = auth?.user?.role;
  const { theme } = useTheme();
  const { handleLogout } = _useAuth();
  const NavLinks = SidebarLinks();
  const location = useLocation();
  const cLocation = location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // console.log("layout", auth);
  return (
    <Layout className="h-100vh cnt" style={{ height: "100vh" }}>
      <Layout>
        {!isMobile && (
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            collapsible
            collapsed={collapsed}
            onCollapse={toggleCollapsed}
            trigger={null}
            style={{
              overflow: "hidden",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
            theme="light">
            <div className="demo-logo-vertical" />
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[location.pathname]}>
              <Menu.Item className="text-dark fs-4">Ticketing App</Menu.Item>
              <hr className="m-2" />
              {NavLinks?.map((x, i) => (
                <React.Fragment key={i}>
                  {x.gap && (
                    <Divider orientation="left">
                      <small>{x?.cat}</small>
                    </Divider>
                  )}
                  {x.name === "Logout" ? (
                    <div onClick={handleLogout}>
                      <Menu.Item
                        icon={x.icon}
                        key={x?.name}
                        className="p-2"
                        style={useActive(x.path, cLocation, theme)}>
                        {x.name}
                        {x?.title}
                      </Menu.Item>
                    </div>
                  ) : (
                    <NavLink to={x.path} className="text-decoration-none" >
                      <Menu.Item
                        icon={x.icon}
                        key={x?.name}
                        className="p-2 text-decoration-none"
                        style={useActive(x.path, cLocation, theme)}
                        >
                        {x.name}
                        {x?.title}
                      </Menu.Item>
                    </NavLink>
                  )}
                </React.Fragment>
              ))}
            </Menu>
          </Sider>
        )}
        {isMobile && (
          <Drawer
            title="Menu"
            placement="left"
            onClose={toggleDrawer}
            visible={drawerVisible}
            className="drawer-menu">
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[location.pathname]}>
              {NavLinks?.map((x, i) => (
                <React.Fragment key={i}>
                  {x.gap && (
                    <Divider orientation="left">
                      <small>{x?.cat}</small>
                    </Divider>
                  )}
                  {x.name === "Logout" ? (
                    <div onClick={handleLogout}>
                      <Menu.Item
                        icon={x.icon}
                        key={x?.name}
                        className="p-2"
                        style={useActive(x.path, cLocation, theme)}>
                        {x.name}
                        {x?.title}
                      </Menu.Item>
                    </div>
                  ) : (
                    <NavLink to={x.path} className="text-decoration-none" >
                      <Menu.Item
                        icon={x.icon}
                        key={x?.name}
                        className="p-2"
                        style={useActive(x.path, cLocation, theme)}>
                        {x.name}
                        {x?.title}
                      </Menu.Item>
                    </NavLink>
                  )}
                </React.Fragment>
              ))}
            </Menu>
          </Drawer>
        )}
        <Layout
          style={{
            marginLeft: isMobile ? 0 : 200,
          }}>
          <Header
            className="main-header"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1999,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              padding: 0,
              background: "#fff",
              color: "#000",
            }}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={toggleDrawer}
                className="collapse-button"
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                  background: "#fff",
                  color: "#000",
                }}
              />
            )}
            <div className="text-capitalize mx-4 fs-5 text-dark">
              Welcome {auth?.user?.name}
            </div>
          </Header>

          <Content
            style={{
              height: "auto",
              backgroundColor: "#fff",
              boxSizing: "border-box",
              overflow: "initial",
            }}
            className="py-2 px-5">
            {children}
            <div className="mt-5 mb-5"> <br/> </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutRes;
