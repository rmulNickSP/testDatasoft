import { useEffect, useState } from "react";
import axios from 'axios';
import _ from 'lodash';
import { Link } from "react-router-dom";

function Showproduct(props) {

    //ดึงค่าข้อมูลจากฐานข้อมูล
    const [datastock, setDatastock] = useState([]);

    //ทำเพจจิเนชั่น มีการใช้ lodash
    const pagesize = 3;
    const pagecount = datastock ? Math.ceil(datastock.length / pagesize) : 0;
    const pages = _.range(1, pagecount + 1);
    const [paginationStock, setPaginationStock] = useState([]);
    const [currentPage,setCurrentPage]=useState(1);

    useEffect(() => {
        axios.get('http://localhost:5000/show').then((response) => {
            setDatastock(response.data);
            setPaginationStock(_(response.data).slice(0).take(pagesize).value())
        })
    }, [])

    const paginationchk=(numberpage)=>{
        setCurrentPage(numberpage);
        const startIndex = (numberpage-1)*pagesize;
        const pagePost =_(datastock).slice(startIndex).take(pagesize).value();
        setPaginationStock(pagePost);
    }

    //แมตค่าเพื่อแสดงข้อมูลที่ค้นหา
    const [searchProduct, setSearchProduct] = useState('');
    const [searchResultProduct, setSearchResultProduct] = useState([]);
    const [statusSearch, setStatusSearch] = useState('true');

    useEffect(() => {
        if (searchProduct !== '') {
            for (let i = 0; i < datastock.length; i++) {
                if (searchProduct === datastock[i].name) {
                    setSearchResultProduct(datastock[i])
                    break
                }
                if (searchProduct === datastock[i].IDcode) {
                    setSearchResultProduct(datastock[i])
                    break
                }
            }
        } else {
            setStatusSearch("true")
        }
    }, [searchProduct])

    function chkresult() {
        setStatusSearch("false");
    }

    //ลบข้อมูล
    const deleteProduct = (idProduct) => {
        axios.delete(`http://localhost:5000/deleteproduct/${idProduct}`).then((response) => {
            setDatastock(
                datastock.filter((e) => {
                    return e.IDcode != idProduct;
                })
            )
        })
        alert("ลบข้อมูลเรียบร้อยแล้ว!!",window.location.href="/");
    }

    //การทำงานของการสั่งซื้อสินค้า
    const [datasale, setDatasale] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/showsale').then((response) => {
            setDatasale(response.data);
        })
    }, [])

    const [saleData, setSaleData] = useState([]);
    const [amontSale, setAmontSale] = useState('');
    const [reAmtUpdate, setReAmtUpdate] = useState();
    const d = new Date();
    const calID = datasale.length + 1
    const today = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    const time = `${d.getHours()}:${d.getMinutes()}`
    const idBill = `${calID}-${today}`

    //เช็คและคำนวนจำนวนคงเหลือ
    useEffect(() => {
        if (amontSale !== '') {
            setReAmtUpdate(saleData.amt - amontSale)
        }
    }, [amontSale])

    //การเพิ่มข้อมูล
    const insertSale = () => {
        axios.post("http://localhost:5000/insertSale", {
            docno: idBill,
            date: today,
            time: time,
            IDcode: saleData.IDcode,
            name: saleData.name,
            amt: amontSale
        }).then(() => {
            setDatasale([...datasale, {
                docno: idBill,
                date: today,
                time: time,
                IDcode: saleData.IDcode,
                name: saleData.name,
                amt: amontSale
            }])
        })
    }

    //การอัพเดทข้อมูล
    const putProduct = (idproduct) => {
        axios.put('http://localhost:5000/updatestock', { amtupdate: reAmtUpdate, idupdate: idproduct }).then((response) => {
            setDatastock(
                datastock.map((e) => {
                    return e.IDcode === idproduct ? {
                        IDcode: e.IDcode,
                        name: e.name,
                        amt: reAmtUpdate
                    } : e
                })
            )
        })
    }

    //ฟังชั่นที่จะทำงานกับปุ่มใน modal
    function salechk() {
        insertSale()
        putProduct(saleData.IDcode)
        window.location.href="/";
    }

    function canclechk() {
        setAmontSale('');
    }

    return (
        <>
            <div className="container">
                <h1>Product</h1>
                <div className='col-md-5 mx-auto'>
                    <form className='mb-5'>
                        <div className=' input-group'>
                            <input type="text" className='form-control' onChange={(event) => { setSearchProduct(event.target.value) }}></input>
                            <button type='button' className='btn btn-block btn-primary' onClick={chkresult}>Search</button>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="row align-items-center">
                        {
                            statusSearch === 'true' ?
                                paginationStock.map((data, index) => (
                                    <div className="col" key={index}>
                                        <h5>รหัสสินค้า : {data.IDcode}</h5>
                                        <h5>ชื่อสินค้า : {data.name}</h5>
                                        <h6>จำนวนสินค้าที่มี : {data.amt}</h6>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#saleproduct" onClick={() => { setSaleData(data) }}>
                                            สั่งซื้อสินค้า
                                        </button>
                                        <p></p>
                                        <Link to={'/UpdateProduct'} onClick={() => props.id(data)}><button type="button" className="btn btn-warning">แก้ไข</button></Link>
                                        <p></p>
                                        <button type="button" className="btn btn-danger mb-3" onClick={() => { deleteProduct(data.IDcode) }}>ลบ</button>
                                    </div>
                                )) : <div className="col">
                                    <h5>รหัสสินค้า : {searchResultProduct.IDcode}</h5>
                                    <h5>ชื่อสินค้า : {searchResultProduct.name}</h5>
                                    <h6>จำนวนสินค้าที่มี : {searchResultProduct.amt}</h6>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#saleproduct" onClick={() => { setSaleData(searchResultProduct) }}>
                                            สั่งซื้อสินค้า
                                        </button>
                                    <p></p>
                                    <Link to={'/UpdateProduct'} onClick={() => props.id(searchResultProduct)}><button type="button" className="btn btn-warning">แก้ไข</button></Link>
                                    <p></p>
                                    <button type="button" className="btn btn-danger mb-3"onClick={() => { deleteProduct(searchResultProduct.IDcode) }}>ลบ</button>
                                </div>
                        }
                        <hr></hr>
                        <nav className="d-flex justify-content-center">
                            <ul className="pagination">
                                {
                                    pages.map((e, index) => (
                                        <li className={pages === currentPage ? "page-item active":"page-item"} key={index}>
                                        <p className="page-link" onClick={()=>paginationchk(e)}>{e}</p></li>
                                    ))
                                }
                            </ul>
                        </nav>
                        {/* modal */}
                        <div className="modal fade" id="saleproduct" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="modalSaleProduct">สั่งซื้อสินค้า</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <label className="me-2">จำนวนที่จะสั่ง {saleData.name}</label>
                                        <input type='number' placeholder="กรุณากรอกจำนวน" value={amontSale} onChange={(e) => { setAmontSale(e.target.value) }}></input>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => salechk()}>Save changes</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => canclechk()}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* modal */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Showproduct;