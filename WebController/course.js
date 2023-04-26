
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
    for(let i=0; i<courses.length; i++) {
        const course = htmlToElement( `
        <div class="course" id="${courses[i].courseID}">
            <div>
                <img src=${courses[i].imgUrl} alt="">
                <p>${courses[i].courseName}</p>
            </div>
        </div>`).firstChild;
        course.addEventListener("click", async (event)=> {
            const id = course.id;
            if (course.classList.contains("course-selected")) { // deselected when click again
                course.classList.remove("course-selected");
                currentCourseID = "All";
                drawAssignment(assignments, currentCourseID, currentStatus);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else {
                for (let i = 0; i < document.querySelectorAll(".course").length; i++)
                    document.querySelectorAll(".course")[i].classList.remove("course-selected");
                course.classList.add("course-selected");
                currentCourseID = id;
                window.scrollTo({ top: 0, behavior: 'instant' });
                drawAssignment(assignments, currentCourseID, currentStatus);
            }
        })
        courseList.appendChild(course);
    }
}

async function drawAllYears(courses) {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ``;
    for(let i=0; i<courses.length; i++) {
        courseList.innerHTML += 
        `
        <div class="course" id="${courses[i].courseID}">
            <div>
                <img src=${courses[i].imgUrl} alt="">
                <p>${courses[i].courseName}</p>
            </div>
        </div>
        `;
    }
}

export { drawAllSignedCourse, drawAllYears };