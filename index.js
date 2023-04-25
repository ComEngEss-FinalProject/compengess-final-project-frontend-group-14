
import { drawAssignment } from './WebController/assignment.js';
import { drawAllSignedCourse } from './WebController/course.js'

import { getSignedCourses, ExactAssignments } from './Util/CoursesExtractor.js'
import { assignmentsObjAPI } from './demo.js';


var assignments = ExactAssignments(assignmentsObjAPI);
var signedCourse = getSignedCourses(assignmentsObjAPI);

var currentCourseID = "All";
var currentStatus = 0;


drawAllSignedCourse(signedCourse);
drawAssignment(assignments, currentCourseID, currentStatus);

document.getElementById("courses").addEventListener("click", function (event) {
    if (currentCourseID === "All")
        return;
    currentCourseID = "All";
    drawAssignment(assignments, currentCourseID, currentStatus);
    for (let i = 0; i < document.querySelectorAll(".course").length; i++)
        document.querySelectorAll(".course")[i].classList.remove("course-selected");
});


document.getElementById("status").addEventListener("click", function (event) {
    currentStatus = (currentStatus + 1) % 3;
    drawAssignment(assignments, currentCourseID, currentStatus);
});

for (let i = 0; i < document.querySelectorAll(".course").length; i++) {
    document.querySelectorAll(".course")[i].addEventListener("click", function (event) {
        const course = event.target.closest(".course");
        const id = course.id;

        if (course.classList.contains("course-selected")) {
            course.classList.remove("course-selected");
            if (currentCourseID === "All")
                return;
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
    });
}
