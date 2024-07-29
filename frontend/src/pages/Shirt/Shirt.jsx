import { useState } from "react";
import { useEffect } from "react";

function Shirt() {

    const url = "http://localhost:8080/shirts"

    const [shirts, setShirts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [finished, setFinished] = useState(false);
    let count = 0;

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
                    <tr><th>Count= {count}</th><th>Shirt Type</th><th>Shirt Color</th><th>Shirt Size</th><th>Edit</th></tr>
                </thead>
                <tbody>
                    {loaded ?
                        shirts.map(
                            shirt => (
                                <tr key={shirt.id}>
                                    <td>{++count}</td>
                                    <td>{shirt.shirtType}</td>
                                    <td>{shirt.shirtColor}</td>
                                    <td>{shirt.shirtSize}</td>
                                    <td><button>Delete</button></td>
                                </tr>
                            )
                        ) : (<tr><td colSpan='4'>Loading...</td></tr>) 
                    }
                </tbody>
            </table>
            {/* {() => setFinished(!finished)} */}  {/* TODO: fix total count display at the end of table rendering*/}
        
        </>
    )

}

export default Shirt