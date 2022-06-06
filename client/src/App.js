import './App.css';
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom"
import Showproduct from './component/showproduct';
import Insertproduct from './component/insertproduct';
import Updateproduct from './component/updateproduct';
import { useState } from 'react';
import Fileupload from './component/fileupload';

function App() {

  //รับค่าprops 
  const [idup,setIdup]=useState();
  const upid = (e)=>{
    setIdup(e);
  }

  return (
    <Router>
      <div className="App container">
        <div className='row align-items-start'>
          <h1>TEST</h1>
          <hr></hr>
          <div className='col'>
            <Link to='/AddProduct' ><button className='btn btn-secondary mb-3'>เพิ่มข้อมูลสินค้า</button></Link>
          </div>
          <div className='col'>
            <Link to='/' > <button className='btn btn-secondary mb-3'>ดูข้อมูลสินค้า</button></Link>
          </div>
          <div className='col'>
            <Link to='/Fileupload' > <button className='btn btn-secondary mb-3'>โปรแกรมไฟล์รูป</button></Link>
          </div>
          <hr></hr>
        </div>
        <Routes>
          <Route path='/' element={<Showproduct id={upid}></Showproduct>}></Route>
          <Route path='/AddProduct' element={<Insertproduct></Insertproduct>}></Route>
          <Route path='/UpdateProduct' element={<Updateproduct idcodeup={idup}></Updateproduct>}></Route>
          <Route path='/Fileupload' element={<Fileupload></Fileupload>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
