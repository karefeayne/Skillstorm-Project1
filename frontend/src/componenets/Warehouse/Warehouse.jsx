import { Link } from 'react-router-dom';
import './Warehouse.css'
import { useState, useEffect } from "react";

function Warehouse() {

    const url = "http://localhost:8080/warehouses"

    const [warehouses, setWarehouses] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        fetch(url)
        .then(data => data.json())
        .then(returnedData => {
            setWarehouses(returnedData);
            setLoaded(true)
        })
        .catch(err => {alert(err); console.log(err)})


    }, [])

    return (
        <>
        <table>
            <thead>
                <tr>
            {loaded ?
                warehouses.map(
                    warehouse => (
                        <th key={warehouse.id}>
                            <h2>{warehouse.name}</h2>
                            <Link to={'/shirts'}>
                                <div className="warehouseContainer">
                                State: {warehouse.state} <br />
                                City: {warehouse.city} <br />
                                Capacity: {warehouse.capacity}
                                </div>
                            </Link>
                        </th>
                    )
                )
                : <th colSpan={warehouses.length}>Loading...</th>
            }
            </tr>
            </thead>
        </table>
        </>
    )

}

export default Warehouse