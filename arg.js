import { useState } from "react";

function Arg() {

    const [numberinput,setNumberinput]=useState();
    const [result,setResult]=useState([]);


    function chkSum(e){
        if(e!==""){
            let sum1 = Number(e) - 5
            let sum2 = Number(e)
            let sum3 = Number(e) +5
            let sum = (sum1+sum2+sum3)/3
            if(sum===Number(e)){
                setResult([{res1:sum1,res2:sum2,res3:sum3}])
            }
        }
    }

  return (
    <>
      <div className="container">
        <form className="forminput">
          <div className="mb-3 mt-3">
            <input type="number" className="form-control" onChange={(e)=>{setNumberinput(e.target.value)}} />
            <button type="button" className="btn btn-primary mt-3" onClick={()=>chkSum(numberinput)} >Click</button>
          </div>
        </form>
        {
        result.map((e,index)=>(
            <div  key={index}>
                <h4>ค่าตัวที่ 1 : {e.res1}</h4>
                <h4>ค่าตัวที่ 2 : {e.res2}</h4>
                <h4>ค่าตัวที่ 3 : {e.res3}</h4>
            </div>
        ))}
      </div>
    </>
  );
}
export default Arg;
