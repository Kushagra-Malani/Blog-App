import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authstatus = useSelector(state => state.auth.status)

    useEffect(() => {   // Note: if authStatus is true then it means we are logged in & so, we go to the home i.e "/"
        if(authentication && authstatus != authentication) {  // true && true = true
            navigate("/login")
        }
        else if(!authentication && authstatus != authentication) {   // false && false = true
            navigate("/")
        }
        setLoader(false)
    }, [authstatus, navigate, authentication])
    return loader ? <h1>Loading...</h1> : <>{children}</> // if loading is true then show: Loading... & if loading is false then show: {children}
}