
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function drawCourseAssignment(assignments, courseID) {
    assignments.sort(dateSort);
    const assignmentList = document.getElementById("assignment");
    assignmentList.innerHTML = ``;
    for(let i = 0; i<assignments.length; i++) {
        if(courseID !== assignments[i].courseID )
            continue;
        addAssignment(assignments[i]);
    }
}

function drawAllAssignment(assignments) {
    assignments.sort(dateSort);
    const assignmentList = document.getElementById("assignment");
    assignmentList.innerHTML = ``;
    for (let i = 0; i < assignments.length; i++) 
        addAssignment(assignments[i]);
}


function dateSort(a, b) {
    a = a.date, b = b.date;
    if(a.year !== b.year) return a.year - b.year;
    if(a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
}
function addAssignment(assignment) {
    const assignmentList = document.getElementById("assignment");
    const finishedStatus = (assignment.status === false?"":"finished");
    const statusImgUrl = (assignment.status === false?"uncheck.png":"check.png");
    const date = assignment.date.day + " " + months[assignment.date.month-1] + " " + assignment.date.year
    
    assignmentList.innerHTML +=
        `<div class="subject ${finishedStatus}">
            <div>
                <p>${date}</p>
            </div>

            <div>
                <img src="./images/${assignment.imgUrl}" alt="">
                <p>${assignment.courseName}</p>
            </div>

            <div>
                <p>${assignment.title}</p>
            </div>

            <div>
                <img src="./images/${statusImgUrl}" alt="status-img">
            </div>
        </div>`;
}

export {drawAllAssignment, drawCourseAssignment};
