
import React ,{useContext ,useState ,useEffect } from 'react'
import { Button ,Form } from "react-bootstrap";
import Introducecontet from './../Hook/Context/Introducecontext'
import axios from 'axios'
import { useParams ,useHistory } from "react-router-dom";
import './curd.scss'
function CommentCard() {
  const context = useContext(Introducecontet)
  const { id } = useParams();
  const {updateintroduce } =context
  const history = useHistory()
  const [values, setValue] = useState({
    nameme:'',
    age:'',
    class:'A',
    picture:'',
}); 


const [imgsave,setimgsave] = useState(null)
  const [errorname,seterrorname] = useState(null)
  const [errorage,seterrorage] = useState(null)
  const [errorpicture,seterrorpicture] = useState(null)
const Laydata = (e) =>{
    var target = e.target;
    var name = target.name;
    var value =  target.value;
    setValue({ ...values , [name]: value})
  }
   
  useEffect(()=>{
    datadl()
  },[])

  const datadl = async()=>{
        await axios.get(`http://localhost:5000/api/introduce/${id}`).then(res=>{
           setValue({
               nameme:res.data.name,
               age:res.data.age,
               class:res.data.class,
               picture:res.data.picture
           })
        })
  }
  
 
  const Laydatafile = (e) =>{
   
    setimgsave(e.target.files[0]);
  }


const Sendata =async(event) =>{
    event.preventDefault();
    if(values.nameme.length <5){
        return seterrorname("Ten cua ban phai lon hon 5 ki tu")
      }else{
        seterrorname(null)
      }
  
      if(values.age <18 || values.age >25){
        return seterrorage("Tuoi phai tu 18 den 25")
      }else{
        seterrorage(null)
      }

  if(imgsave === null){
     
    await updateintroduce (id, values)
    history.push("/listintroduce")


  }else{

    let formData1 = new FormData();
    formData1.append('nameme', values.nameme);
    formData1.append('picture',imgsave);
    formData1.append('age', values.age);
    formData1.append('class', values.class);
    await  updateintroduce (id,formData1 );
    history.push("/listintroduce")

  }
    
}

    return (
  
<div className="container">
  <div className="row">
    <div className="col-6 col-md-4">
   
    </div>
    <div className="col-6 col-md-4">
    <form  onSubmit={Sendata} enctype="multipart/form-data"> 
    <Form.Group className="mb-3" >
    <Form.Label>Tên của bạn </Form.Label>
    <Form.Control type="text" placeholder="Vui lòng điền tên ... " value ={values.nameme} name="nameme"  onChange={Laydata} />
    { errorname === null  ? '' : <Form.Text className="text-muted nameerror"  >
      {errorname}
    </Form.Text>  }
    

    </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Tuổi  của bạn </Form.Label>
    <Form.Control type="number" min="1"   max ="150" name="age"  value ={values.age}    onChange={Laydata}/>
    { errorage === null  ? '' : <Form.Text className="text-muted nameerror"  >
      {errorage}
    </Form.Text>  }
  </Form.Group>

  <Form.Group className="mb-3" >
  <Form.Label>Lớp của  của bạn </Form.Label>
  <Form.Select aria-label="Lớp của  của bạn" name="class"  onChange={Laydata}  value ={values.class}>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
</Form.Select>
  </Form.Group>

  <Form.Group className="mb-3" >
  <Form.Label>Ảnh cũ  </Form.Label>
  <br />
  <img src={values.picture} alt="" className="imgpicture"/>
  </Form.Group>

  <Form.Group className="mb-3" >
  <Form.Label>Ảnh đại diện của bạn mới </Form.Label>

   <input type="file"
       id="avatar" 
       accept="image/png, image/jpeg"   onChange={Laydatafile} /> 
       <br />
        {errorpicture === null  ? '' : <Form.Text className="text-muted nameerror"  >
      {errorpicture}
    </Form.Text>  }
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>    
    </form>
    </div>
    <div className="col-6 col-md-4">
  
    </div>
  </div>
 
</div>


    )
}

export default CommentCard