import axios from 'axios';
import { GET_FLAME_DATA_FAILED, GET_FLAME_DATA_STARTED, GET_FLAME_DATA_SUCCESS } from '../constants/FlameConstants';

export const getFlameDataAction =  (url = null) => async (dispatch) => {
    console.log(url)
    dispatch({
        type : GET_FLAME_DATA_STARTED
    })
    dispatch({
                type : GET_FLAME_DATA_SUCCESS,
                payload : url
            })

    // await axios.get('http://localhost:8079'+url).then((response) => {
    //       console.log(response.data);
          
    //     //   window.localStorage.setItem("file",response.data);
    //     dispatch({
    //         type : GET_FLAME_DATA_SUCCESS,
    //         payload : response.data
    //     })

    //     }).catch(err => {
    //         dispatch({
    //             type : GET_FLAME_DATA_FAILED,
    //             payload : err
    //         })
    //     });

}