import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DesktopOutlined,
  PieChartOutlined,
  DashboardOutlined,
  OrderedListOutlined,
  AmazonOutlined,
  MergeCellsOutlined,
  TagOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { useSelector } from "react-redux";
import FeatherIcon from "feather-icons-react";

const { Sider } = Layout;
// const {SubMenu} = Menu;
const SideBar = (props) => {
  const { modules } = useSelector(({ auth }) => auth);
  const [path, setPath] = useState("");
  useEffect(() => {
    let abc = window.location.href;
    let pathname = abc.split("/");
    setPath(pathname[3]);
  });
  return (
    path && (
      <Sider
        breakpoint="lg"
        collapsed={props.collapsed}
        onCollapse={props.onCollapse}
      >
        <Menu theme="dark" defaultSelectedKeys={[path]} mode="inline">
          {modules.map((module, key) => (
            <Menu.Item
              key={module.slug}
              icon={<FeatherIcon icon={module.icon} fill="black" size={17} />}
            >
              <Link to={`/${module.slug}`}>{module.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    )
  );
};
export default SideBar;
