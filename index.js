
import { drawAssignment } from './WebController/assignment.js';
import { drawAllSignedCourse, drawAllSemester, drawAllYears } from './WebController/sidenav.js'

import { getSignedCourses, ExtractAssignments } from './Util/CoursesExtractor.js';

import { getUserProfile, getAllAssignments, logout, assignmentsObj, loginStatus } from './scripts/scriptCV.js';

let currentProperty = {
    year: 0,
    semester: 0,
    courseID: "All",
    status: 0
}

let allSignedCourse, allAssignments;
let signedCourse, assignments;

document.addEventListener("DOMContentLoaded", async (event) => {
    getUserProfile();

    await getAllAssignments();

    if(loginStatus) {
        console.log("login status", loginStatus);
        document.getElementById("login").remove();
    }

    allAssignments = assignments = await ExtractAssignments(assignmentsObj);
    allSignedCourse = signedCourse = await getSignedCourses(assignmentsObj);

    drawAllSignedCourse(signedCourse, assignments, currentProperty);
    drawAllSemester(allAssignments, allSignedCourse, signedCourse, assignments, currentProperty);
    drawAllYears(allAssignments, allSignedCourse, signedCourse, assignments, currentProperty);
    await drawAssignment(assignments, currentProperty);

    document.getElementById("status").addEventListener("click", async (event) => {
        currentProperty.status = (currentProperty.status + 1) % 3;
        window.scrollTo({ top: 0, behavior: 'instant' });
        drawAssignment(assignments, currentProperty);
    });

    document.getElementById("logout").addEventListener("click", async(event) => {
        logout();
    });
});