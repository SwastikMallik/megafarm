import { useState, useEffect } from "react"
import Header from "./Header"

const Home = () => {
    const [product, setProduct] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const [selectionID, setSelectionID] = useState(null)
    const [data, setData] = useState({})


    const getAllProducts = async function(){
        const res = await fetch("http://localhost:5002/products")
                    .then((res)=>res.json())
                    .then((res)=>setProduct(res))     
    }
    //console.log(product, " products") 

    useEffect(()=>{
        getAllProducts()
    },[])

    useEffect(()=>{
        const handleClickOutside = (event) =>{
            if(openModal && event.target.className=="modal"){
                setOpenModal(false)
            }
        }
        window.addEventListener("click", handleClickOutside)
        return () => window.removeEventListener("click", handleClickOutside)
    }, [openModal])

    //Edit Product detail

    // Get the modal

    const editFormModal = async function(id){
        setOpenModal(true)
        setSelectionID(id)
        try{ 
            // fetch product data from DB using product ID
            const res = await fetch(`http://localhost:5002/product/${id}`)
            const resJson = await res.json()
            setData(resJson)
        } catch(err){
            console.log(err)
        }
        
    }
    const closeModal = function(){
        setOpenModal(false)
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
                        <li><a onClick={editFormModal.bind(null, item._id)}>Edit</a></li>
                    </ul>
                )
            }
            
            {openModal && (<div id="myModal" className="modal">

                <div className="modal-content">
                    <span onClick={closeModal} className="close">&times;</span>
                    <p className="blck">{selectionID}</p>
                </div>

            </div>)}
        </>
    )
}

export default Home