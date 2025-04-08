import { useState } from "react"
import Header from "./Header"

const AddProduct = () => {
    const [product, setProduct] = useState({
        pname: "",
        category: "",
        quantity: "",
        price: 0
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setProduct((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const saveProduct = function(e){
        e.preventDefault();
        console.log(product)
    }
    return (
        <>
            <h1>Add Product Page</h1>
            <Header />
            <form onSubmit={saveProduct}>
                <label>Product name:</label><br/>
                <input type="text" name="pname" defaultValue={product.pname} onChange={handleChange}/><br/>
                <label>Select Category:</label><br/>
                <select name="category" onChange={handleChange}>
                    <option>Select Category</option>
                    <option value="Cloth">Cloth</option>
                    <option value="Food">Food</option>
                    <option value="Beauty Product">Beauty Product</option>
                </select><br/>
                <label>Enter Quantity</label><br/>
                <input type="number" name="quantity" defaultValue={product.quantity} onChange={handleChange} /><br/>
                <label>Price:</label><br/>
                <input type="text" name="price" defaultValue={product.price} onChange={handleChange}/><br/><br/>
                <button>Submit</button>
            </form> 
        </>
    )
}

export default AddProduct