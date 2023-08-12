import './App.css';
import Home from './components/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UploadCollapsed from './components/UploadCollapsed';
import Collapsed from './components/Collapsed';
import Trial from './components/Trial';
import FlameGraph from './components/FlameGraph';
import UploadStatefulJFR from './components/UploadStatefulJFR';
import JfrHelper from './components/JfrHelper';
import UploadMultiCollapsed from './components/UploadMultiCollapsed';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" index element={<Home/>} />
        <Route path="/upload-collapsed" element={<UploadCollapsed/>} />
        <Route path="/collapsed" element={<Collapsed/>} />
        <Route path="/flame/:id" element={<FlameGraph/>} />
        <Route path="/upload-stateful-jfr" element={<UploadStatefulJFR/>} />
        <Route path="/jfr" element={<JfrHelper />} />
        <Route path='/uploadMultiCollapsed' element={<UploadMultiCollapsed/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
