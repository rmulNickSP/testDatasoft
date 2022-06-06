import axios from "axios";
import { useEffect, useRef, useState } from "react";
import _ from 'lodash';

function Fileupload() {
    const [dataFile, setDataFile] = useState([]);

    //pagination
    const pagesize = 3;
    const pagecount = dataFile ? Math.ceil(dataFile.length / pagesize) : 0;
    const pages = _.range(1, pagecount + 1);
    const [paginationStock, setPaginationStock] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        axios.get("http://localhost:5000/showFile").then((res) => {
            setDataFile(res.data);
            setPaginationStock(_(res.data).slice(0).take(pagesize).value())
        })
    }, [])

    const paginationchk = (numberpage) => {
        setCurrentPage(numberpage);
        const startIndex = (numberpage - 1) * pagesize;
        const pagePost = _(dataFile).slice(startIndex).take(pagesize).value();
        setPaginationStock(pagePost);
    }

    const [images, setImages] = useState([]);
    const [imageURL, setImageURL] = useState([]);

    const canvas = useRef(null);
    const [topText, setTopText] = useState('')

    const [test, setTest] = useState()


    //useeffect ในการเช็คค่าและทำงาน
    useEffect(() => {
        if (images.length < 1) return;
        const showImageURL = [];
        images.forEach(img => showImageURL.push(URL.createObjectURL(img)));
        setImageURL(showImageURL);

    }, [images])

    useEffect(() => {
        if (imageURL.length > 0) {
            const catImage = new Image();
            catImage.src = imageURL;
            catImage.onload = () => setTest(catImage);
            // console.log("yes", imageURL);
        }
    }, [imageURL])

    useEffect(() => {
        if (test !== undefined) {
            const ctx = canvas.current.getContext("2d")
            ctx.fillStyle = "black"
            ctx.fillRect(0, 0, 260, 260)
            ctx.drawImage(test, 0, 0)
            ctx.font = "20px Comic Sans MS"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"

            ctx.fillText(topText, 130, 50)
            // console.log("testYes", test);
        }
    }, [test,topText])

    //เมื่อเลือกไฟล์
    const fileSelectedHandler = (e) => {
        setImages([...e.target.files])
    }

    //เมื่ออัพโหลด
    const flieUploadedHandler = () => {
        const file = new FormData();
        file.append('file', images[0]);
        const dbfile = images[0].name;
        axios.post('http://localhost:5000/fileup', file).then((e) => {
            console.log('เรียบร้อย');
        }).catch((e) => {
            console.error('error', e)
        });

        axios.post('http://localhost:5000/addDBfile', { name: dbfile }).then(() => {
            setDataFile([...dataFile, { name: dbfile }])
        })
        // console.log('images : ',dbfile);
    }
    const d = new Date();
    const today = `${d.getFullYear()}${d.getMonth()}${d.getDate()}`
    const time = `${d.getHours()}${d.getMinutes()}`
    
    const flieUploadedEditHandler=()=>{
        const fileName = today+time+'-edit'+images[0].name;

        const myCanvas = document.querySelector('#piccanvas')

        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = myCanvas.toDataURL();
        a.download = fileName;
        a.click();
    }

    function Download_fileEdit(){
        
    }

    // console.log(typeof document.getElementById('piccanvas'));

    return (
        <>
            <div className="container">
                <div className="container-cropper">
                </div>
                <form>
                    <div className="container-button">
                        <input className="form-control form-control-lg" id="formFileLg" accept="image/*" type="file" required onChange={fileSelectedHandler} />
                        <canvas className="mt-5" id="piccanvas" ref={canvas} width={'260'} height={'260'} style={{ border: '1px solid black' }}></canvas>
                        <div>
                            <input type="text"
                                value={topText}
                                onChange={e => setTopText(e.target.value)}
                            />
                        </div>
                        {imageURL.map((img, index) => (
                            <div key={index}>
                                <img className="mt-5" id="peview" width={260} height={260} src={img} />
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-success mt-5 ms-2" onClick={flieUploadedHandler}>upload</button>
                    <button type="submit" className="btn btn-success mt-5 ms-2" onClick={flieUploadedEditHandler} >รูปที่มีข้อความ</button>
                </form>
                <hr></hr>
                <div className="row align-items-start">
                    {
                        paginationStock.map((e, index) => (
                            <div className="col" key={index}>
                                <img width={260} height={260} src={require(`./fileupload/${e.name}`)} alt="" key={index}></img>
                            </div>
                        ))
                    }
                </div>
                <nav className="d-flex justify-content-center mt-5">
                    <ul className="pagination">
                        {
                            pages.map((e, index) => (
                                <li className={pages === currentPage ? "page-item active" : "page-item"} key={index}>
                                    <p className="page-link" onClick={() => paginationchk(e)}>{e}</p></li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </>
    )
}
export default Fileupload