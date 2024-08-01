import './Shirt.css'
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label, Form, Button, Select, Alert, TextInput } from "@trussworks/react-uswds";

function Shirt() {

    const url = "http://localhost:8080/shirts" // TODO: Put in environment

    const [shirts, setShirts] = useState([]);
    const [shirtLoaded, setShirtLoaded] = useState(false);
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseLoaded, setWarehouseLoaded] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [created, setCreated] = useState(false);

    let optionsArr = []
    let selectOptions = ""

    let count = 0;

    useEffect(() => {
        const wareUrl = "http://localhost:8080/warehouses"

        fetch(wareUrl)
        .then(data => data.json())
        .then(returnedData => {
            setWarehouses(returnedData);
            setWarehouseLoaded(true)
        })
        .catch(err => {alert(err); console.log(err)})

    }, [])

    useEffect(() => {

        fetch(url)
        .then(data => data.json())
        .then(returnedData => {
            setShirts(returnedData);
            setShirtLoaded(true)
        })
        .catch(err => {alert(err); console.log(err)})


    }, [deleted, created])

    function deleteById(shirt_id) {
        const deleteUrl = url + "/" +shirt_id;
        // console.log(deleteUrl);

        fetch(deleteUrl, {method: 'DELETE'})
        .then(() => {
            setDeleted(!deleted);
        })
        .catch(err => console.log(err))
        
    }

    function addShirt(e) {
        e.preventDefault();
        
        const data = new FormData(e.target);

        const newShirt = {
            shirtType: data.get("shirtType"),
            shirtColor: data.get("shirtColor"),
            shirtSize: data.get("shirtSize"),
            price: data.get("shirtPrice"),
            warehouse: {
                id: data.get("warehouse")
            }
        }

        let quantity = data.get("quantityInput")

        for (let i = 0; i < quantity; i++) {

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newShirt)
            })
            .then(() => setCreated(!created))
            .catch(err => {
                console.log(err)
            })

        }

        e.target.reset();
    }

    function handleChange(e) {
        e.preventDefault();
        
        // console.log(e.target.value)

        if (e.target.value == "select") {
            optionsArr = []
        }
        else if(e.target.value == "byType") {
            optionsArr = ["Polo", "V-Neck", "Crewneck", "Long Sleeve"]
        }
        else if(e.target.value == "byColor") {
            optionsArr = ["Blue", "Black", "White", "Orange"]
        }
        else if(e.target.value == "bySize") {
            optionsArr = ["Small", "Medium", "Large"]
        }
        else if(e.target.value == "byPrice") {
            optionsArr = ["5.99", "9.99"]
        }
        else if(e.target.value == "warehouse") {
            for (let i = 0; i < warehouses.length; i++) {
                optionsArr.push(warehouses[i].name)
            }
        }

        selectOptions = ""
        let length = optionsArr.length
        for (let i = 0; i < length; i++) {
            {
                selectOptions += '<option value="' + optionsArr[i] + '">' + optionsArr[i] + "</option>"
            }
        }
        //toast(selectOptions)
        document.getElementById("searchInput").innerHTML = selectOptions

    }

    function search(e) {
        e.preventDefault();

        let data = new FormData(e.target)
        let searchType = data.get("by")
        let searchValue = data.get("searchInput")

        if (searchType == "select") {
            toast.warning("Please select an option to search by",
                {
                    theme: "dark"
                }
            )
        }
        else {
            fetch(url + "/" + searchType + "/" + searchValue)
            .then(data => data.json())
            .then(returnedData => {
                console.log(returnedData)
                setShirts(returnedData);
                setShirtLoaded(true)
            })
            .catch(err => {alert(err); console.log(err)})
        }

        
        document.getElementById("searchInput").innerHTML = ""
        e.target.reset();
    }


    return (
        <>
        <ToastContainer />
        <div className='addContainer'>
            <h3 className='highlightValue'>Total Shirts = {shirts.length}</h3> 
            <Form onSubmit={addShirt}>
                <table id='addTable'>
                    <tbody>
                        <tr>
                            <td>Quantity: <TextInput className='quantityInput' name='quantityInput' type="number" min={1} defaultValue={1} /></td>
                            <td>
                                Type: <Select name="shirtType" id="shirtType" defaultValue="">
                                    <option value="Polo">Polo</option>
                                    <option value="V-Neck">V-Neck</option>
                                    <option value="Crewneck">Crewneck</option>
                                    <option value="Long Sleeve">Long Sleeve</option>
                                </Select>
                            </td>
                            <td>
                                Color: <Select name="shirtColor" id="shirtColor">
                                    <option value="Blue">Blue</option>
                                    <option value="Black">Black</option>
                                    <option value="White">White</option>
                                    <option value="Orange">Orange</option>
                                </Select>
                            </td>
                            <td>
                                Size: <Select name="shirtSize" id="shirtSize">
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </Select>
                            </td>
                            <td>
                                $<Select name="shirtPrice" id="shirtPrice">
                                    <option value="5.99">5.99</option>
                                    <option value="9.99">9.99</option>
                                </Select>
                            </td>
                            <td>
                                Warehouse: <Select name="warehouse" id="warehouse">
                                    {warehouseLoaded && (warehouses.length != 0)?
                                        warehouses.map(
                                            warehouse => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                                        )
                                        : <option>N/A</option>
                                    }
                                </Select>
                            </td>
                            <td><Button className='addBtn' type='submit'>Add Shirt(s)</Button></td>
                        </tr>
                    </tbody>
                </table>
            </Form>
            </div>



            <div className='searchContainer'>
            <Form onSubmit={search}>
                <table className='searchTable'>
                    <tbody>
                    <tr>
                    <td>
                    Search By: <select onChange={handleChange} name="by" id="by">
                        <option value="select">-- Select --</option>
                        <option value="byType">Type</option>
                        <option value="byColor">Color</option>
                        <option value="bySize">Size</option>
                        <option value="byPrice">Price</option>
                        <option value="warehouse">Warehouse</option>
                    </select>
                    </td>
                    <td>
                    <select name="searchInput" id="searchInput">
                    </select>
                    </td>
                    <td><button className='searchButton' type="submit">Search</button></td>
                </tr>
                </tbody>
                </table>
                </Form>
            </div>



            
            <div className='innerTableContainer'>
            <table cellSpacing={0} cellPadding={0}>
                <thead>
                    <tr><th>Item #</th><th>Shirt Type</th><th>Shirt Color</th><th>Shirt Size</th><th>Seling Price</th><th>Warehouse</th><th></th></tr>
                </thead>
                <tbody>
                    {shirtLoaded ? shirts.length != 0 ?
                        shirts.map(
                            shirt => (
                                <tr key={shirt.id} className='innerTableRow'>
                                    <td>{++count}</td>
                                    <td>{shirt.shirtType}</td>
                                    <td>{shirt.shirtColor}</td>
                                    <td>{shirt.shirtSize}</td>
                                    <td>${shirt.price}</td>
                                    <td>{shirt.warehouse.name}</td>
                                    <td><button className='deleteBtn' onClick={() => {deleteById(shirt.id)}}>Delete</button></td>
                                </tr>
                            )
                        ) : (<tr><td colSpan='7'><h2>No Shirts Found In Any Warehouse</h2></td></tr>) 
                        : (<tr><td colSpan='7'>Loading...</td></tr>) 
                    }
                </tbody>
            </table>
            </div>
        </>
    )

}

export default Shirt;