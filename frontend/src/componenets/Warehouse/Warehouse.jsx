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
    let names = []

    useEffect(() => {

        fetch(url)
        .then(data => data.json())
        .then(returnedData => {
            setWarehouses(returnedData);
            setLoaded(true)
        })
        .catch(err => {alert(err); console.log(err)})

    }, [created])

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

    return (
        <>
        <ToastContainer />
         <div className='addContainer'>
            <h3 className='highlightValue'>{warehouses.length} Warehouses Available</h3>
                <Form onSubmit={addWarehouse}>
                <table id='addTable'>
                    <tbody>
                        <tr>
                            <td>Name: <TextInput className='quantityInput' id="nameInput" name='nameInput' maxLength={25} /></td>
                            <td>State: <TextInput className='quantityInput' id="stateInput" name='stateInput' maxLength={2} defaultValue={"MD"}/></td>
                            <td>City: <TextInput className='quantityInput' id="cityInput" name='cityInput' maxLength={25} /></td>
                            <td>Capacity: <TextInput className='quantityInput' id='capacityInput' name='capacityInput' type="number" min={1} defaultValue={100} /></td>
                            <td><Button className='addBtn' type='submit'>Add New Warehouse</Button></td>
                        </tr>
                    </tbody>
                </table>
            </Form>
            </div>
            <div className='warehouseDeleteContainer'>
                <button className='deleteBtn'>Delete A Warehouse</button>
            </div>

            <div className='innerTableContainer'>
        <table>
            <tbody>       
            <tr id='warehouseTableRow'>
            {loaded ?
                warehouses.map(
                    warehouse => (names.push(warehouse.name),
                        <td key={warehouse.id}>
                            <h2>{warehouse.name}</h2>
                            <Link to={"/displayShirts"} state={{warehouse}}>
                            {/* <Link to={{
                                pathname: "/displayShirts/parameter-type",
                                state: {stateParam: true}
                            }}> */}
                                <div className="warehouseContainer">
                                State: {warehouse.state} <br />
                                City: {warehouse.city} <br />
                                Capacity: {warehouse.capacity}
                                </div>
                            </Link>
                        </td>
                    )
                )
                : <th colSpan={warehouses.length}>Loading...</th>
            }
            </tr>
            </tbody>
        </table>
        </div>
        </>
    )

}

export default Warehouse