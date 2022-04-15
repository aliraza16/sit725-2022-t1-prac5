import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import React from "react";
import ReactHtmlParser from 'react-html-parser';

export const STORE_BRANDS = 'STORE_BRANDS'
export const ADD_BRAND='ADD_BRAND'
export const EDIT_BRAND='EDIT_BRAND'
export const DELETE_BRAND='DELETE_BRAND'
export const saveBrands = (res) => {
    return {
        type: 'STORE_BRANDS',
        value: res
    }
}
export const editBrand = (res) => {
    return {
        type: 'EDIT_BRAND',
        value: res
    }
}
export const deleteBrand = (res) => {
    return {
        type: 'DELETE_BRAND',
        value: res
    }
}

//Store Collections
export const storeBrands = (token) => {
    return dispatch => {
        axios.get('books',{
            headers:{
                "x-access-token":token
            }
        })
            .then(response => {
                const results = response.data.map(row => ({
                    key: row._id, // I added this line
                    title: row.title,
                    author: row.author,
                    category: row.category,

                }))
                dispatch(saveBrands(results))

            })
    }

}
// save single brand
export const saveBrand = (res) => {
    return {
        type: 'ADD_BRAND',
        value: res
    }
}

