
import { drawAssignment } from './WebController/assignment.js';
import { drawAllSignedCourse, drawAllYears } from './WebController/sidenav.js'

import { getSignedCourses, ExtractAssignments } from './Util/CoursesExtractor.js';

// import { assignmentsObj } from './demo.js';
import { authorizeApplication, getUserProfile, getAllAssignments, logout, assignmentsObj } from './scriptCV.js';


let currentYear = 0;
let currentSemester = 0;
let currentCourseID = "All";
let currentStatus = 0;

document.querySelector("button").addEventListener("click", async (event) => {
    authorizeApplication();
})

let allSignedCourse, allAssignments;
let signedCourse, assignments;

document.addEventListener("DOMContentLoaded", async (event) => {
    getUserProfile();

    await getAllAssignments();

    allAssignments = assignments = await ExtractAssignments(assignmentsObj);
    allSignedCourse = signedCourse = await getSignedCourses(assignmentsObj);

    drawAllSignedCourse(signedCourse, assignments, currentCourseID, currentStatus);
    drawAllYears(signedCourse, assignments, currentCourseID, currentStatus);
    await drawAssignment(assignments, currentCourseID, currentStatus);
});

document.getElementById("status").addEventListener("click", async (event) => {
    currentStatus = (currentStatus + 1) % 3;
    drawAssignment(assignments, currentCourseID, currentStatus);
});

// show only selected semester -> (show courses only register in that currenYear, and Semester too)
for (let i = 0; i < document.querySelectorAll(".semester").length; i++) {
    document.querySelectorAll(".semester")[i].addEventListener("click", async (event) => {
        const semester = event.target.closest(".semester");
        const id = semester.id;

        if (semester.classList.contains("semester-selected")) { // deselect when click again
            semester.classList.remove("semester-selected");
            currentSemester = 0;

            drawAll();
        }
        else {
            for (let i = 0; i < document.querySelectorAll(".semester").length; i++)
                document.querySelectorAll(".semester")[i].classList.remove("semester-selected");
            semester.classList.add("semester-selected");
            currentSemester = parseInt(id.substr(2)); // S-1, S-2

            drawAll();
        }
    });
}


const drawAll = async () => {
    assignments = allAssignments.filter(assignment => 
        (assignment.courseYear == currentYear || currentYear==0) &&
        (assignment.courseSemester == currentSemester || currentSemester==0)
    );
    signedCourse = allSignedCourse.filter(course => 
        (course.courseYear == currentYear || currentYear==0) &&
        (course.courseSemester == currentSemester || currentSemester==0)
    );
    drawAllSignedCourse(signedCourse, assignments, currentCourseID, currentStatus);
    drawAssignment(assignments, currentCourseID, currentStatus);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}