import React, {useRef} from "react";

const DropdownList = ( {bondingTableDetail,  setMaxBondToken} ) => {
const DropdownStatus = () => {
    if(btnRef.current.style.display == "none")
    {
        btnRef.current.style.display = "block"
    }
    else
    {
        btnRef.current.style.display = "none"
    }
}
     const btnRef = useRef();
    return (
        <div className="flex items-center justify-center text-base font-bold ">
            <div style={{ position: 'relative', display: 'inline-block', width: '80%'}}>
                <button  onClick= { ()=>{ DropdownStatus() } } style={{ backgroundColor: 'rgb(229, 231, 235)', border: 'none', cursor: 'pointer', width:'100%', padding:'12px'}}>{ bondingTableDetail[0].assetsBonded } : { bondingTableDetail[0].tokenPrice }</button>
                <div ref = {btnRef} style={{ display: 'none', backgroundColor: '#f9f9f9'}}>

                    { bondingTableDetail.map((Bonds, index) => {
                        console.log("Testing for Bonds : ",Bonds.tokenPrice)
                        return(
                            <button style={{display:'', width:'100%', padding:'5px 0', backgroundColor:'rgb(229, 231, 235)'}} onClick = {(e)=>{setMaxBondToken(Bonds.tokenPrice)}} >{ Bonds.assetsBonded } : { Bonds.tokenPrice }</button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DropdownList;