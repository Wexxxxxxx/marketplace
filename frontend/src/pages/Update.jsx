import axios from 'axios';
import React from 'react'
import {useState} from "react"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Update =()=>{
    const [vcard, setVcard] = useState({
        prod_name:"",
        prod_description:"",
        price: null,
        image: "",
    });
    const navigate= useNavigate();
    const location= useLocation();
    const vcardId= location.pathname.split("/")[2]

    const handleChange=(e)=>{
        setVcard((prev)=>({...prev, [e.target.name]: e.target.value}))
    };
    const handleClick= async e=>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:3000/vcards/${vcardId}`,vcard);
            navigate("/")
        }catch(err){    
            console.log(err)
            
        }
    }
    
    console.log(vcard)
    return(
        <div className='form'>
            <h1>UPDATE ITEM</h1>
            <input type="text" placeholder='Model' onChange={handleChange}name="prod_name"/>
            <input type="text" placeholder='Features' onChange={handleChange}name="prod_description"/>
            <input type="text" placeholder='image' onChange={handleChange}name="image"/>
            <input type="number" placeholder='price' onChange={handleChange}name="price"/>

        <button onClick={handleClick}>Update</button>
        </div>
    );
}

export default Update;