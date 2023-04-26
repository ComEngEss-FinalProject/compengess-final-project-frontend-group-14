
import { drawAssignment } from './assignment.js';

function htmlToElement(html) {
    const template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content;
}

async function drawAllSignedCourse(courses, assignments, currentCourseID, currentStatus) {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ``;
    for (let i = 0; i < courses.length; i++) {
        const courseElement = htmlToElement(`
        <div class="course" id="${courses[i].courseID}">
            <div>
                <img src="${courses[i].imgUrl}" alt="">
                <p>${courses[i].courseName}</p>
            </div>
        </div>`).firstChild;
        courseElement.addEventListener("click", async (event) => {
            const id = courseElement.id;
            if (courseElement.classList.contains("course-selected")) { // deselected when click again
                courseElement.classList.remove("course-selected");
                currentCourseID = "All";
                drawAssignment(assignments, currentCourseID, currentStatus);
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
            else {
                for (let i = 0; i < document.querySelectorAll(".course").length; i++)
                    document.querySelectorAll(".course")[i].classList.remove("course-selected");
                courseElement.classList.add("course-selected");
                currentCourseID = id;
                window.scrollTo({ top: 0, behavior: 'instant' });
                drawAssignment(assignments, currentCourseID, currentStatus);
            }
        })
        courseList.appendChild(courseElement);
    }
}

// Have Bug!!!
async function drawAllYears(courses, assignments, currentCourseID, currentStatus, currentYear) {
    const yearList = document.getElementById("year-list");
    yearList.innerHTML = ``;
    let uniqueYear = courses.filter((val, idx, ar) => {
        for (let cur = 0; cur < ar.length; cur++) {
            if (ar[cur].courseYear == val.courseYear)
                return idx == cur;
        }
        return true;
    });
    console.log("uniqueYear", uniqueYear);
    for (const nowYear of uniqueYear) {
        const yearElement = htmlToElement(`
            <div class="year" id="Y-${nowYear}">
                <div>
                    <p>2022</p>
                </div>
            </div>
        `).firstChild;

        yearElement.addEventListener("click", (event) => {
            const id = yearElement.id;
            if (yearElement.classList.contains("year-selected")) { // deselected when click again
                yearElement.classList.remove("year-selected");
                currentCourseID = "All";
                drawAssignment(assignments, currentCourseID, currentStatus);
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
            else {
                for (let i = 0; i < document.querySelectorAll(".year").length; i++)
                    document.querySelectorAll(".year")[i].classList.remove("year-selected");
                yearElement.classList.add("year-selected");
                currentCourseID = id;
                window.scrollTo({ top: 0, behavior: 'instant' });
                drawAssignment(assignments, currentCourseID, currentStatus);
            }
        })
        yearList.appendChild(yearElement);
    }
}

export { drawAllSignedCourse, drawAllYears };