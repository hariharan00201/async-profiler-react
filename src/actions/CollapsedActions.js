import {POST_COLLAPSED_DATA_FAILED, POST_COLLAPSED_DATA_STARTED, POST_COLLAPSED_DATA_SUCCESS } from "../constants/CollapsedConstants"
import axios from 'axios';

export const getCollapsedDataAction =  (formData = null) => async (dispatch) => {
    // console.log(formData)
    dispatch({
        type : POST_COLLAPSED_DATA_STARTED
    })
    await axios.post('http://localhost:8079/upload-collapsed', formData).then((response) => {
        //   console.log(response.data);
          
        //   window.localStorage.setItem("file",response.data);
        dispatch({
            type : POST_COLLAPSED_DATA_SUCCESS,
            payload : response.data
        })

        }).catch(err => {
            dispatch({
                type : POST_COLLAPSED_DATA_FAILED,
                payload : err
            })
        });

}

export const getMultiCollapsedDataAction =  (formData) => async (dispatch) => {
    // console.log(formData)
    dispatch({
        type : POST_COLLAPSED_DATA_STARTED
    })
    await axios.post('http://localhost:8079/upload-multi-collapsed', formData).then((response) => {
          console.log(response.data);
          
        //   window.localStorage.setItem("file",response.data);
        dispatch({
            type : POST_COLLAPSED_DATA_SUCCESS,
            payload : response.data
        })

        }).catch(err => {
            dispatch({
                type : POST_COLLAPSED_DATA_FAILED,
                payload : err
            })
        });

}