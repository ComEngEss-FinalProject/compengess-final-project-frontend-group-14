
const backendIPAddress = '127.0.0.1:3000';

const authorizeApplication = () => {
    window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

let assignmentsObj, loginStatus = false;
let userID="";

const getUserProfile = async () => {
    const options = {
        method: 'GET',
        credentials: 'include',
    };
    await fetch(`http://${backendIPAddress}/courseville/get_profile_info`, options)
        .then((response) => response.json())
        .then((data) => {
            userID = data.student.id;
            document.querySelector("#info>img").setAttribute("src", `${data.account.profile_pict}`);
            document.querySelectorAll("#info > p")[0].innerHTML = `${data.student.id}`;
            document.querySelectorAll("#info > p")[1].innerHTML = `${data.student.firstname_th} ${data.student.lastname_th}`;
        })
        .catch((error) => console.error(error));
};

const getAllAssignments = async () => {
    const options = {
        mehtod: 'GET',
        credentials: 'include',
    }
    await fetch(`http://${backendIPAddress}/courseville/getAllAssignments`, options)
        .then((response) => response.json())
        .then((data) => {
            assignmentsObj = data;
        })
        .catch((error) => console.log(error));
}

const logout = async () => {
    window.location.href = `http://${backendIPAddress}/courseville/logout`;
  };


export { authorizeApplication ,getUserProfile, getAllAssignments, logout, assignmentsObj, loginStatus, userID };