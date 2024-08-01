import './DisplayShirt.css'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Label, Form, Button, Select, Alert, TextInput } from "@trussworks/react-uswds";


function DisplayShirts() {
    const { state } = useLocation()
    const { warehouse } = state;

    // console.log(warehouse.id)

    const url = "http://localhost:8080/warehouses/" + warehouse.id + "/shirts"

    const[shirts, setShirts] = useState([]);
    const[shirtLoaded, setShirtLoaded] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [created, setCreated] = useState(false);
    let count = 0;


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
        const deleteUrl = "http://localhost:8080/shirts" + "/" +shirt_id;
        // console.log(deleteUrl);

        fetch(deleteUrl, {method: 'DELETE'})
        .then(() => {
            setDeleted(!deleted);
        })
        .catch(err => console.log(err))
        
    }

    function addShirt(e) {
        e.preventDefault();

        const createUrl = "http://localhost:8080/shirts"
        
        const data = new FormData(e.target);

        const newShirt = {
            shirtType: data.get("shirtType"),
            shirtColor: data.get("shirtColor"),
            shirtSize: data.get("shirtSize"),
            price: data.get("shirtPrice"),
            warehouse: {
                id: warehouse.id
            }
        }

        let quantity = data.get("quantityInput")

        for (let i = 0; i < quantity; i++) {

            fetch(createUrl, {
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
    
    return (
        <>
            <div className='addContainer'>
                <h3 className='highlightValue'>Total Shirts = {shirts.length}</h3>
                <Form onSubmit={addShirt}>
                <table id='addTable'>
                    <tbody>
                        <tr>
                            <td>Quantity: <TextInput className='quantityInput' name='quantityInput' type="number" min={1} defaultValue={1} /></td>
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
                            <td><Button className='addBtn' type='submit'>Add Shirt(s)</Button></td>
                        </tr>
                    </tbody>
                </table>
            </Form>
            </div>
           
            <div className='innerTableContainer'>
        <table>
            <thead>
                <tr><th>Item #</th><th>Shirt Type</th><th>Shirt Color</th><th>Shirt Size</th><th>Seling Price</th><th></th></tr>
            </thead>
            <tbody>
            {shirtLoaded ? shirts.length > 0 ? 
                        shirts.map(
                            shirt => (
                                <tr key={shirt.id} className='innerTableRow'>
                                    <td>{++count}</td>
                                    <td>{shirt.shirtType}</td>
                                    <td>{shirt.shirtColor}</td>
                                    <td>{shirt.shirtSize}</td>
                                    <td>${shirt.price}</td>
                                    <td><button className='deleteBtn' onClick={() => {deleteById(shirt.id)}}>Delete</button></td>
                                </tr>
                            )
                          
                        ) :  (<tr><td colSpan='6'><h2>No Shirts In This Warehouse</h2></td></tr>)
                        : (<tr><td colSpan='6'>Loading...</td></tr>) 
                    }
                </tbody>
        </table>
        </div>

        </>
    )
}

export default DisplayShirts