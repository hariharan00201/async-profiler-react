import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCollapsedDataAction, getMultiCollapsedDataAction } from '../actions/CollapsedActions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UploadMultiCollapsed = () => {

    // var [selectedFile, setSelectedFile] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [selectedTotalTimeThreshold, setSelectedTotalTimeThreshold] = useState(0.001);
    const [selectedSelfTimeThreshold, setSelectedSelfTimeThreshold] = useState(0.0001);
    var [selectedStart, setSelectedStart] = useState(0);
    var [selectedEnd, setSelectedEnd] = useState(0);
    const dispatch = useDispatch();
    const history = useNavigate();
    const handleSelect = (event) => {
        console.log(event.target.value);
        if(event.target.name === 'start'){
            setSelectedStart(event.target.value)
        }
        else if(event.target.name === 'end')
            setSelectedEnd(event.target.value);
        else if(event.target.name === 'title')
            setSelectedTitle(event.target.value)
        else if(event.target.name === 'filter')
            setSelectedFilter(event.target.value)
        else if(event.target.name === 'totalTimeThreshold')
            setSelectedTotalTimeThreshold(event.target.value)
        else if(event.target.name === 'selfTimeThreshold')
            setSelectedSelfTimeThreshold(event.target.value)
      };

     const handleSubmit =  (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('start', selectedStart);
        formData.append('end', selectedEnd);
        formData.append('filter', selectedFilter);
        formData.append('title', selectedTitle);
        formData.append('totalTimeThreshold', selectedTotalTimeThreshold);
        formData.append('selfTimeThreshold', selectedSelfTimeThreshold);


        dispatch(getMultiCollapsedDataAction(formData))
        history('/collapsed')
    }


    return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col s12 center-align">
                    <h3>Collapsed stack viewer</h3>
                </div>

                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-title">
                                Import from files
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* <div className="file-field input-field col s6">
                                        <div className="btn">
                                            <span>File</span>
                                            <input name="file" type="file" multiple onChange={handleSelect}/>
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path" type="text" placeholder="File to upload"/>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="row">
                                    <div className="file-field input-field col s6">
                                    <input id="start" name="start" type="text" onChange={handleSelect}/>
                                    <input id="end" name="end" type="text" onChange={handleSelect}/>
                                            <button className="btn waves-effect waves-light" type="submit" name="action">
                                                Submit
                                            </button>
                                        
                                    </div>
                                </div>

                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};


export default UploadMultiCollapsed;