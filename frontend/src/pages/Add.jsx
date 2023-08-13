import axios from 'axios';
import React from 'react'
import {useState} from "react"
import { useNavigate } from 'react-router-dom';

const Add =()=>{
    const [vcard, setVcard] = useState({
        prod_name:"",
        prod_description:"",
        price: null,
        image: "",
    });
    const navigate= useNavigate()


    const handleChange=(e)=>{
        setVcard((prev)=>({...prev, [e.target.name]: e.target.value}))
    };
    const handleClick= async e=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:3000/vcards",vcard)
            navigate("/")
        }catch(err){    
            console.log(err)
            
        }
    }
    


    console.log(vcard)
    return(
        <div className='form'>
            <h1>CREATE NEW ITEM</h1>
            <input type="text" placeholder='Model' onChange={handleChange}name="prod_name"/>
            <input type="text" placeholder='Features' onChange={handleChange}name="prod_description"/>
            <input type="text" placeholder='image' onChange={handleChange}name="image"/>
            <input type="number" placeholder='price' onChange={handleChange}name="price"/>

        <button  classname="formButton" onClick={handleClick}>Create</button>
        </div>
    );
}

export default Add;