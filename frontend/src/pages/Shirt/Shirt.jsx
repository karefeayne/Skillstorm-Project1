import { useState } from "react";
import { useEffect } from "react";

function Shirt() {

    const url = "http://localhost:8080/shirts"

    const [shirts, setShirts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        fetch(url)
        .then(data => data.json())
        .then(returnedData => {
            setShirts(returnedData);
            setLoaded(true)
        })
        .catch(err => {alert(err); console.log(err)})


    }, [])

    return (
        <>
            <table>
                <thead>
                    <tr><th>Id</th><th>Shirt Type</th><th>Shirt Color</th><th>Shirt Size</th></tr>
                </thead>
                <tbody>
                    {loaded ?
                        shirts.map(
                            shirt => (
                                <tr key={shirt.id}>
                                    <td>{shirt.id + 1}</td>
                                    <td>{shirt.shirtType}</td>
                                    <td>{shirt.shirtColor}</td>
                                    <td>{shirt.shirtSize}</td>
                                </tr>
                            )
                        ) : (<tr><td colSpan='4'>Loading...</td></tr>) 
                    }
                </tbody>
            </table>
        
        </>
    )

}

export default Shirt