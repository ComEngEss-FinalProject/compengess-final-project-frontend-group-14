
import { drawAssignment } from './WebController/assignment.js';
import { drawAllSignedCourse, drawAllYears } from './WebController/course.js'

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

var signedCourse, assignments;

document.addEventListener("DOMContentLoaded", async (event) => {
    getUserProfile();

    document.getElementById("courses").addEventListener("click", async (event) => {
        if (currentCourseID === "All")
            return;
        currentCourseID = "All";
        await drawAssignment(assignments, currentCourseID, currentStatus);
        for (let i = 0; i < document.querySelectorAll(".course").length; i++)
            document.querySelectorAll(".course")[i].classList.remove("course-selected");
    });


    document.getElementById("status").addEventListener("click", async (event) => {
        currentStatus = (currentStatus + 1) % 3;
        drawAssignment(assignments, currentCourseID, currentStatus);
    });

    await getAllAssignments(currentYear, currentSemester);

    assignments = await ExtractAssignments(assignmentsObj);
    signedCourse = await getSignedCourses(assignmentsObj);

    await drawAllSignedCourse(signedCourse, assignments, currentCourseID, currentStatus);
    // await drawAllYears(signedCourse);
    await drawAssignment(assignments, currentCourseID, currentStatus);
});

// show only selected year -> (show courses only register in that currenYear, and Semester too)
for (let i = 0; i < document.querySelectorAll(".year").length; i++) {
    document.querySelectorAll(".year")[i].addEventListener("click", async (event) => {
        const year = event.target.closest(".year");
        const id = year.id;

        if (year.classList.contains("year-selected")) { // deselect when click again
            year.classList.remove("year-selected");
            currentYear = 0;

            drawAll();
        }
        else {
            for (let i = 0; i < document.querySelectorAll(".year").length; i++)
                document.querySelectorAll(".year")[i].classList.remove("year-selected");

            year.classList.add("year-selected");
            currentYear = parseInt(id.substr(2)); // Y-2020

            drawAll();
        }
    });
}

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
    await getAllAssignments(currentYear, currentSemester);
    assignments = await ExtractAssignments(assignmentsObj);
    signedCourse = await getSignedCourses(assignmentsObj);
    drawAllSignedCourse(signedCourse, assignments, currentCourseID, currentStatus);
    drawAssignment(assignments, currentCourseID, currentStatus);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}