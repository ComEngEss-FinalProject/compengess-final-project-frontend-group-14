
function drawAllSignedCourse(courses) {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ``;
    for(let i=0; i<courses.length; i++) {
        courseList.innerHTML += 
        `
        <div class="course" id="${courses[i].courseID}">
            <div>
                <img src="./images/${courses[i].imgUrl}" alt="">
                <p>${courses[i].courseName}</p>
            </div>
        </div>
        `;
    }
}

export { drawAllSignedCourse }