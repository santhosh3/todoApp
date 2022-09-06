import React, {useState, useEffect} from "react";
import axios from 'axios'
import './index.css';

function App(){
  const [data,setData] = useState([])
  const [newtask, setNewtask] = useState();
  useEffect(() => {
    axios.get("http://localhost:5000/gettask").then(
      response => setData(response.data)
    )
  },[])
  const submitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/addtask", {todo:newtask}).then(
      response => setData(response.data)
    )
  }
  const deleteHandler = id => {
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      response => setData(response.data)
    )
  }
  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
         <h1> <input type='text' value={newtask} placeholder='addElement' onChange={(e) => setNewtask(e.target.value)}/></h1><br />
          <input type="submit" value='submit' />
        </form>
      {data.map(items => <div key = {items.id}><h2>{items.todo}</h2><button onClick={()=>deleteHandler(items._id)}>Delete</button></div>)}
      </center>
    </div>
  )

}
export default App