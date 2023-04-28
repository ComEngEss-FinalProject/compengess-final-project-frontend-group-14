
import { addItem } from "../scripts/scriptItems";


async function drawAssignment(assignments, currentProperty) {
    assignments.sort(dateSort);
    setStatus(currentProperty.status);
    const assignmentList = document.getElementById("assignment");
    assignmentList.innerHTML = ``;
    for (let i = 0; i < assignments.length; i++) {
        if (currentProperty.courseID !== "All" && currentProperty.courseID != assignments[i].courseID)
            continue;
        if (currentProperty.status !== 0 && (currentProperty.status === 1) === assignments[i].status)
            continue;
        if (currentProperty.semester !== 0 && currentProperty.semester != assignments[i].courseSemester)
            continue;
        addAssignment(assignments[i]);
    }
}

async function setStatus(courseStatus) {
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

function htmlToElement(html) {
    const template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content;
}

async function addAssignment(assignment) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const assignmentList = document.getElementById("assignment");
    const statusImgUrl = (assignment.status === false ? "uncheck.png" : "check.png");
    const date = assignment.date.day + " " + months[assignment.date.month] + " " + assignment.date.year;
    const assignmentID = assignment.assignment_id;

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

        if (isLate)
            finishedStatus = "late";
    }

    const assignmentCount = document.querySelectorAll(".subject").length + 1;

    const singleAssignment = htmlToElement(`
    <div class="subject ${finishedStatus}" id="${assignmentID}" style="--i: ${assignmentCount};">
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
                <img class="status-img" src="./images/${statusImgUrl}" alt="status-img">
            </div>
    </div>
    `).firstChild;

    singleAssignment.querySelector(".status-img").addEventListener("click", async (event) => {
        event.stopPropagation();
        const statusImgUrl = (assignment.status === false ? "check.png" : "uncheck.png");
        const imgUrl = `./images/${statusImgUrl}`;
        singleAssignment.querySelector(".status-img").setAttribute("src", imgUrl);

        if (!assignment.status) {
            singleAssignment.classList.remove("late");
            singleAssignment.classList.add("finished");
            assignment.status = true;

            //POST to DB
            addItem(assignment.assignment_id);
        }
        else {
            singleAssignment.classList.remove("finished");

            let finishedStatus = "";
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

            if (isLate)
                finishedStatus = "late";

            assignment.status = false;
            singleAssignment.classList.add(finishedStatus);

            // DELTE to DB

        }
    })

    singleAssignment.addEventListener("click", async (event) => {
        event.stopPropagation();
        document.getElementById("background").classList.add("popup-bg-in");
        const popup = document.getElementById("popup-block");
        popup.classList.add("popup");

        if (popup.classList.contains("popup-out"))
            popup.classList.remove("popup-out");

        if (document.getElementById("background").classList.contains("popup-bg-out"))
            document.getElementById("background").classList.remove("popup-bg-out");

        const assignmentPopup = htmlToElement(`
        <div id="close-button">
            <img src="./images/close.png" alt="close-button">
        </div>
        <div class="course-img">
            <img src="${assignment.imgUrl}" alt="course image">
        </div>
        <div class="assignment-title">
            <h1>${assignment.courseName}</h1>
            <h2>${assignment.title}</h2>
        </div>
        <div class="assignment-desc">
            ${assignment.detail}
        </div>
        `);



        const closePopup = (event) => {
            event.stopPropagation();

            popup.classList.remove("popup");
            popup.classList.add("popup-out");

            document.getElementById("background").classList.remove("popup-bg-in");
            document.getElementById("background").classList.add("popup-bg-out");

            popup.innerHTML = ``;
        }
        assignmentPopup.getElementById("close-button").addEventListener("click", closePopup);
        document.getElementById("background").addEventListener("click", closePopup);


        popup.appendChild(assignmentPopup);
    });
    assignmentList.appendChild(singleAssignment);

}

export { drawAssignment };
