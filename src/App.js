import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import EmployeeData from './utils/EmployeeData';



function App() {

  // creating a state variable which helps us to set the data.
  const [data, setData] = useState([])
  const [firstName, setFirstName] = useState([""])
  const [lastName, setLastName] = useState([""])
  const [mailId, setMailId] = useState([""])
  const [id, setId] = useState([0])

  // this is for suppose if we clicked in edit then only this button shows
  const [isUpdate, setIsUpdate] = useState(false)

  // use effect to bind the data to the state variable 
  useEffect(()=>{
    setData(EmployeeData)
  },[])

  // now we have to make an operations:

  const Edit = (id) => {
    const ed = data.filter(item => item.id === id)
    if(ed !== undefined){
      setIsUpdate(true)
      setFirstName(ed[0].firstName)
      setLastName(ed[0].lastName)
      setId(ed[0].id)
      setMailId(ed[0].mailId)
    }
  }

  const Save = (e) =>{
    let error = ''
    if (firstName === '')
      error += 'first name is required, '
    if (lastName === '')
      error += 'last name is required, '
    if (mailId === '')
      error += 'mail id is mandatory'
    
    if (error === '')
    {
      // to save the data we will put the new object in our current object.
      e.preventDefault()
      const sv = [...data]
      const newData = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        mailId: mailId
    }
      // now we have to push this new data inside our existing data
    sv.push(newData)
    setData(sv)
    Clear()
    }
    else{
      alert(error)
    }
    
  }

  

  const Clear = (id) => {
    setFirstName("")
      setLastName("")
      setId(0)
      setMailId("")
      // as soon as we will clear it, it will show the normal save button
      setIsUpdate(false)
  }

  const Update = (id) => {
    // for update we have to find the index
    const index = data.map((item) => {
      return item.id
    }).indexOf(id)   // by this we will get the index of the id
    
    // now we will set the data
    const upd = [...data]

    upd[index].firstName = firstName
    upd[index].lastName = lastName
    upd[index].mailId = mailId
    upd[index].id = id
  
    setData(upd)
    Clear()
  } 


  const Delete = (id) => {
    if(id > 0){
      if(window.confirm("Are you sure to delete this entry?")){
        const del = data.filter(item => item.id !== id)    // this will return all other id's except the id that is passed amd filter out.
        setData(del)
      }
    }
  }

  return (
    <div className="text-3xl text-black font-bold p-4 mx-auto">
      <h1 className="text-center border border-sky-700 p-4">This is the crud operations app </h1>

      {/* creating the input for creating the name and delete entry */}

    <div className="flex justify-center items-start space-x-4 p-4 text-sm">
      {/* First Name Field */}
      <div className="flex flex-col">
        <label className="p-2">First Name:</label>
        <input
          type="text"
          value={firstName}
          placeholder="Enter your First Name"
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      {/* Last Name Field */}

      <div className="flex flex-col">
        <label className="p-2">Last Name:</label>
        <input
          type="text"
          value={lastName}
          placeholder="Enter your Last Name"
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => setLastName(e.target.value )}
        />
      </div>

      {/* Mail ID Field */}
      <div className="flex flex-col">
        <label className="p-2">Mail ID:</label>
        <input
          type="text"
          value={mailId}
          placeholder="Enter your Mail ID"
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => setMailId(e.target.value)}
        />
      </div>

      {/* ID Field */}
      <div className="flex flex-col">
        <label className="p-2">ID:</label>
        <input
          type="text"
          value={id}
          placeholder="Enter your ID"
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => setId(e.target.value)}
        />
       </div>

          {
            !isUpdate ? <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={(e) => Save(e)}>
            Save
          </button> : <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => Update(id)}>
          Update</button>

          }

          
                
                
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => Clear()}>
                  Clear
                </button>
    </div>


      {/* Creating a table for data */}
    <div className="mx-auto w-fit">
    <table className="text-sm">
        <thead> 
          <tr>
            {/* <td className="p-3">Sr. Number</td> */}
            <td className="p-3">Sr No.</td>
            <td className="p-3">First Name</td>
            <td className="p-3">Last Name</td>
            <td className="p-3">Mail ID</td>
            <td>Operations</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                  <tr key = {index}>
                    {/* <td>{index + 1}</td> */}
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.mailId}</td>
                    
                    {/* buttons for operations */}

                    <td className="p-3 flex space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => Edit(item.id)}>
                  Edit
                </button>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" onClick={() => Delete(item.id)}>
                  Delete
                </button>
              </td>

                  </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
      
    </div>
  );
}

export default App;
