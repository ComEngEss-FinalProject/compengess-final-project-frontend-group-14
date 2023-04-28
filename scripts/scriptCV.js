
const backendIPAddress = '127.0.0.1:3000';
const frontendIPAddress = '127.0.0.1:5500';

const authorizeApplication = () => {
    window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

let assignmentsObj;
let userID = "";

const login = (event) => {
    window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

const goToLoginPage = async () => {
    document.querySelector("title").innerHTML = "Please Login";
    document.body.innerHTML = `
    <div class="mcv-login">
        <img src="./images/MyCourseVille.png" alt="">
    </div>

    <div class="login-container">
        <h1> ourCourseVille </h1>
        <h3>Sign in your profile</h3>
        <div id="login">
            <p>Login</p>
        </div>
    </div>
    `;
    document.getElementById("login").addEventListener("click", login);
}



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
        .catch((error) => {
            console.log(error);
            goToLoginPage();
        });
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
        .catch((error) => {
            console.log(error);
            goToLoginPage();
        });
}

const logout = async () => {
    window.location.href = `http://${backendIPAddress}/courseville/logout`;
};


export { authorizeApplication, getUserProfile, getAllAssignments, login, logout, assignmentsObj, userID };