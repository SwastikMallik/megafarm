import { useState, useEffect } from "react"
import Header from "./Header"

const Home = () => {
    const [product, setProduct] = useState([]);

    const getAllProducts = async function(){
        const res = await fetch("http://localhost:5002/products")
                    .then((res)=>res.json())
                    .then((res)=>setProduct(res))     
    }
    //console.log(product, " products") 

    useEffect(()=>{
        getAllProducts()
    },[])

    return (
        <>
            <h1>Home Page</h1>
            <Header />
            {
                product.map(item=>
                    <ul className="ul-list" key={item._id}>
                        <li>{item.pname}</li>
                        <li>{item.category}</li>
                        <li>{item.quantity}</li>
                        <li>{item.price}</li>
                        <li><a href="#">Edit</a></li>
                    </ul>
                )
            }
        </>
    )
}

export default Home