import { useState, useCallback } from "react"
import Header from "./Header"
import MyChild from "./MyChild"

const Home = () => {
    const [change, setChange] = useState(0);

    const getAllProducts = useCallback(function(){
        const check = {
            data : {
                pname : "Lux"
            }
        }
        console.log("123")
        return check.data.pname
    },[])

    function checkAgain(){
        setChange(change + 1)
        console.log(321)
    }

    return (
        <>
            <h1>Home Page</h1>
            <Header />
            <div onClick={() => checkAgain()}>
                Click me !!! {change}
            </div>
            <MyChild products={getAllProducts}/>
            
            
        </>
    )
}

export default Home