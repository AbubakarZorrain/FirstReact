import React, { useEffect } from 'react';
import axios from 'axios';
import Form from "@rjsf/core";
import { useState } from 'react';
export default function App() {
  var [name, setName] = useState()
  var [Schema, setSchema] = useState({})
  var [ui, setUi] = useState({})
  var [root_firstname, setroot_firstname]= useState("")
  var [userArr, setuserArr]=useState([])
  useEffect(() => {

    axios.get(`http://localhost:8000/getUser`)
      .then(res => {
        console.log(res.data)
        setuserArr(res.data);
      })

    axios.get(`http://localhost:3000/form/userCreate`)
      .then(res => {
        console.log(res.data)
        const Schema = res.data.userCreateSchema;
        const ui = res.data.userCreateUiSchema;
        setUi(ui)
        setSchema(Schema);

      })
      // axios.get(`http://localhost:3000/form/userCreate`)
      // .then(res => {
      //   console.log(res.data)
      //   const Schema = res.data.userCreateSchema;
      //   const ui = res.data.userCreateUiSchema;
      //   setUi(ui)
      //   setSchema(Schema);

      // })
      setroot_firstname("HIiiiiiiiiii")
    console.log(root_firstname)
  }, [root_firstname])

  useEffect(() => {
    setName('ilqefbel');
    console.log(name)
  }, [name]);
  // const [root_firstname, setRoot_firstname] = useState();
  function handleChange(event) {
    console.log("Value Changes", event)
    var data = event.formData;
    var firstname = data.firstname;
    var lastname = data.lastname;
    var task = data.tasks
    if (task != null) {
      var firstinput = task[0].firstinput
      var secondinput = task[0].secondtinput
      var selectOtion = task[0].SelectOptions
      var selectRadio = task[0].selectRadio
    }
    // root_firstname={firstname}
    console.log("First Name", firstname)
    console.log("Last Name Name", lastname)
    console.log("Nested First Input Name", firstinput)
    console.log("Nested Second Input", secondinput)
    console.log("Last Third Input Optiond ", selectOtion)
    console.log("Nested Fourth Input Radio", selectRadio)

  };
  function handleSubmit(event) {
    console.log(event)
    var data = event.formData;
    var task = data.tasks
    if (task != null) {
      const obj = {
        firstname: data.firstname,
        lastname: data.lastname,
        firstinput: task[0].firstinput,
        secondinput: task[0].secondtinput,
        selectOtion: task[0].SelectOptions,
        selectRadio: task[0].selectRadio
      }
      axios.post(`http://localhost:3000/form/userCreate`, obj)
        .then(res => {
          console.log(res.data)
        })
      console.log(obj)
    } else {
      const obj = {
        firstname: data.firstname,
        lastname: data.lastname,
      }
      axios.post(`http://localhost:3000/form/userCreate`, obj)
        .then(res => {
          console.log(res.data)
        })
      console.log(obj)
    }


  }
  return (
    <ul>

      <Form schema={Schema}
        uiSchema={ui}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <table >
        <thead>
          <td>Username</td>
          <td>Password</td>
          <td>ID</td>
        </thead>
        
          {
          userArr.map((item)=>(
            <tbody key = { item.id } >
                <td>  { item.username }</td>
                     <td>{ item.password }</td> 
                   <td>{ item._id }</td> 
                    </tbody>
          ))
          }
        
      </table>
    </ul>
  )
}