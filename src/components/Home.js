import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <div className="container">
    <div className="row">
        <div className="col s12 center-align">
            <h3>Profiling toolkit</h3>
        </div>

        <div className="col s12">
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <Link to="upload-stateful-jfr">Stateful JFR file viewer</Link>
                    </div>
                    <div className="row">
                        <Link to="upload-collapsed">Collapsed stack file viewer</Link>
                    </div>
                    <div className="row">
                        <Link to="upload-jfr">Stateless JFR file viewer (deprecated for removal, use stateful one)</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
    );
};



export default Home;