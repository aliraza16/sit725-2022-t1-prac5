import { React, Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, message, Switch } from "antd";
import Uploader from "../../../components/ImageUploader/Uploader";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/brandActions";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import MediaQuery from 'react-responsive'
import ReactHtmlParser from 'react-html-parser';

const { TextArea } = Input;

class NewBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      title: "",
      author: "",
      category: "",

    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({ visible: this.props.visible });
    }
  }

  onChange = (value) => {
    this.setState({
      isPopular: value,
    });
  };
  postBrandHandler = () => {
    let brand = new FormData();
    brand.append("title", this.state.title);
    brand.append("author", this.state.author);
    brand.append("category", this.state.category);
    this.setState({
      loading: true,
    });
    axios.post("books", brand,{
        headers:{
          "x-access-token":this.props.token
        }
      })
      .then((response) => {
        const result = {
          key: response.data._id, // I added this line
          title: ReactHtmlParser(response.data.title),
          author: ReactHtmlParser(response.data.author),
          category: ReactHtmlParser(response.data.category),

        };
        this.props.dispatch(actionCreators.saveBrand(result));
        this.setState({
          loading: false,
        });
        message.success("Book added successfully.");
        this.props.cancel();
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        message.error("Unable to create Brand."+(<br/>)+error);
      });
  };
  saveImage = (image) => {
    this.setState({
      logo: image,
    });
  };
  render() {
    return (
      <>
        <MediaQuery minWidth={750}>
          <Drawer
            title="Create a new Brand"
            width={720}
            onClose={this.props.cancel}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Button onClick={this.props.cancel} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button
                  onClick={this.postBrandHandler}
                  loading={this.state.loading}
                  type="primary"
                >
                  Submit
                </Button>
              </div>
            }
          >
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      { required: true, message: "Please enter book title" },
                    ]}
                  >
                    <Input
                      value={this.state.title}
                      name="title"
                      onChange={this.handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="author"
                    label="Author"
                    rules={[{ message: "Please enter book author" }]}
                  >
                    <Input
                        value={this.state.author}
                        name="author"
                        onChange={this.handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item
                      name="category"
                      label="Category"
                      rules={[{ message: "Please enter book category" }]}
                  >
                    <Input
                        value={this.state.category}
                        name="category"
                        onChange={this.handleInputChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
        </MediaQuery>

        <MediaQuery maxWidth={750}>
          <Drawer
            title="Create a new Brand"
            width={350}
            onClose={this.props.cancel}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Button onClick={this.props.cancel} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button
                  onClick={this.postBrandHandler}
                  loading={this.state.loading}
                  type="primary"
                >
                  Submit
                </Button>
              </div>
            }
          >
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "Please enter brand name" },
                    ]}
                  >
                    <Input
                      value={this.state.name}
                      name="name"
                      onChange={this.handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ message: "Please enter brand description" }]}
                  >
                    <TextArea
                      onChange={this.handleInputChange}
                      value={this.state.description}
                      name="description"
                      rows={4}
                    />
                  </Form.Item>
                  <Form.Item label="Popular">
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      onChange={(e) => this.onChange(e)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Uploader saveImage={this.saveImage} />
            </Form>
          </Drawer>
        </MediaQuery>
      </>
    );
  }
}

export default connect()(NewBrand);
