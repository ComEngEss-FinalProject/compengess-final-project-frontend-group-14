
import { drawAllAssignment, drawCourseAssignment } from './WebController/assignment.js';
import { drawAllSignedCourse } from './WebController/course.js'

import {assignments, signedCourse} from './demo.js';


drawAllSignedCourse(signedCourse);
drawAllAssignment(assignments);

var lastDrawAssignment = false; // to fix re-reload all course animation

document.getElementById("courses").addEventListener("click", function(event) {
    if(lastDrawAssignment)
        return;
    drawAllAssignment(assignments);
    for(let i=0; i<document.querySelectorAll(".course").length; i++)
        document.querySelectorAll(".course")[i].classList.remove("course-selected");
    lastDrawAssignment = true;
});

for(let i=0; i<document.querySelectorAll(".course").length; i++) {
    document.querySelectorAll(".course")[i].addEventListener("click", function(event) {
        const course = event.target.closest(".course");
        const id = course.id;
        
        if(course.classList.contains("course-selected")) {
            course.classList.remove("course-selected");
            if(lastDrawAssignment)
                return;
            drawAllAssignment(assignments),
            lastDrawAssignment = true;
        }
        else {
            for(let i=0; i<document.querySelectorAll(".course").length; i++)
                document.querySelectorAll(".course")[i].classList.remove("course-selected");
            course.classList.add("course-selected");
            drawCourseAssignment(assignments, id);
            lastDrawAssignment = false;
        }
    });
}