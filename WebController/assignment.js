
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


function drawAssignment(assignments, courseID, courseStatus) {
    assignments.sort(dateSort);
    setStatus(courseStatus);
    const assignmentList = document.getElementById("assignment");
    assignmentList.innerHTML = ``;
    let count = 0;
    for (let i = 0; i < assignments.length; i++) {
        if (courseID !== "All" && courseID != assignments[i].courseID)
            continue;
        if (courseStatus !== 0 && (courseStatus === 1) === assignments[i].status)
            continue;
        addAssignment(assignments[i], ++count);
    }
}

function setStatus(courseStatus) {
    const colors = ["status-all", "status-unfinished", "status-finished"];
    const statusTag = document.getElementById("status");
    for (let i = 0; i < colors.length; i++)
        if (statusTag.classList.contains(colors[i]))
            statusTag.classList.remove(colors[i]);
    statusTag.classList.add(colors[courseStatus]);
}

function dateSort(left, right) {
    const a = left.date, b = right.date;
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    if (a.day != b.day) return a.day - b.day;
    return right.dueTime - left.dueTime;
}
function addAssignment(assignment, assignmentCount) {
    const assignmentList = document.getElementById("assignment");
    const statusImgUrl = (assignment.status === false ? "uncheck.png" : "check.png");
    const date = assignment.date.day + " " + months[assignment.date.month] + " " + assignment.date.year

    let finishedStatus = (assignment.status === false ? "" : "finished");
    if (finishedStatus === "") {
        let isLate = false;
        const currentDate = new Date();
        if (currentDate.getFullYear() != assignment.date.year)
            isLate = currentDate.getFullYear() > assignment.date.year
        else if (currentDate.getMonth() != assignment.date.month)
            isLate = currentDate.getMonth() > assignment.date.month;
        else if (currentDate.getDate() != assignment.date.day)
            isLate = currentDate.getDate() > assignment.date.day;
        else // send assignment today
            finishedStatus = "due-today";

        if(isLate)
            finishedStatus = "late";
    }

    assignmentList.innerHTML +=
        `<div class="subject ${finishedStatus}" style="--i: ${assignmentCount};">
            <div>
                <p>${date}</p>
            </div>

            <div>
                <img src="${assignment.imgUrl}" alt="">
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

export { drawAssignment };
