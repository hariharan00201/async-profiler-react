import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJFRData, postAndGetJFRData, removeJFRData } from '../actions/StatefulJFRActions';
import { useNavigate } from 'react-router-dom';

const UploadStatefulJFR = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var {data,loading,err} = useSelector((state) => state.jfrData)
    // data = JSON.parse(data);
    useEffect(() => {
        // console.log("jfr")
        dispatch(postAndGetJFRData())
        
    },[])

    const handleSubmit =  (event) => {
        event.preventDefault();
        const formData = new FormData();
        // console.log(selectedFile)
        formData.append('files', selectedFile);
        dispatch(postAndGetJFRData(formData))
        // navigate('/collapsed')
    }

    const handleSelect = (event) => {
        // console.log(event.target.value);
        // if(event.target.name === 'file')
            setSelectedFile(event.target.files[0]);
      };

    const removeFile = (e,id) => {
        e.preventDefault()
        // console.log("remove")
        if(e.target.name === "remove")
        dispatch(removeJFRData("/stateful-jfr/single/remove?id="+id))
        else
        {
            dispatch(getJFRData("/stateful-jfr/single?id="+id))
            navigate('/jfr')
        }
    } 

    return (
        <div>
            {}
            <div className="container">
    <div className="row">
        <div className="col s12 center-align">
            <h3>JFR viewer</h3>
        </div>

        <div className="col s12">
            <form onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-content">
                        <div className="card-title">
                            Files in memory
                        </div>

                        {
                            (data != null) ? (
                                <div className="row">
                            <table className="table table-striped table-bordered table-sm big-font"
                                   style={{width:"100%"}}>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Import date</th>
                                    <th>Imported files</th>
                                    <th>Open</th>
                                    <th>Remove</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        // console.log("idd",data.id);
                                        data.statefulJfrFiles.map((file) => (
                                        <tr key={file.id}>
                                            <td>{file.id}</td>
                                            <td>{file.parseStartDate.seconds}</td>
                                            <td>
                                                <p>{file.filenames[0]}</p>
                                            </td>
                                            <td>
                                                <button name="open" onClick={e => removeFile(e,file.id)}>Open</button>                 
                                            </td>
                                            <td>
                                                <button name="remove" onClick={e => removeFile(e,file.id)}>Remove</button>
                                            </td>
                                        </tr>))
                                    }
                               
                                </tbody>
                            </table>
                        </div>
                            ) : ""
                        }
                    </div>

                    <div className="card-content">
                        <div className="card-title">
                            Import from files
                        </div>

                        <div className="row">
                            <div className="file-field input-field col s6">
                                <div className="btn">
                                    <span>Files</span>
                                    <input name="files" type="file" onChange={handleSelect} multiple/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path" type="text" placeholder="Upload one or more files"/>
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
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
        </div>
    );
};


export default UploadStatefulJFR;