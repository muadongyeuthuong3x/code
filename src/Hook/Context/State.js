import  {useEffect, useReducer ,useState }   from 'react'
import axios from 'axios'
import {IntroduceReducer} from './../Reducer/Introduce'
import Introducecontext from './Introducecontext'
const IntroducecontextProvider  = ({children}) =>{
    const initalState = {
        data :[],
        success:null,
        error:null,
        listdata:[],
        dataedit:null     
    }
const [ state , dispatch ] = useReducer(IntroduceReducer ,initalState)
const addintroduce = async(dataintroduce)=>{
    const config = {
        'Content-Type': 'application/json',
      }
    await axios.post('http://localhost:5000/api/introduce', dataintroduce, { config }).then(res=>{
     
        dispatch({
          type:"CREATEINTRODUCE",
          payload: res.data.introduce
        })
        dispatch({
          type:"SUCCESS",
          payload: res.data.msg
        })
     

    }).catch((err)=>{    
      dispatch({
      type:"ERROR",
      payload: err.response.data.message
     })
    })
  
}

const listintroduce = async()=>{
  await axios.get('http://localhost:5000/api/introduces').then(res=>{
    
      dispatch({
        type:"LISTINTRODUCE",
        payload: res.data
      })
  }).catch((err)=>{    
    dispatch({
    type:"ERROR",
    payload: err.response.data.message
   })
  })

}

const editintroduce = async(idedit)=>{


   const dledit =  await axios.get(`http://localhost:5000/api/introduce/${idedit}`)

}


const updateintroduce = async(id,data)=>{

  const config = {
    'Content-Type': 'application/json'
  }

  console.log(data)
  await axios.put(`http://localhost:5000/api/introduce/${id}` , data  ).then(res=>{

      dispatch({
        type:"SUCCESS",
        payload: res.data.message
      })
      listintroduce()
      
 
  }).catch((err)=>{
   
    dispatch({
    type:"ERROR",
    payload: err.response.data.message
   })
  })

}


const deletedata = async(iddelete)=>{
  
  await axios.delete(`http://localhost:5000/api/introduce/${iddelete}` ).then(res=>{

      dispatch({
        type:"DELETEINTRODUCE",
        payload: res.data.id
      })

      dispatch({
        type:"SUCCESS",
        payload: res.data.msg
      }) 
  }).catch((err)=>{   
  
    dispatch({
    type:"ERROR",
    payload: err.response.data.message
   })
  })

}

const clearmessage  =  () =>{
  dispatch({
    type:"CLEAR",
    payload:null
  })
}


const valueCOntext = {
  addintroduce,
  errors:state.error,
  successs:state.success,
  clearmessage,
  listintroduce,
  listdata : state.listdata,
  editdata :state.dataedit,
  deletedata,
  editintroduce,
  updateintroduce 
}



return (
    <Introducecontext.Provider value={valueCOntext}>
         
      {children}

        </Introducecontext.Provider>

       
)}

export default  IntroducecontextProvider