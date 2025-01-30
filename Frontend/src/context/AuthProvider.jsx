import { createContext , useEffect, useState } from "react"
import axios from 'axios'
export const AuthContext=createContext()
export const  AuthProvider = ({children}) => {
    
    
    const [blogs,setBlogs]=useState()
    
    useEffect(()=>{
        const fetchBlogs=async()=>{
            try{
                const response = await axios.get("")
                console.log(response)
                setBlogs(response.data)
            } catch(error) {
                console.log(error)
            }
        }
        fetchBlogs()
    }, [])
     
    return (
    <AuthContext.Provider value={{blogs}}>{children}</AuthContext.Provider>
  )
}
