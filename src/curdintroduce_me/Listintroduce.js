
import React ,{useContext ,useState ,useEffect } from 'react'
import { Table ,Button ,Modal } from "react-bootstrap";
import Introducecontet from './../Hook/Context/Introducecontext'
import {NavLink}  from 'react-router-dom'
import './curd.scss'
import { ToastContainer, toast } from 'react-toastify';
function CommentCard() {
  const context = useContext(Introducecontet)
  const {listintroduce,errors , successs  , clearmessage ,listdata ,deletedata} =context
  const [show, setShow] = useState(false);

  const [id,setid] = useState(false);

  const handleClose = () => setShow(false);
  const [message , setmessage] = useState(true)


  useEffect(()=>{

    clearmessage()
   console.log(successs)
    if(errors !=null){
       return  toast.error(errors)
      }
     if(successs !=null){ 
  
      return    toast.success(successs)
  
      }
  },[message])

  const handleShow = (id) =>{
   setid(id)
   setShow(true)
  }
  

   
  const deleteintroduce = ()=>{
    deletedata(id)
    setShow(false)
    setmessage(!message)
  }
  useEffect(()=>{
    listintroduce();
  },[])
  
  
  if (listdata === undefined) return  ( <h3 className="no-guest">Data .....</h3>)
    return (
  
<div className="container">
<ToastContainer
position="top-right"
autoClose={1000}
closeOnClick/>
  <div className="row">
    <div className="col-12">
   
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>STT</th>
      <th> Name</th>
      <th>Age</th>
      <th> Class</th>
      <th> Picture</th>
      <th> Edit</th>
      <th> Delete</th>
    </tr>
  </thead>
  <tbody>
    {
      listdata.map((data1 ,index)=>{
        return( 
        <tr key={data1._id}>

        <td>{index}</td>
        <td>{data1.name}</td>
        <td>{data1.age}</td>
        <td>{data1.class}</td>
        <td > <img src={data1.picture} alt="" className="imgpicture"/></td>
        <td ><NavLink
  to={`/editintroduce/${data1._id}`}activeStyle={{fontWeight: "bold", color: "red"}}>  <Button>Sửa</Button>  </NavLink> </td>
        <td><Button  onClick={()=>handleShow(data1._id)} >Xóa</Button></td>
      
  
      </tr>)
      })

 

    }
   
  </tbody>
</Table>
  </div>
 
</div>
<Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteintroduce}>
          Delete
          </Button>
        </Modal.Footer>
      </Modal>
</div>


    )
}

export default CommentCard