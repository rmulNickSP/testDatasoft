import axios from "axios";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

//เรียกใช้งาน uuid

function Insertproduct() {
    //เรียกข้อมูลจากฐานข้อมูล
    const [datastock, setDatastock] = useState([]);

   useEffect(() => {
        axios.get('http://localhost:5000/show').then((response) => {
            setDatastock(response.data);
        })
    },[])

    //เพิ่มข้อมูลไปยังฐานข้อมูล
    const [nameproduct, setNameproduct] = useState('');
    const [amtproduct, setAmtproduct] = useState(0);

    const postProduct = () => {
        axios.post('http://localhost:5000/insert', {
            IDcode: uuidv4(),
            name: nameproduct,
            amt: amtproduct
        }).then(() => {
            setDatastock([...datastock, { IDcode: uuidv4(), name: nameproduct, amt: amtproduct }])
        })
    }

    //อัพเดทข้อมูลไปยังฐานข้อมูล
    const [idproduct,setIdproduct]=useState('test');
    const [amtupdate,setAmtupdate]=useState(0);

    const putProduct = (idproduct)=>{
        axios.put('http://localhost:5000/updatestock',{amtupdate:amtupdate , idupdate:idproduct}).then((response)=>{
            setDatastock(
                datastock.map((e)=>{
                    return e.IDcode === idproduct?{
                        IDcode:e.IDcode,
                        name:e.name,
                        amt:amtupdate
                    }:e
                })
            )
        })
    }

    const [status,setStatus]=useState();
    //ฟังชั่นเพิ่มหรืออัพเดท
    useEffect(()=>{
        let upamt = 0;
        if (nameproduct !== ''&& amtproduct !==0) {
            
            for (let i = 0; i < datastock.length; i++) {
                if (datastock[i].name === nameproduct) {
                    upamt = Number(amtproduct)+datastock[i].amt ;
                    setIdproduct(datastock[i].IDcode);
                    setAmtupdate(upamt);
                    setStatus('true');
                    break;
                } else {
                    setStatus('false');
                }
            }
        }
    },[nameproduct,amtproduct])

    function chkinbox() {
        if(status==='false'){
            postProduct();
            alert("เพิ่มข้อมูลเรียบร้อยแล้ว!!",window.location.href="/");
        }
        if(status==='true'){
            putProduct(idproduct);
            alert("เพิ่มข้อมูลเรียบร้อยแล้ว!!",window.location.href="/");
        }
    }

    return (
        <>
            <div className="container">
                <h3>เพิ่มข้อมูลสินค้า</h3>
                <div className="information">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">ชื่อสินค้า</label>
                            <input type="text" className="form-control" placeholder="ชื่อสินค้า" required onChange={(event) => { setNameproduct(event.target.value) }}></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">จำนวนสินค้า</label>
                            <input type="number" className="form-control" placeholder="จำนวนสินค้า" required onChange={(event) => { setAmtproduct(event.target.value) }}></input>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => chkinbox()}>เพิ่มสินค้า</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Insertproduct;