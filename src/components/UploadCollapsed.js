import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCollapsedDataAction } from '../actions/CollapsedActions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UploadCollapsed = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [selectedTotalTimeThreshold, setSelectedTotalTimeThreshold] = useState(0.001);
    const [selectedSelfTimeThreshold, setSelectedSelfTimeThreshold] = useState(0.0001);
    const dispatch = useDispatch();
    const history = useNavigate();
    const handleSelect = (event) => {
        // console.log(event.target.value);
        if(event.target.name === 'file')
            setSelectedFile(event.target.files[0]);
        else if(event.target.name === 'title')
            setSelectedTitle(event.target.value);
        else if(event.target.name === 'filter')
            setSelectedFilter(event.target.value);
        else if(event.target.name === 'totalTimeThreshold')
            setSelectedTotalTimeThreshold(event.target.value);
        else if(event.target.name === 'selfTimeThreshold')
            setSelectedSelfTimeThreshold(event.target.value);
      };

     const handleSubmit =  (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('title', selectedTitle);
        formData.append('filter', selectedFilter);
        formData.append('totalTimeThreshold', selectedTotalTimeThreshold);
        formData.append('selfTimeThreshold', selectedSelfTimeThreshold);
        dispatch(getCollapsedDataAction(formData))
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
                                    <div className="file-field input-field col s6">
                                        <div className="btn">
                                            <span>File</span>
                                            <input name="file" type="file" onChange={handleSelect}/>
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path" type="text" placeholder="File to upload"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="file-field input-field col s6">
                                        
                                            <button className="btn waves-effect waves-light" type="submit" name="action">
                                                Submit
                                            </button>
                                        
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="title" name="title" type="text" onChange={handleSelect}/>
                                        <label htmlFor="title">
                                            Title (will be visible at every page -
                                            useful if there are multiple windows opened)
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="totalTimeThreshold" name="totalTimeThreshold" onChange={handleSelect} type="text" value="0.001"/>
                                        <label htmlFor="totalTimeThreshold">
                                            Total time threshold (do not show method with total time less than)
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="selfTimeThreshold" name="selfTimeThreshold" onChange={handleSelect} type="text" value="0.0001"/>
                                        <label htmlFor="selfTimeThreshold">
                                            Self time threshold (do not show method with self time less than)
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="filter" name="filter" onChange={handleSelect} type="text"/>
                                        <label htmlFor="filter">
                                            Filter stacks by
                                        </label>
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


export default UploadCollapsed;