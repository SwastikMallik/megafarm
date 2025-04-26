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
        setSelectionID(id)
        try{ 
            // fetch product data from DB using product ID
            const res = await fetch(`http://localhost:5002/product/${id}`)
            if(!res.ok){
                throw new Error(`Server error: ${res.status}`)
            } else {
                const resJson = await res.json()
                console.log("waswas", res)
                setData(resJson)
                setOpenModal(true)
            }
        } catch(error){
            console.log("Logs : ", error)
        }
        
    }
    //console.log("response data", data)
    const closeModal = function(){
        setOpenModal(false)
    }

    //edit form
    const editFormData = (e) => {
        e.preventDefault();
        console.log("submit edit form")
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
            
            { 
                openModal && (<div id="myModal" className="modal">

                    <div className="modal-content">
                        <span onClick={closeModal} className="close">&times;</span>
                        <p className="blck">{selectionID}</p>

                        <form onSubmit={editFormData}>
                            <input type="hidden" name="_id" defaultValue={data._id}/>
                            <label className="blck" for="pname">
                                Product Name : 
                            </label>
                            <input type="text" name="pname" id="pname" defaultValue={data.pname}/><br/>
                            <label className="blck" for="cat">
                                Category : 
                            </label>
                            <select name="category" id="cat" value={data.category}>
                                <option>Select Category</option>
                                <option value="Cloth">Cloth</option>
                                <option value="Food">Food</option>
                                <option value="Beauty Product">Beauty Product</option>
                            </select><br/>
                            <label className="blck" for="quantity">
                                Quantity : 
                            </label>
                            <input type="text" name="quantity" id="quantity" defaultValue={data.quantity}/><br/>
                            <label className="blck" for="price">
                                Price : 
                            </label>
                            <input type="text" name="price" id="price" defaultValue={data.price}/>
                            <br/>
                            <br/>
                            <button> Submit </button>
                        </form>
                    </div>

                </div>) 
            }
        </>
    )
}

export default Home