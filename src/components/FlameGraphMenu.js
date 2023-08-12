import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFlameDataAction } from '../actions/FlameActions';
import { useNavigate } from 'react-router-dom';

const FlameGraphMenu = ({Data}) => {
    const [data,setData] = useState(Data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useState(() => {
        // console.log("FGM");
    },[data,Data]);

    const buttonHandler = (event) => {
        dispatch(getFlameDataAction(event.target.name));
        navigate("/flame"+event.target.name)
    }


    return (
        <div>
            <h1>{data.fullName}</h1>
            <table>
                <thead>
                <b><tr>{data.pageContents[0].header[0]}</tr></b>
                </thead>
                <tbody>
                    {/* data.pageContents[0].table[0][0].href */
                        data.pageContents[0].table.map((element) => 
                             (<tr key={element[0].href}>
                                <button name = {element[0].href} onClick={buttonHandler}>{element[0].description}</button>
                             </tr>) 
                        )
                    }
                    {/* {
                        axios.get("http://localhost:8079"+data.pageContents[0].table[0][0].href).then(
                            (response) => console.log("flamedata",response.data)
                        )
                    } */}
                </tbody>
            </table>
        </div>
    );
};


export default FlameGraphMenu;