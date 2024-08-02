import './Shirt.css'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { Label, Form, Button, Select, Alert, TextInput } from "@trussworks/react-uswds";

function Shirt() {

    const { state } = useLocation()
    //const { warehouse } = state;

    //{console.log("In Shirts")}

    const shirtUrl = "http://localhost:8080/shirts"
    const warehouseUrl = "http://localhost:8080/warehouses"

    const [shirts, setShirts] = useState([]);
    const [shirtLoaded, setShirtLoaded] = useState(false);
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseLoaded, setWarehouseLoaded] = useState(false);
    const [warehouseView, setWarehouseView] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [created, setCreated] = useState(false);
    const [reload, setReload] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)
    const [searchVals, setSearchVals] = useState([])

    const shirtTypes = ["Polo", "V-Neck", "Crewneck", "Long Sleeve"]
    const shirtColors = ["Blue", "Black", "White", "Orange"]
    const shirtSizes = ["Small", "Medium", "Large"]
    const shirtPrices = ["5.99", "9.99"]
    let shirtWarehouses = []

    let optionsArr = []
    let selectOptions = ""

    let count = 0;
    let capacities = {}
    let cancel = false

    let storedVals = []

    useEffect(() => {
        fetch(warehouseUrl)
        .then(data => data.json())
        .then(returnedData => {
            setWarehouses(returnedData);
            setWarehouseLoaded(true)
        })
        .catch(err => {alert(err); console.log(err)})

    }, [])

    // useEffect(() => {

    //     fetch(shirtUrl)
    //     .then(data => data.json())
    //     .then(returnedData => {
    //         setShirts(returnedData.reverse());
    //         setShirtLoaded(true)
    //     })
    //     .catch(err => {alert(err); console.log(err)})

    //     console.log("rendering")


    // }, [deleted, created, reload])


    useEffect(() => {

        let properUrl = ""

        if (state != null && firstLoad == true) {
            // console.log("Not null")
            // console.log(state.warehouse.id)
            properUrl = warehouseUrl + "/" + state.warehouse.id + "/shirts"
        } 
        else 
        {
            // console.log("null")
            properUrl = shirtUrl
        }

        console.log(properUrl)

        fetch(properUrl) // + "/" + warehouse.id + "/shirts")
        .then(data => data.json())
        .then(returnedData => {
            setShirts(returnedData.reverse());
            setShirtLoaded(true)
        })
        .catch(err => {alert(err); console.log(err)})

    }, [deleted, created, reload, firstLoad, state])


    function deleteById(shirt) {
        let shirt_id = shirt.id
        const deleteUrl = shirtUrl + "/" +shirt_id;
        // console.log(deleteUrl);

        capacities[shirt.warehouse.id][0] -= 1

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
        let wareId = data.get("warehouse")    

        console.log(searchVals)


        if (shirts.length != 0) {

            if(capacities[wareId][0] < capacities[wareId][1]){

                for (let i = 0; i < quantity; i++) {
                    capacities[wareId][0] += 1
                }

                if (capacities[wareId][0] <= capacities[wareId][1]) {

                    for (let i = 0; i < quantity; i++) {

                        fetch(shirtUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newShirt)
                        })
                        .then(() => setCreated(!created))
                        .catch(err => {console.log(err)})

                    }

                    reset()

                    e.target.reset();
                }
                else {
                    for (let i = 0; i < quantity; i++) {
                        capacities[wareId][0] -= 1
                    }
                    toast.warning("Not enough space in warehouse selected to add (" + quantity + ") shirts. It can hold (" + (capacities[wareId][1] - capacities[wareId][0]) + ") more",
                        {
                            theme: "dark"
                        }
                    )
                }
            }
            else {
                toast.error('Warehouse is full', {
                    theme: "dark"
                })
            }
        }
        else {
            fetch(shirtUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newShirt)
            })
            .then(() => setCreated(!created))
            .catch(err => {console.log(err)})

            reset()

            e.target.reset();
        }       

    
    }

    function handleChange(e) {
        e.preventDefault();


        if (e.target.value == "select") {
            document.getElementById("idInput").hidden = true
            document.getElementById("searchInput").hidden = false
            optionsArr = []
        }
        else if(e.target.value == "byType") {
            document.getElementById("idInput").hidden = true
            document.getElementById("searchInput").hidden = false
            optionsArr = shirtTypes
        }
        else if(e.target.value == "byColor") {
            document.getElementById("idInput").hidden = true
            document.getElementById("searchInput").hidden = false
            optionsArr = shirtColors
        }
        else if(e.target.value == "bySize") {
            document.getElementById("idInput").hidden = true
            document.getElementById("searchInput").hidden = false
            optionsArr = shirtSizes
        }
        else if(e.target.value == "byPrice") {
            document.getElementById("idInput").hidden = true
            document.getElementById("searchInput").hidden = false
            optionsArr = shirtPrices
        }
        else if(e.target.value == "byId") {
            document.getElementById("idInput").hidden = false
            document.getElementById("idInput").defaultValue = 1
            document.getElementById("searchInput").hidden = true
            console.log("By Id")
        }
        else if(e.target.value == "warehouse") {
            document.getElementById("idInput").hidden = true
            document.getElementById("searchInput").hidden = false
            for (let i = 0; i < warehouses.length; i++) {
                shirtWarehouses.push(warehouses[i].name)
            }
            optionsArr = shirtWarehouses
            shirtWarehouses = []
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
        let searchId = data.get("idInput")

        console.log(searchType)
        console.log(searchValue)
        console.log(searchId)


        if (searchType == "select") {
            toast.warning("Please select an option to search by first",
                {
                    theme: "dark"
                }
            )
        }
        else {
            let searchUrl = shirtUrl
            if (searchType == "byId") {
                if (searchId == null) {
                    toast.error("Please enter an ID", {theme:"dark"})
                }
                    else {
                    searchUrl += "/" + searchId
                    console.log(searchUrl)
                    setShirtLoaded(false)
                    fetch(searchUrl)
                    .then(data => data.json())
                    .then(returnedData => {
                        setShirts([returnedData]);
                        setShirtLoaded(true)
                    })
                    .catch(err => {
                        toast("No shirt with id: {" + searchId + "} exists",{theme:"dark"}); console.log(err)
                        setShirts([])
                        setShirtLoaded(true)
                        setReload(true)
                    })
                    setSearchVals([searchType, searchValue])
                }
            }
            else {
                searchUrl += "/" + searchType + "/" + searchValue
                console.log(searchUrl)
                setShirtLoaded(false)
                fetch(searchUrl)
                .then(data => data.json())
                .then(returnedData => {
                    setShirts(returnedData);
                    setShirtLoaded(true)
                })
                .catch(err => {alert(err); console.log(err)})
                setSearchVals([searchType, searchValue])
                console.log(shirts)
            }
            
        }
    }

    function reset() {
        setSearchVals([])
        document.getElementById("by").value = ""
        document.getElementById("searchInput").innerHTML = ""
        setFirstLoad(false)
        setReload(!reload)  
    }

    function handleEdit(shirt) {  
        
        let btn = document.getElementById("editBtn" + shirt.id)

        if (cancel == false) {
            storedVals.push(document.getElementById("shirtType" + shirt.id).value)
            storedVals.push(document.getElementById("shirtColor" + shirt.id).value)
            storedVals.push(document.getElementById("shirtSize" + shirt.id).value)
            storedVals.push(document.getElementById("shirtPrice" + shirt.id).value)
            storedVals.push(document.getElementById("warehouseId" + shirt.id).value)


            document.getElementById("shirtType" + shirt.id).disabled = false
            document.getElementById("shirtColor" + shirt.id).disabled = false
            document.getElementById("shirtSize" + shirt.id).disabled = false
            document.getElementById("shirtPrice" + shirt.id).disabled = false
            document.getElementById("warehouseId" + shirt.id).disabled = false

            btn.innerHTML = "Cancel"
            btn.style.backgroundColor = "red"
            cancel = true
        }
        else {
            document.getElementById("shirtType" + shirt.id).value = storedVals[0]
            document.getElementById("shirtColor" + shirt.id).value = storedVals[1]
            document.getElementById("shirtSize" + shirt.id).value = storedVals[2]
            document.getElementById("shirtPrice" + shirt.id).value = storedVals[3]
            document.getElementById("warehouseId" + shirt.id).value = storedVals[4]


            document.getElementById("shirtType" + shirt.id).disabled = true
            document.getElementById("shirtColor" + shirt.id).disabled = true
            document.getElementById("shirtSize" + shirt.id).disabled = true
            document.getElementById("shirtPrice" + shirt.id).disabled = true
            document.getElementById("warehouseId" + shirt.id).disabled = true

            

            btn.innerHTML = "Edit"
            btn.style.backgroundColor = "darkviolet"
            cancel = false
        }

    //    document.getElementById("shirtType" + shirt.id).disabled = false
    //    document.getElementById("shirtColor" + shirt.id).disabled = false
    //    document.getElementById("shirtSize" + shirt.id).disabled = false
    //    document.getElementById("shirtPrice" + shirt.id).disabled = false
    //    document.getElementById("warehouseId" + shirt.id).disabled = false
    //    document.getElementById("confirmBtn" + shirt.id).removeAttribute("disabled")
    }

    function updateShirt(shirt) {

        if (document.getElementById("shirtType" + shirt.id).disabled == false) {

            let btn = document.getElementById("editBtn" + shirt.id)
            btn.innerHTML = "Edit"
            btn.style.backgroundColor = "darkviolet"


        let shirtType = document.getElementById("shirtType" + shirt.id).value
        let shirtColor = document.getElementById("shirtColor" + shirt.id).value
        let shirtSize = document.getElementById("shirtSize" + shirt.id).value
        let shirtPrice = document.getElementById("shirtPrice" + shirt.id).value
        let warehouse = document.getElementById("warehouseId" + shirt.id).value

        let putHouse = {}

        for (let i = 0; i < warehouses.length; i++) {
            if (warehouses[i].id == warehouse) {
                putHouse = warehouses[i]
                i = warehouses.length
            }
        }

        // console.log(putHouse)
        
        // console.log(shirtType)
        // console.log(shirtColor)
        // console.log(shirtSize)
        // console.log(shirtPrice)
        // console.log(warehouse)

        const newShirt = {
            id: shirt.id,
            shirtType: shirtType,
            shirtColor: shirtColor,
            shirtSize: shirtSize,
            price: shirtPrice,
            warehouse: putHouse
        }


        fetch(shirtUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newShirt)
        })
        .then(() => setReload(!reload))
        .catch(err => {
            console.log(err)
        })

        document.getElementById("shirtType" + shirt.id).disabled = true
        document.getElementById("shirtColor" + shirt.id).disabled = true
        document.getElementById("shirtSize" + shirt.id).disabled = true
        document.getElementById("shirtPrice" + shirt.id).disabled = true
        document.getElementById("warehouseId" + shirt.id).disabled = true

        toast.info("Updated Shirt with ID: " + shirt.id, {
            theme:"dark"
        })
    }
    else {
        toast.info("Edit a shirt before confirming",
            {
                theme: "dark"
            }
        )
    }
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
                            <td>Quantity: <TextInput className='quantityInput' name='quantityInput' type="number" min={1} defaultValue={1} max={999} /></td>
                            <td>
                                Type: <Select name="shirtType" id="shirtType">
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
                                    {warehouseLoaded && (warehouses.length != 0) ?
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
            <Form onSubmit={search} onReset={reset}>
                <table className='searchTable'>
                    <tbody>
                    <tr>
                    <td>
                    Search By: <select onChange={handleChange} name="by" id="by">
                        <option value="select"></option>
                        <option value="byType">Type</option>
                        <option value="byColor">Color</option>
                        <option value="bySize">Size</option>
                        <option value="byPrice">Price</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="byId">ID</option>
                    </select>
                    </td>
                    <td>
                    <select name="searchInput" id="searchInput">
                    </select>
                    </td>
                    <td><TextInput className='quantityInput' name="idInput" id="idInput" type='number' min={1} hidden></TextInput></td>
                    <td><button className='searchButton' type="submit">Search</button></td>
                    <td><button className='resetButton' type='reset'>Reset</button></td>
                </tr>
                </tbody>
                </table>
                </Form>
                <br />
            </div>




            <span className='displayingMessage'>Displaying Shirts</span>


            

            
            <div className='innerTableContainer'>
            <Form>
            <table cellSpacing={0} cellPadding={0}>
                <thead>
                    <tr><th></th><th>Item #</th><th>Item ID</th><th>Shirt Type</th><th>Shirt Color</th><th>Shirt Size</th><th>Seling Price</th><th>Warehouse</th><th></th><th></th></tr>
                </thead>
                <tbody>
                    {shirtLoaded ? shirts.length != 0 ?
                        shirts.map(
                            shirt => ( 
                                <tr key={shirt.id} className='innerTableRow'>
                                    <td><button className='deleteBtn' type='button' onClick={() => {deleteById(shirt)}}>Delete</button></td>
                                    
                                    <td>{++count}</td>
                                    <td name="shirtID" id="shirtId">{shirt.id}</td>
                                    <td>
                                        <select name="shirtType" id={"shirtType" + shirt.id} defaultValue={shirt.shirtType} disabled>
                                            <option value="Polo">Polo</option>
                                            <option value="V-Neck">V-Neck</option>
                                            <option value="Crewneck">Crewneck</option>
                                            <option value="Long Sleeve">Long Sleeve</option>
                                        </select></td>
                                        <td>
                               <Select name="shirtColor" id={"shirtColor" + shirt.id} defaultValue={shirt.shirtColor} disabled>
                                    <option value="Blue">Blue</option>
                                    <option value="Black">Black</option>
                                    <option value="White">White</option>
                                    <option value="Orange">Orange</option>
                                </Select>
                            </td>
                            <td>
                                <Select name="shirtSize" id={"shirtSize" +  shirt.id} defaultValue={shirt.shirtSize} disabled>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </Select>
                            </td>
                            <td>
                                <Select name="shirtPrice" id={"shirtPrice" + shirt.id} defaultValue={shirt.shirtPrice} disabled>
                                    <option value="5.99">5.99</option>
                                    <option value="9.99">9.99</option>
                                </Select>
                            </td>
                            <td>
                                <Select name="warehouseId" id={"warehouseId" + shirt.id} defaultValue={shirt.warehouse.id} disabled>
                                    {
                                        warehouses.map(
                                            warehouse => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                                        )
                                    }
                                </Select>
                                {/* <td>{shirt.warehouse.name}</td> */}
                                </td>
                                <td><button id={"editBtn" + shirt.id} className='editBtn' type='button' onClick={() => handleEdit(shirt)}>Edit</button></td>
                                <td><button id={'confirmBtn' + shirt.id} className='confirmBtn' type='button' onClick={()=>(updateShirt(shirt))}>Confirm</button></td>
                                </tr>
                            )
                        ) : (<tr><td colSpan='10'><h2>No Shirts Found</h2></td></tr>) 
                        : (<tr><td colSpan='10'>Loading...</td></tr>) 
                    }
                </tbody>
            </table>
            
            </Form>
            <div className='bottomScript'>
                    {
                        warehouses.map(
                            warehouse => capacities[warehouse.id] = [0, warehouse.capacity, warehouse.name]
                        )
                    }
                    {
                        
                        shirts.map(
                            shirt => {
                                capacities[shirt.warehouse.id][0] += 1
                                //console.log(capacities[shirt.warehouse.id])
                            }
                        )
                    }
                    </div>
            </div>
        </>
    )
}

export default Shirt;