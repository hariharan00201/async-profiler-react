import axios from 'axios';
import { GET_JFR_DATA_FAILED, GET_JFR_DATA_STARTED, GET_JFR_DATA_SUCCESS, POST_JFR_DATA_FAILED, POST_JFR_DATA_STARTED, POST_JFR_DATA_SUCCESS } from '../constants/UploadStatefulJFRConstants';

export const postAndGetJFRData =  (formData = null) => async (dispatch) => {

    dispatch({
        type : POST_JFR_DATA_STARTED
    })
    if(formData != null)
    {
        await axios.post('http://localhost:8079/upload-stateful-jfr', formData).then((response) => {
        //   console.log(response.data);
          
        //   window.localStorage.setItem("file",response.data);
        dispatch({
            type : POST_JFR_DATA_SUCCESS,
            payload : response.data
        })

        }).catch(err => {
            dispatch({
                type : POST_JFR_DATA_FAILED,
                payload : err
            })
        });
    }
    else{
        // console.log("Entered")
        await axios.get('http://localhost:8079/upload-stateful-jfr').then((response) => {
        //   console.log(response.data);
          
        //   window.localStorage.setItem("file",response.data);
        dispatch({
            type : POST_JFR_DATA_SUCCESS,
            payload : response.data
        })

        }).catch(err => {
            dispatch({
                type : POST_JFR_DATA_FAILED,
                payload : err
            })
        });
    }

}

export const removeJFRData =  (url = null) => async (dispatch) => {

    dispatch({
        type : POST_JFR_DATA_STARTED
    })
    // console.log("url",url);
    await axios.get('http://localhost:8079'+url).then((response) => {
        //   console.log("data",response.data);
          
        //   window.localStorage.setItem("file",response.data);
        dispatch({
            type : POST_JFR_DATA_SUCCESS,
            payload : response.data
        })

        }).catch(err => {
            dispatch({
                type : POST_JFR_DATA_FAILED,
                payload : err
            })
        });

}

export const getJFRData =  (url = null) => async (dispatch) => {

    dispatch({
        type : GET_JFR_DATA_STARTED
    })
    // console.log("url",url);
    await axios.get('http://localhost:8079'+url).then((response) => {
        //   console.log("data",response.data);
          
        //   window.localStorage.setItem("file",response.data);
        dispatch({
            type : GET_JFR_DATA_SUCCESS,
            payload : response.data
        })

        }).catch(err => {
            dispatch({
                type : GET_JFR_DATA_FAILED,
                payload : err
            })
        });

}