const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");
const multer = require('multer');

app.use(cors());
app.use(express.json());

const d = new Date();
const today = `${d.getFullYear()}${d.getMonth()}${d.getDate()}`
const time = `${d.getHours()}${d.getMinutes()}`

// console.log("today :",today)
// console.log("time :",time)

//สร้างที่อยู่โฟเดอร์และชื่อ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/src/component/fileupload')
  }, filename: (req, file, cb) => {
    cb(null, today + time + '-' + file.originalname)
  }
})

//อัพโหลดไฟล์ลงในโฟเดอร์โดยใช้ multer,cors,express
const upload = multer({ storage }).single('file')

app.post('/fileup', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
})
  //เพิ่มข้อมูลชื่อไฟล์
  app.post("/addDBfile", (req, res) => {
    const nameDBfile = today+time+'-'+req.body.name
    con.query("INSERT INTO fileupload (name) VALUES(?)", nameDBfile, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  });

//เชื่อมต่อกับฐานข้อมูล
//ใช้งาน mysql cors expess , nodemon
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdatasoft"
});


con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
  //เรียกข้อมูลจากฐานข้อมูล Stock
  app.get("/show", (req, res) => {
    con.query("SELECT * FROM stock", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  });

  //เรียกข้อมูลจากฐานข้อมูล Sale
  app.get("/showsale", (req, res) => {
    con.query("SELECT * FROM sale", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  });


  //เรียกข้อมูลจากฐานข้อมูล fileupload
  app.get("/showFile", (req, res) => {
    con.query("SELECT * FROM fileupload", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  });

  //เพิ่มข้อมูลไปยังฐานข้อมูล Stock
  app.post("/insert", (req, res) => {
    const code = req.body.IDcode;
    const name = req.body.name;
    const amt = req.body.amt;

    con.query("INSERT INTO stock (IDcode,name,amt) VALUES(?,?,?)", [code, name, amt], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  });

  //เพิ่มข้อมูลไปยังฐานข้อมูล Sale
  app.post("/insertSale", (req, res) => {
    const docno = req.body.docno;
    const date = req.body.date;
    const time = req.body.time;
    const IDcodeSale = req.body.IDcode;
    const nameSale = req.body.name;
    const amtSale = req.body.amt;
    con.query("INSERT INTO sale (docno,date,time,IDcode,name,amt) VALUES(?,?,?,?,?,?)", [docno, date, time, IDcodeSale, nameSale, amtSale], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  });


  //อัพเดทข้อมูลไปยังฐานข้อมูล กรณีเพิ่มสินค้าแล้วมีสินค้าอยู่ในคลังอยู่แล้ว
  app.put("/updatestock", (req, res) => {
    const idupdate = req.body.idupdate;
    const amtupdate = req.body.amtupdate;
    con.query("UPDATE stock SET amt = ? WHERE IDcode = ? ", [amtupdate, idupdate], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  })

  //อัพเดทข้อมูลสินค้าไปยังฐานข้อมูล กรณีแก้ไขสินค้านั้นๆ
  app.put("/updateProduct", (req, res) => {
    const idProupdate = req.body.idupdate;
    const nameProupdate = req.body.nameupdate;
    const amtProupdate = req.body.amtupdate;
    con.query("UPDATE stock SET name= ? , amt = ? WHERE IDcode = ? ", [nameProupdate, amtProupdate, idProupdate], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  })

  //ลบข้อมูล
  app.delete('/deleteproduct/:idProduct', (req, res) => {
    const idProduct = req.params.idProduct;
    con.query("DELETE FROM stock WHERE IDcode=?", idProduct, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  })
});
app.listen(5000);