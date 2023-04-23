
import { drawAllAssignment, drawCourseAssignment } from './WebController/assignment.js';
import { drawAllSignedCourse } from './WebController/course.js'

import {assignments, signedCourse} from './demo.js';


drawAllSignedCourse(signedCourse);
drawAllAssignment(assignments);


document.getElementById("courses").addEventListener("click", function(event) {
    drawAllAssignment(assignments);
});

for(let i=0; i<document.querySelectorAll(".course").length; i++) {
    document.querySelectorAll(".course")[i].addEventListener("click", function(event) {
        const id = event.target.closest(".course").id;
        console.log("Clicked " + id);
        console.log(assignments);
        drawCourseAssignment(assignments, id);
    });
}