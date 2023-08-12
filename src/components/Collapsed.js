import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Home from './Home';
import FlameGraphMenu from './FlameGraphMenu';

const Collapsed = () => {
    const {data,loading,err} = useSelector((state) => state.collapsedData)
    useEffect(() => {

    },[data,loading,err])
    
    return (
        <div>
            {
                loading != null && data != null  ?  
                (<FlameGraphMenu Data = {data[0]}/>)
                 : "Loading..."
            }
            
        </div>
    );
};


export default Collapsed;