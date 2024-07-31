import './Shirt.css'
import { useState } from "react";
import { useEffect } from "react";
import { Label, Form, Button, Select, Alert, TextInput } from "@trussworks/react-uswds";

function Shirt() {

    const url = "http://localhost:8080/shirts" // TODO: Put in environment

    const [shirts, setShirts] = useState([]);
    const [shirtLoaded, setShirtLoaded] = useState(false);
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseLoaded, setWarehouseLoaded] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [created, setCreated] = useState(false);
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
            console.log("delete sucessful")
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

        console.log(newShirt)

        let quantity = data.get("quantityInput")

        for (let i = 0; i < quantity; i++) {

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newShirt)
            })
            .then(data => data.json())
            .then((returnedData) => {
                setCreated(!created)
                console.log(returnedData)
                console.log("Creation successful")
            })
            .catch(err => {
                console.log(err)
            })

        }

        e.target.reset();
    }

    console.log(warehouses)

    return (
        <>
            <h3>Total Shirts = {shirts.length}</h3> 
            <Form onSubmit={addShirt}>
                <table id='addTable'>
                    <tbody>
                        <tr>
                            <td>Quantity: <TextInput id='quantityInput' name='quantityInput' type="number" min={1} defaultValue={1} /></td>
                            <td>
                                Type: <Select name="shirtType" id="shirtType">
                                    <option value="Polo">Polo</option>
                                    <option value="V-Neck">V-Neck</option>
                                    <option value="Crewneck">Crewneck</option>
                                    <option value="Long Sleve">Long Sleve</option>
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
            <br />
            <br />
            <hr />
            <table cellSpacing={0} cellPadding={0}>
                <thead>
                    <tr><th>Item #</th><th>Shirt Type</th><th>Shirt Color</th><th>Shirt Size</th><th>Seling Price</th><th>Warehouse</th><th></th></tr>
                </thead>
                <tbody>
                    {shirtLoaded ?
                        shirts.map(
                            shirt => (
                                <tr key={shirt.id}>
                                    <td>{++count}</td>
                                    <td>{shirt.shirtType}</td>
                                    <td>{shirt.shirtColor}</td>
                                    <td>{shirt.shirtSize}</td>
                                    <td>${shirt.price}</td>
                                    <td>{shirt.warehouse.name}</td>
                                    <td><button className='deleteBtn' onClick={() => {deleteById(shirt.id)}}>Delete</button></td>
                                </tr>
                            )
                        ) : (<tr><td colSpan='4'>Loading...</td></tr>) 
                    }
                </tbody>
            </table>
        </>
    )

}

export default Shirt;