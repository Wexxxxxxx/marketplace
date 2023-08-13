import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"



const Vcards =()=>{

    const [vcards, setVcards]=useState([])

    useEffect(()=>{
        const fetchAllVcards= async()=>{
            try{
                const res= await axios.get("http://localhost:8800/vcards")
                setVcards(res.data)
            }catch(err){
                console.log(err)
            }

        }
        fetchAllVcards()
    },[])



    const handleDelete= async(id)=>{
        try{
            await axios.delete("http://localhost:8800/vcards/" + id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }

    }


    return(
        <div>



           <div className="container"> 
            <h1  className="text-center mt-3" style={{fontSize: "70px"}}>MY PC MARKETPLACE</h1>
            <div className="row mt-3">
                {vcards.map((vcard)=>(
                    <div className="col-md-4 mb-3" key={vcard.id}>
                        <div className="rgbcard">
                        <img src={require(`C:/MarketPlace/frontend/src/images/${vcard.image}`)} alt={`${vcard.image}`}/>
                        </div>
                                <div className="card-body">
                                    <h2>{vcard.prod_name}</h2>
                                    <p > {vcard.prod_description}</p>
                                    <span className="card-text">₱ {vcard.price}</span>
                                    <div className="d-flex justify-content-between">
                                        <button className='Delete' onClick={()=>handleDelete(vcard.id)}>Delete</button>
                                        <button className='Update'>
                                        <Link className='UpdateLinks' to= {`/update/${vcard.id}`}>Update</Link></button>
                                    
                                </div>
                        </div>  
                    </div>
                ))}
            </div>
        </div>
       
      
        <button>
                <Link  className='ComponentLinks' to= "/add">Add new Components</Link>
        </button>  
        </div>
        
    )
}

export default Vcards