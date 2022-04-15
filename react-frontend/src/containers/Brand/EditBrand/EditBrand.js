import {React, Component} from 'react'
import {Drawer, Button, Spin, Col, Row, Input, message} from 'antd';
import axios from "axios";
import {connect} from 'react-redux'
import * as actionCreators from "../../../store/actions/brandActions";
import {Form} from 'antd';

import MediaQuery from 'react-responsive'

const {TextArea} = Input

class EditBrand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            title: '',
            author: '',
            loading: false,
            category: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getBrands = this.getBrands.bind(this);
    }
    triggerChildAlert(){
        try {
            let brand = new FormData()
            let id = this.props.brand.key
            brand.append('title', this.state.title)
            brand.append('author', this.state.author)
            brand.append('category', this.state.category)
            this.setState({loading:true})
            axios.put('books/' + this.props.brandId, brand, {
                headers: {
                    'x-access-token': this.props.auth.accessToken
                }
            }).then(response => {
                this.props.dispatch(actionCreators.storeBrands())
                this.setState(
                    {loading:!this.state.loading})
                this.props.cancel()
                message.success('Brand updated successfully.');
            }).catch(error => {
                let errors = error.response.data;
                if (errors.errors[0].param == 'name') {
                    message.error(errors.errors[0].msg);
                }
            })

        } catch (errorInfo) {
            console.log(errorInfo)
            // if (errorInfo.errorFields[0]) {
            //     message.error('Failed:', errorInfo.errorFields[0].errors[0]);
            //
            // }
        }
        // this.refs.child.showAlert();
    }
    getBrands(){
        this.props.dispatch(actionCreators.storeBrands(this.props.auth.accessToken))
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible});
            if (this.props.brandId) {
                if (!this.props.brand || (this.props.brand && this.props.brandId !== this.props.brand.id)) {
                    axios.get('books/' + this.props.brandId,{
                        headers:{
                            "x-access-token":this.props.token
                        }
                    })
                        .then(response => {
                            this.setState({
                                title: response.data.title,
                                author: response.data.author,
                                category: response.data.category
                            })
                            this.props.dispatch(actionCreators.editBrand(response.data))

                        })
                }
            }
        }

    }
    setLoaderState(){
        this.setState(
            {loading:!this.state.loading})
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }


    render() {
        let brand = ""

        if (this.props.brand) {
            brand = (<>

            <MediaQuery minWidth={1224}>
                <Drawer
                    title="Edit Book"
                    width={720}
                    onClose={this.props.cancel}
                    visible={this.state.visible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.props.cancel} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button type="primary" loading={this.state.loading} onClick={this.triggerChildAlert.bind(this)}>
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form  layout="vertical">
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="title"
                                    label="title"
                                    rules={[{required: true, message: 'Please enter brand name'}]}
                                >
                                    <Input onChange={this.handleInputChange} value={this.props.brand.title}
                                           placeholder="Please enter user name"/>
                                </Form.Item>
                                <Form.Item
                                    name="author"
                                    label="Author"
                                    rules={[{required: true, message: 'Please enter brand name'}]}
                                >
                                    <Input   onChange={this.handleInputChange} value={this.props.brand.author}
                                           placeholder="Please enter user name"/>
                                </Form.Item>
                                <Form.Item
                                    name="category"
                                    label="Category"
                                    rules={[{required: true, message: 'Please enter brand name'}]}
                                >
                                    <Input onChange={this.handleInputChange} value={this.props.brand.category}
                                           placeholder="Please enter user name"/>
                                </Form.Item>

                            </Col>
                        </Row>
                    </Form>
                    {/*<Form ref="child"*/}
                    {/*      getBrands={this.getBrands.bind(this)}*/}
                    {/*      cancelDrawer={this.props.cancel}*/}
                    {/*      setloader={this.setLoaderState.bind(this)}*/}
                    {/*      brandId={this.props.brand.id}*/}
                    {/*      brand={this.props.brand} />*/}

                </Drawer>
                </MediaQuery>
            </>)
        }
        return brand
    }
}

const mapStateToProps = state => {
    return {
        brand: state.brands.brand,
        auth: state.auth.auth,
    }

}
export default connect(mapStateToProps)(EditBrand)
