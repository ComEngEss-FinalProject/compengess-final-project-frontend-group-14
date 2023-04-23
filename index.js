
import { drawAllAssignment, drawCourseAssignment } from './WebController/assignment.js';
import { drawAllSignedCourse } from './WebController/course.js'

import {assignments, signedCourse} from './demo.js';


drawAllSignedCourse(signedCourse);
drawAllAssignment(assignments);


document.getElementById("courses").addEventListener("click", function(event) {
    drawAllAssignment(assignments);
    for(let i=0; i<document.querySelectorAll(".course").length; i++)
        document.querySelectorAll(".course")[i].classList.remove("course-selected");
});

for(let i=0; i<document.querySelectorAll(".course").length; i++) {
    document.querySelectorAll(".course")[i].addEventListener("click", function(event) {
        const course = event.target.closest(".course");
        const id = course.id;
        
        if(course.classList.contains("course-selected")) {
            course.classList.remove("course-selected");
            drawAllAssignment(assignments);
        }
        else {
            for(let i=0; i<document.querySelectorAll(".course").length; i++)
                document.querySelectorAll(".course")[i].classList.remove("course-selected");
            course.classList.add("course-selected");
            drawCourseAssignment(assignments, id);
        }
    });
}