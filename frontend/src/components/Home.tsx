import { useState, useEffect } from "react"
import Header from "./Header"

const Home = () => {
    const [product, setProduct] = useState([]);
    const [selectionID, setSelectionID] = useState(null)

    const getAllProducts = async function(){
        const res = await fetch("http://localhost:5002/products")
                    .then((res)=>res.json())
                    .then((res)=>setProduct(res))     
    }
    //console.log(product, " products") 

    useEffect(()=>{
        getAllProducts()
    },[])

    //Edit Product detail

    // Get the modal

    const modal = document.getElementById("myModal");

    const openModal = function(id){
        console.log(id, "Hello, Edit")
        modal.style.display = "block";
        setSelectionID(id)
    }

    const closeModal = function(){
        modal.style.display = "none";
    }

    window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
    
    
    

    

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
                        <li><a onClick={openModal.bind(null, item._id)}>Edit</a></li>
                    </ul>
                )
            }
            {selectionID}

            <button id="myBtn">Open Modal</button>

            <div id="myModal" className="modal">

                <div className="modal-content">
                    <span onClick={closeModal} className="close">&times;</span>
                    <p className="blck">{selectionID}</p>
                </div>

            </div>
        </>
    )
}

export default Home