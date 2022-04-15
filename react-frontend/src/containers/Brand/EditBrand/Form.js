import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {Form, Input, Row, Col, message} from 'antd';
import Uploader from "../../../components/ImageUploader/Uploader";
import axios from "axios";
const {TextArea} = Input
import { connect } from "react-redux";

const DynamicRule = forwardRef((props, ref) => {
    const [form] = Form.useForm();
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        form.setFieldsValue({
            title: props.brand.title,
            author: props.brand.author,
            category: props.brand.category,
        })
        setTitle(props.brand.title)
        setAuthor(props.brand.author)
        setCategory(props.brand.category)
    }, [props.brand]);
    useImperativeHandle(
        ref,
        () => ({
            async showAlert() {
                try {
                    const values = await form.validateFields();
                    let brand = new FormData()
                    let id = props.brand.id
                    brand.append('title', title)
                    brand.append('author', author)
                    brand.append('category', category)
                    props.setloader()
                    axios.put('books/' + id, brand, {
                        headers: {
                            'x-access-token': this.props.token
                        }
                    }).then(response => {
                        props.getBrands()
                        props.setloader()
                        props.cancelDrawer()
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

            }
        }),
    )

    return (
        <Form form={form} layout="vertical">
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="title"
                        label="title"
                        rules={[{required: true, message: 'Please enter brand name'}]}
                    >
                        <Input onChange={e => setTitle(e.target.value)} value={props.brand.title}
                               placeholder="Please enter user name"/>
                    </Form.Item>
                    <Form.Item
                        name="author"
                        label="Author"
                        rules={[{required: true, message: 'Please enter brand name'}]}
                    >
                        <Input onChange={e => setAuthor(e.target.value)} value={props.brand.author}
                               placeholder="Please enter user name"/>
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{required: true, message: 'Please enter brand name'}]}
                    >
                        <Input onChange={e => setCategory(e.target.value)} value={props.brand.category}
                               placeholder="Please enter user name"/>
                    </Form.Item>

                </Col>
            </Row>
        </Form>
    );
});
const mapStateToProps = (state) => {
    return {
        brands: state.brands.brands,
        auth: state.auth.auth,
    };
};
export default connect(mapStateToProps) (DynamicRule)
