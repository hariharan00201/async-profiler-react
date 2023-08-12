import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Jfr from './Jfr';

const JfrHelper = () => {
    
    var {data,loading,err} = useSelector((state) => state.jfrViewData)
    useEffect(()=>{

    },[data,loading,err])
    return (
        <div>
            {
                (loading === false && data != null ? <Jfr jfrdata = {data}/> : "Loading")
            }
        </div>
    );
};


export default JfrHelper;