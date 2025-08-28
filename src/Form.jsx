import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {

  let [formdata, setformdata] = useState({
    uname: '',
    uemail: '',
    uphone: '',
    umessage: '',
    index:'',
  });

  let [records, setrecords] = useState([]);
  function handleform(e) {
        e.preventDefault();

  

    if (formdata.uname.trim() === "" ||
      formdata.uemail.trim() === "" ||
      formdata.uphone.trim() === "" ||
      formdata.umessage.trim() === "") {
toast.error("Please enter valid details!");      return;
    }
    if (records.some((r) => r.uemail === formdata.uemail)) {
      toast.warning("This email already exists!");
      setformdata({
         ...formdata, uemail:""
      });
      return;
    }
    
    if (records.some((r) => r.uphone === formdata.uphone)) {
      toast.warning("This Phone Number already exists!");
       setformdata({
         ...formdata,
         uphone: "",
       });
      return;
      
    }
   
    
    if (formdata.uphone.length !== 10) {
      toast.warning("Please enter the valid number")
      
      return;
    }
    
    setrecords([...records, formdata]);
    setformdata({
      uname: "",
      uemail: "",
      uphone: "",
      umessage: "",
      index: "",
    });


  }

  function deleterow(index) {
    setrecords(records.filter((_,i)=> i !== index));
  }
  
  function showdata(index) {
    setformdata({...records[index],index});
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="form-section">
        <h1>Enquiry Form</h1>
        <form className="space-y-3" onSubmit={handleform}>
          <label htmlFor="Username">Name</label>
          <input
            type="text"
            name="uname"
            value={formdata.uname}
            onChange={(e) => {
              setformdata({ ...formdata, uname: e.target.value });
            }}
          />

          <label htmlFor="UserEmail">Email</label>
          <input
            type="email"
            name="uemail"
            value={formdata.uemail}
            onChange={(e) => {
              setformdata({ ...formdata, uemail: e.target.value });
            }}
          />

          <label htmlFor="UserPhone">Phone</label>
          <input
            type="number"
            name="uphone"
            value={formdata.uphone}
            onChange={(e) => {
              setformdata({ ...formdata, uphone: e.target.value });
            }}
          />

          <label htmlFor="Message">Message</label>
          <textarea
            name="umessage"
            value={formdata.umessage}
            onChange={(e) => {
              setformdata({ ...formdata, umessage: e.target.value });
            }}
          ></textarea>

          <button type="submit" className="submit-btn">
            submit
          </button>
        </form>
      </div>

      <div className="data-section">
        <h1>Data</h1>

        <table className="table">
          <thead className="table-head">
            <tr>
              <th className="table-header-cell">SI.NO</th>
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Email</th>
              <th className="table-header-cell">phone</th>
              <th className="table-header-cell">Message</th>
              <th className="table-header-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td className="text-base p-1"colSpan={6}>No data found</td>
              </tr>
            ) : (
              records.map((v, i) => (
                <tr className="table-row" key={i}>
                  <td className="table-cell">{i + 1}</td>
                  <td className="table-cell">{v.uname}</td>
                  <td className="table-cell">{v.uemail}</td>
                  <td className="table-cell">{v.uphone}</td>
                  <td className="table-cell">{v.umessage}</td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => {
                        showdata(i);
                      }}
                    >
                      update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        deleterow(i);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
