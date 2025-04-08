import { useState } from "react"
import Header from "./Header"

const AddProduct = () => {
    const [product, setProduct] = useState({
        pname: "",
        category: "",
        quantity: 0,
        price: 0
    })

    const [error, setError] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;

        setProduct((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const validateFormData = () => {
        const getErrors = {}
        if(!product.pname) getErrors.name="Product name can't be blank" 
        if(!product.category) getErrors.category="Product category can't be blank" 
        if(product.quantity==0) getErrors.quantity="Product quantity can't be blank"
        if(product.price == 0) getErrors.price="Product price can't be blank" 

        setError(getErrors)

        console.warn(getErrors)
        return getErrors
    }

    const saveProduct = function(e){
        e.preventDefault();
        const valLength = Object.keys(validateFormData()).length
        if(valLength === 0){
            console.log("call the API to save the data")
        }
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
                <input type="number" name="price" defaultValue={product.price} onChange={handleChange}/><br/><br/>
                <button>Submit</button>
            </form> 
        </>
    )
}

export default AddProduct