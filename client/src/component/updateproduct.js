import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import  axios from "axios";

function Updateproduct(props) {

    //เช็คค่า props ที่ส่งมา
    if(props.idcodeup === undefined){
        window.location.href="/";
    }

    //กำหนดค่า
    const [dataUpdate,setDataUpdate]=useState([]);
    const [dataToUpId,setDataToUpId]=useState();
    const [nameUpProduct,setNameUpProduct]=useState();
    const [amtUpProduct,setAmtUpProduct]=useState();
    document.addEventListener("load",
    useEffect(()=>{
        setDataUpdate(props.idcodeup)
        setDataToUpId(props.idcodeup.IDcode)
        setNameUpProduct(props.idcodeup.name)
        setAmtUpProduct(props.idcodeup.amt)
    },[]))
    console.log("ค่าที่รับมาจาก App : ",nameUpProduct);

    //คำสั่งอัพเดท
    const updateProduct = (dataToUpId)=>{
        axios.put('http://localhost:5000/updateProduct',{ nameupdate:nameUpProduct,amtupdate:amtUpProduct , idupdate:dataToUpId}).then((response)=>{
            setDataUpdate(
                dataUpdate.map((e)=>{
                    return e.IDcode === dataToUpId?{
                        IDcode:e.IDcode,
                        name:nameUpProduct,
                        amt:amtUpProduct
                    }:e
                })
            )
        })
    }

    return (
        <>
            <h1>Update</h1>
            <div className="container">
                <form>
                <div className="mb-3">
                    <label className="form-label">รหัสสินค้า</label>
                    <input type="text" className="form-control" value={dataToUpId} readOnly />
                </div>
                <div className="mb-3">
                    <label  className="form-label">ชื่อสินค้า</label>
                    <input type="text" className="form-control" value={nameUpProduct} onChange={(e)=>{setNameUpProduct(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">จำนวนสินค้า</label>
                    <input type="number" className="form-control" value={amtUpProduct} onChange={(e)=>{setAmtUpProduct(e.target.value)}}/>
                </div>
                <Link to={'/'}><button type="button" className="btn btn-success me-3" onClick={()=>updateProduct(dataToUpId)}>แก้ไขข้อมูล</button></Link>
                <Link to={'/'}><button type="button" className="btn btn-danger">ยกเลิก</button></Link>
                </form>
            </div>
        </>
    )
}
export default Updateproduct