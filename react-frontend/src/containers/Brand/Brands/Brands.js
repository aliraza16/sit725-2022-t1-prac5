import { Component, React } from "react";
import { connect } from "react-redux";
import { Button, Layout, message, Space, Switch, Table } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import NewBrand from "../NewBrand/NewBrand";
import EditBrand from "../EditBrand/EditBrand";
import DeletePop from "../../../components/PopConfirm/PopConfirm";
import * as actionCreators from "../../../store/actions/brandActions";
import "./Brands.css";
import axios from "axios";
import MediaQuery from 'react-responsive'


const { Column } = Table;
const { Content } = Layout;

class Brands extends Component {
  state = {
    visible: false,
    editVisible: false,
    brandId: null,
    brands: [],
    auth: [],
  };

  componentDidMount() {
    console.log(this.props.auth)
    this.props.dispatch(actionCreators.storeBrands(this.props.auth.accessToken));
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  editShowDrawer = (id) => {
    this.setState({
      editVisible: true,
      brandId: id,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  editOnClose = () => {
    this.setState({
      editVisible: false,
    });
  };
  deleteBrand = (id) => {
    axios
      .delete("books/" + id,{headers:{
        "x-access-token":this.props.auth.accessToken
        }})
      .then((response) => {
        this.props.dispatch(actionCreators.deleteBrand(id));
        message.success("Book deleted successfully.");
      })
      .catch((error) => {
        message.error("Something went wrong");
      });
  };
  render() {
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >

            <Button className="Button" type="primary" onClick={this.showDrawer}>
              <PlusOutlined /> Create Book
            </Button>

          <Table dataSource={this.props.brands}>
            <Column
              className="Responsive-1224"
              title="Sr #"
              dataIndex="key"
              key="key"
            />
            <Column title="Name" dataIndex="title" key="title" />
            <Column title="Author" dataIndex="author" key="author" />
            <Column title="Category" dataIndex="category" key="category" />

              <>

                <Column
                  title="Action"
                  dataIndex="key"
                  key="action"
                  render={(key) => (
                    <Space size="middle">

                      <MediaQuery minWidth={1224}>
                        <Button
                          shape="round"
                          icon={<EditOutlined />}
                          onClick={() => this.editShowDrawer(key)}
                          size="medium"
                        >
                          Edit Brand
                        </Button>
                      </MediaQuery>

                      <MediaQuery maxWidth={1224}>
                        <Button
                          shape="round"
                          icon={<EditOutlined />}
                          onClick={() => this.editShowDrawer(key)}
                          size="medium"
                        >

                        </Button>
                      </MediaQuery>

                      <DeletePop
                        name="Brand"
                        deleteHandler={() => {
                          this.deleteBrand(key);
                        }}
                      />
                    </Space>
                  )}
                />
              </>
          </Table>
          <NewBrand token={this.props.auth.accessToken} visible={this.state.visible} cancel={this.onClose} />
          <EditBrand
              token={this.props.auth.accessToken}
            visible={this.state.editVisible}
            brandId={this.state.brandId}
            cancel={this.editOnClose}
          />
        </div>
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.brands.brands,
    auth: state.auth.auth,
  };
};
export default connect(mapStateToProps)(Brands);
