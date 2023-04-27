
import { drawAssignment } from './assignment.js';

function htmlToElement(html) {
    const template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content;
}

const drawAll = async (allAssignments, allSignedCourse, signedCourse, assignments, currentProperty) => {

    console.log(currentProperty);

    assignments = allAssignments.filter(assignment =>
        (assignment.courseYear == currentProperty.year || currentProperty.year == 0) &&
        (assignment.courseSemester == currentProperty.semester || currentProperty.semester == 0)
    );

    signedCourse = allSignedCourse.filter(course =>
        (course.courseYear == currentProperty.year || currentProperty.year == 0) &&
        (course.courseSemester == currentProperty.semester || currentProperty.semester == 0)
    );

    drawAllSignedCourse(signedCourse, assignments, currentProperty);
    drawAssignment(assignments, currentProperty);

    window.scrollTo({ top: 0, behavior: 'instant' });
}

async function drawAllSignedCourse(courses, assignments, currentProperty) {
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
                currentProperty.courseID = "All";
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
            else {
                for (let i = 0; i < document.querySelectorAll(".course").length; i++)
                    document.querySelectorAll(".course")[i].classList.remove("course-selected");
                courseElement.classList.add("course-selected");
                currentProperty.courseID = id;
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
            drawAssignment(assignments, currentProperty);
        })
        courseList.appendChild(courseElement);
    }
}

async function drawAllSemester(allAssignments, allSignedCourse, signedCourse, assignments, currentProperty) {
    const semesterList = document.getElementById("semester-list");
    semesterList.innerHTML = ``;
    let uniqueSemester = allSignedCourse.filter((val, idx, ar) => {
        for (let cur = 0; cur < ar.length; cur++) {
            if (ar[cur].courseSemester == val.courseSemester)
                return idx == cur;
        }
        return true;
    });

    for (const course of uniqueSemester) {
        const semester = course.courseSemester;
        const semesterElement = htmlToElement(`
            <div class="semester" id="S-${semester}">
                <div>
                    <img src="./images/semester-${semester}.png" alt="semester-number-img">
                    <p>Semester ${semester}</p>
                </div>
            </div>
        `).firstChild;

        semesterElement.addEventListener("click", (event) => {

            const id = semesterElement.id;
            if (semesterElement.classList.contains("semester-selected")) { // deselected when click again
                semesterElement.classList.remove("semester-selected");

                currentProperty.semester = 0;
            }
            else {
                for (let i = 0; i < document.querySelectorAll(".semester").length; i++)
                    document.querySelectorAll(".semester")[i].classList.remove("semester-selected");
                semesterElement.classList.add("semester-selected");

                currentProperty.semester = parseInt(id.substr(2));

            }

            currentProperty.courseID = "All";

            drawAll(allAssignments, allSignedCourse, signedCourse, assignments, currentProperty)

        })
        semesterList.appendChild(semesterElement);
    }
}

async function drawAllYears(allAssignments, allSignedCourse, signedCourse, assignments, currentProperty) {
    const yearList = document.getElementById("year-list");
    yearList.innerHTML = ``;
    let uniqueYear = allSignedCourse.filter((val, idx, ar) => {
        for (let cur = 0; cur < ar.length; cur++) {
            if (ar[cur].courseYear == val.courseYear)
                return idx == cur;
        }
        return true;
    });

    for (const course of uniqueYear) {
        const year = course.courseYear;
        const yearElement = htmlToElement(`
            <div class="year" id="Y-${year}">
                <div>
                    <p>${year}</p>
                </div>
            </div>
        `).firstChild;

        yearElement.addEventListener("click", (event) => {

            const id = yearElement.id;
            if (yearElement.classList.contains("year-selected")) { // deselected when click again
                yearElement.classList.remove("year-selected");
                currentProperty.year = 0;
            }
            else {
                for (let i = 0; i < document.querySelectorAll(".year").length; i++)
                    document.querySelectorAll(".year")[i].classList.remove("year-selected");
                yearElement.classList.add("year-selected");
                currentProperty.year = parseInt(id.substr(2));
            }

            currentProperty.semester = 0;
            currentProperty.courseID = "All";
            for (let i = 0; i < document.querySelectorAll(".semester").length; i++)
                    document.querySelectorAll(".semester")[i].classList.remove("semester-selected");

            drawAll(allAssignments, allSignedCourse, signedCourse, assignments, currentProperty)

        })
        yearList.appendChild(yearElement);
    }
}




export { drawAllSignedCourse, drawAllSemester, drawAllYears, drawAll };