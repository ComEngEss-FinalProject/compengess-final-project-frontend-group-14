
import { userID } from '../scripts/scriptCV.js';


const backendIPAddress = '127.0.0.1:3000';

let itemsData;

const getItemFromDB = async () => {
    const options = {
        method: 'GET',
        credentials: 'include',
    };

    await fetch(`http://${backendIPAddress}/courseville/getAssignmentSent`, options)
        .then((response) => response.json())
        .then((data) => {
            itemsData = data;
        })
        .catch((error) => console.error(error))
}

const addItem = async (assignmentID) => {
    const itemToAdd = {
        user_id : userID,
        assignment_id: assignmentID
    }

    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itemToAdd)
    }
    await fetch(`http://${backendIPAddress}/courseville/addAssignment`, options)
        .then((response) => console.log(response))
        .catch((error) => console.error(error))

}

export { itemsData, getItemFromDB, addItem }