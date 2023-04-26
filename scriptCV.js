
const backendIPAddress = '127.0.0.1:3000';

const authorizeApplication = () => {
    window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

let assignmentsObj;

const getUserProfile = async () => {
    const options = {
        method: 'GET',
        credentials: 'include',
    };
    await fetch(`http://${backendIPAddress}/courseville/get_profile_info`, options)
        .then((response) => response.json())
        .then((data) => {
            document.querySelectorAll("#info > p")[1].innerHTML = `${data.user.firstname_th} ${data.user.lastname_th}`;
        })
        .catch((error) => console.error(error));
};

const getAllAssignments = async (year, semester) => {
    year = year==0 ? "" : `year=${year}`;
    semester = semester==0 ? "" : `semester=${semester}`;
    
    let qry = "";
    if(year != "" && semester != "") qry = `?${year}&${semester}`;
    else if(year != "") qry = `?${year}`;
    else if(semester != "") qry = `?${semester}`;

    console.log("get data ", qry);

    const options = {
        mehtod: 'GET',
        credentials: 'include',
    }
    await fetch(`http://${backendIPAddress}/courseville/getAllAssignments${qry}`, options)
        .then((response) => response.json())
        .then((data) => {
            assignmentsObj = data;
        })
        .catch((error) => console.log(error));
}

const logout = async () => {
    window.location.href = `http://${backendIPAddress}/courseville/logout`;
  };


export { authorizeApplication ,getUserProfile, getAllAssignments, logout, assignmentsObj  };