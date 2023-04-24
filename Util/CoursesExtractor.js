/*

Extract example
Assignment
[
    {
        courseID: "000001",
        courseName: "Computer Engineering Essentials",
        title: "Final Project Preparation (Set up an EC2 instance)",
        date: { day: 12, month: 5, year: 2023 },
        imgUrl: "com-eng-ess.png",
        status: true // dk how to get this info?
    }
]

signedCourse
[
    {
        courseID: "000001",
        courseName: "Computer Engineering Essentials",
        imgUrl: "com-eng-ess.png",
    },
]

*/

function getSignedCourses(allCourseAssignments) {
    let uniqueCourse = [];
    for (let i = 0; i < allCourseAssignments.length; i++) {
        const currentCourse = allCourseAssignments[i];

        const courseID = currentCourse.course_cv_cid;
        const courseName = currentCourse.title;
        const imgUrl = currentCourse.course_icon;

        let alreadyHaveCourse = false;
        for (let j = 0; j < uniqueCourse.length; j++) {
            if (uniqueCourse[j].courseID === courseID) {
                alreadyHaveCourse = true;
                break;
            }
        }
        if (!alreadyHaveCourse)
            uniqueCourse.push({ courseID: courseID, courseName: courseName, imgUrl: imgUrl });
    }

    return uniqueCourse;
}

function ExactAssignments(allCourseAssignments) {
    let extractAssignments = [];

    for (let i = 0; i < allCourseAssignments.length; i++) {
        const currentCourse = allCourseAssignments[i];
        const courseID = currentCourse.course_cv_cid;
        const courseName = currentCourse.title;
        const imgUrl = currentCourse.course_icon;
        for (let j = 0; j < currentCourse.assignment_length; j++) {
            let assignment = {
                courseID: courseID,
                courseName: courseName,
                title: currentCourse.assignment[j].title,
                date: getDate(currentCourse.assignment[j].duedate),
                imgUrl: imgUrl,
                status: false,
            }
            extractAssignments.push(assignment);
        }
    }

    return extractAssignments;
}


function getDate(dateString) {
    const splitString = dateString.split("-");
    let date;
    date = {
        day: parseInt(splitString[2]),
        month: parseInt(splitString[1]),
        year: parseInt(splitString[0])
    }
    return date;
}
export { getSignedCourses, ExactAssignments };