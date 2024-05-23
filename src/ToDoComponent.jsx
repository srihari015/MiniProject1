import { useEffect, useState } from "react";
import './custom-style.css';


function GroceryList({ userId, setPageTab }) {
    const [groceries, setGroceries] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        fetchGroceries();
    }, []);

    const fetchGroceries = () => {
        fetch(`http://localhost:3434/user/items/${userId}`)
            .then(response => response.json())
            .then(result => {
                if (result.status) {
                    setGroceries(result.data.items);
                } else {
                    alert(result.msg);
                }
            })
            .catch(error => console.error(error));
    };

   
    const saveGroceries = () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": userId,
                "items": groceries
            })
        };

        fetch("http://localhost:3434/user/items", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status) {
                    alert(result.msg);
                } else {
                    alert(result.msg);
                }
            })
            .catch(error => console.error(error));
    };

    const handleAddBtn = () => {
        if (inputValue !== "") {
            setGroceries([...groceries, inputValue]);
            setInputValue("");
        }
    };

    
    const handleDeleteItem = (deleteIdx) => {
        const updatedList = groceries.filter((item, index) => index !== deleteIdx);
        setGroceries(updatedList);
    };

   
    const handleEditItem = (editIdx) => {
        const updatedContent = prompt("Enter the new item");
        if (updatedContent !== null) {
            const updatedList = [...groceries];
            updatedList[editIdx] = updatedContent;
            setGroceries(updatedList);
        }
    };

    return (
        <div className="grocery-list-app">
            <button onClick={() => setPageTab("welcome")}>Log Out</button>
            <br />
            <button onClick={saveGroceries}>Save</button>
            <br />
            <label>Grocery Items:</label>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={handleAddBtn}>Add</button>
            <ul>
                {groceries.map((item, index) => (
                    <li key={index}>
                        <div className="item">
                            <span>{item}</span>
                            <div style={{ minWidth: '150px' }}>
                                <button onClick={() => handleEditItem(index)}>Edit</button>
                                <button onClick={() => handleDeleteItem(index)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GroceryList;
