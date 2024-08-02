import { Link, } from 'react-router-dom';
import './Warehouse.css'
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Label, Form, Button, Select, Alert, TextInput, SiteAlert } from "@trussworks/react-uswds";

function Warehouse() {

    const url = "http://localhost:8080/warehouses"

    const [warehouses, setWarehouses] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [created, setCreated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    let names = []
    let storedVals = []
    let cancel = false

    useEffect(() => {

        fetch(url)
        .then(data => data.json())
        .then(returnedData => {
            setWarehouses(returnedData);
            setLoaded(true)
        })
        .catch(err => {alert(err); console.log(err)})

    }, [created, deleted])

    function addWarehouse(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        let name = data.get("nameInput")
        let state =  data.get("stateInput")
        let city = data.get("cityInput")
        let capacity = data.get("capacityInput")

        if(names.includes(data.get("nameInput"))) {
           toast.error("Could not add because there alraedy exists a warehouse with that name",
            {
                theme: "dark"
            }
           );
        }
        else if (name.length == 0 || state.length == 0 || city.length == 0 || capacity == 0) {
            toast.error("Could not add becuase one or more of the required fields is missing", 
                {
                    theme: "dark"
                }
            )
        }
        else {
        const newWarehouse = {
            name: data.get("nameInput"),
            state: data.get("stateInput"),
            city: data.get("cityInput"),
            capacity: data.get("capacityInput"),
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newWarehouse)
        })
        .then(() => setCreated(!created))
        .catch(err => {
            console.log(err)
        })
        toast.success("Warehouse: " + data.get("nameInput") + " has been added",
        {
            theme: "dark"
        })
        e.target.reset();
        }
    }

    function deleteWarehouse(warehouseId) {
        const deleteUrl = url + "/" + warehouseId;

        fetch(deleteUrl, {method: 'DELETE'})
        .then(() => {
            setDeleted(!deleted);
        })
        .catch(err => console.log(err))
    }

    function handleChange(e) {
        if (e.target.value == "id") {
            document.getElementById("searchValue").type = "number"
            document.getElementById("searchValue").min = "1"
        }
        else {
            document.getElementById("searchValue").type = "text"
        }
    }

    function search(e) {
        e.preventDefault()

        let searchUrl = url

        let data = new FormData(e.target)

        let searchType = data.get("by")
        let searchValue = data.get("searchValue")

        // console.log(searchType)
        // console.log(searchValue)

        if (searchType == "select") {
            toast.info("Select a type to search by", {theme:"dark"})
        }
        else if (searchValue == "") {
            toast.info("Enter a value to search", {theme:"dark"})
        }
        else {
          
            searchUrl += '/' + searchType + "/" + searchValue
        

            // console.log(searchUrl)


            fetch(searchUrl)
            .then(data => data.json())
            .then(returnedData => {
                setWarehouses(returnedData);
                setLoaded(true)
                if (returnedData.length == 0) {
                    toast.warning("No warehouses found", {theme:"dark"})
                }
            })
            .catch(err => {alert(err); console.log(err)})

        }


    }

    function reset(e) {
        setCreated(!created)
    }

    function handleEdit(warehouse) {

        let btn = document.getElementById("editBtn" + warehouse.id)


        console.log(btn)

        console.log(document.getElementById("stateIntput" + warehouse.id))
        

        // if (cancel == false) {
        //     storedVals.push(document.getElementById("stateIntput" + warehouse.id).value)
        //     storedVals.push(document.getElementById("cityInput" + warehouse.id).value)
        //     storedVals.push(document.getElementById("capacityInput" + warehouse.id).value)


        //     document.getElementById("stateIntput" + warehouse.id).disabled = false
        //     document.getElementById("cityInput" + warehouse.id).disabled = false
        //     document.getElementById("capacityInput" + warehouse.id).disabled = false

        //     console.log(storedVals)

        //     btn.innerHTML = "Cancel"
        //     btn.style.backgroundColor = "red"
        //     cancel = true
        // }
        // else {
        //     document.getElementById("stateIntput" + warehouse.id).value = storedVals[0]
        //     document.getElementById("cityInput" + warehouse.id).value = storedVals[1]
        //     document.getElementById("capacityInput" + warehouse.id).value = storedVals[2]
            


        //     document.getElementById("stateIntput" + warehouse.id).disabled = true
        //     document.getElementById("cityInput" + warehouse.id).disabled = true
        //     document.getElementById("capacityInput" + warehouse.id).disabled = true

            

        //     btn.innerHTML = "Edit"
        //     btn.style.backgroundColor = "darkviolet"
        //     cancel = false
        // }

    }

    return (
        <>
        <ToastContainer />
         <div className='addContainer'>
            <h3 className='highlightValue'>{warehouses.length} Warehouse(s) Available</h3>
                <Form onSubmit={addWarehouse}>
                <table id='addTable'>
                    <tbody>
                        <tr>
                            <td>Name: <TextInput className='quantityInput' id="nameInput" name='nameInput' maxLength={25} /></td>
                            <td>State: <TextInput className='quantityInput' id="stateInput" name='stateInput' maxLength={2} defaultValue={"MD"}/></td>
                            <td>City: <TextInput className='quantityInput' id="cityInput" name='cityInput' maxLength={25} /></td>
                            <td>Capacity: <TextInput className='quantityInput' id='capacityInput' name='capacityInput' type="number" min={1} defaultValue={100} max={1000} /></td>
                            <td><Button className='addBtn' type='submit'>Add New Warehouse</Button></td>
                        </tr>
                    </tbody>
                </table>
            </Form>
            </div>

            {/* <div className='warehouseDeleteContainer'>
                <button className='deleteBtn'>Delete A Warehouse</button>
            </div> */}

        <div className='searchContainer'>
            <Form onSubmit={search} onReset={reset}>
                <table className='searchTable'>
                    <tbody>
                        <tr>
                            <td>
                                Search By: <select onChange={handleChange} name="by" id="by">
                                <option value="select"></option>
                                <option value="byId">Id</option>
                                <option value="byName">Name</option>
                                <option value="byState">State</option>
                                <option value="byCity">City</option>
                                </select>
                            </td>
                            <td><TextInput className='quantityInput' name="searchValue" id="searchValue" min={1} maxLength={25}></TextInput></td>
                            <td><button className='searchButton' type="submit">Search</button></td>
                            <td><button className='resetButton' type='reset'>Reset</button></td>
                        </tr>
                    </tbody>
                </table>
            </Form>
            <br />
        </div>


        <div className='warehousesGrid'>
            {loaded ?
                warehouses.map(
                    warehouse => (names.push(warehouse.name),
                        <div className='outterWarehouseContainer' key={warehouse.id}>
                            <h2>{warehouse.name}</h2>
                            <Link className='visitBtn' to={"/shirts"} state={{warehouse}}>Visit Warehouse</Link><br />
                            <button  id={"editBtn" + warehouse.id} className='editBtn' type="button" onClick={() => handleEdit(warehouse)}>Edit</button> 
                            <button className='confirmBtn'>Confirm</button>
                            <br />
                            <div className="warehouseContainer">
                                <p className="wareBlock">ID:      </p><TextInput id={'idInput' + warehouse.Id} className="quantityInput" type="text" defaultValue={warehouse.id} disabled></TextInput> <br />
                                <p className="wareBlock">State:     </p><TextInput id={'stateInput' + warehouse.Id} className="quantityInput" type="text" defaultValue={warehouse.state} ></TextInput> <br />
                                <p className="wareBlock">City:     </p><TextInput id={'cityInput' + warehouse.Id} className="quantityInput" type="text" defaultValue={warehouse.city} ></TextInput> <br />
                                <p className="wareBlock">Capacity:     </p><TextInput id={'capacityInput' + warehouse.Id} className="quantityInput" type="text" defaultValue={warehouse.capacity} ></TextInput> 
                                </div>
                            <button className='deleteBtn' onClick={() => deleteWarehouse(warehouse.id)}>Delete Warehouse</button>
                            
                        </div>
                    )
                )
                : <div colSpan="4">Loading...</div>
            }
        </div>
        </>
    )

}

export default Warehouse