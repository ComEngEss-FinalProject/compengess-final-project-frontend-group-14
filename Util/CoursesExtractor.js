/*

Extract example
Assignment
[
    {
        courseID: "000001",
        courseName: "Computer Engineering Essentials",
        courseSemester: 1,
        courseYear: "2022",
        title: "Final Project Preparation (Set up an EC2 instance)",
        date: { day: 12, month: 5, year: 2023 },
        dueTime: 188882
        imgUrl: "com-eng-ess.png",
        status: true // dk how to get this info?
    }
]

signedCourse
[
    {
        courseID: "000001",
        courseName: "Computer Engineering Essentials",
        courseSemester: 1,
        courseYear: "2022",
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
        const courseSemester = currentCourse.semester;
        const courseYear = currentCourse.year;
        const imgUrl = currentCourse.course_icon;
        
        let alreadyHaveCourse = false;
        for (let j = 0; j < uniqueCourse.length; j++) {
            if (uniqueCourse[j].courseID === courseID) {
                alreadyHaveCourse = true;
                break;
            }
        }

        if (!alreadyHaveCourse)
            uniqueCourse.push({
                courseID: courseID,
                courseName: courseName,
                courseSemester: courseSemester,
                courseYear: courseYear,
                imgUrl: imgUrl
            });
    }

    return uniqueCourse;
}

function ExactAssignments(allCourseAssignments) {
    let extractAssignments = [];

    for (let i = 0; i < allCourseAssignments.length; i++) {
        const currentCourse = allCourseAssignments[i];
        const courseID = currentCourse.course_cv_cid;
        const courseName = currentCourse.title;
        const courseSemester = currentCourse.semester;
        const courseYear = currentCourse.year;
        const imgUrl = currentCourse.course_icon;
        for (let j = 0; j < currentCourse.assignment_length; j++) {
            const date = new Date(currentCourse.assignment[j].duedate);
            extractAssignments.push({
                courseID: courseID,
                courseName: courseName,
                courseSemester: courseSemester,
                courseYear: courseYear,
                title: currentCourse.assignment[j].title,
                date: { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() },
                dueTime: currentCourse.assignment[j].duetime,
                imgUrl: imgUrl,
                status: false,
            });
        }
    }

    return extractAssignments;
}

export { getSignedCourses, ExactAssignments };