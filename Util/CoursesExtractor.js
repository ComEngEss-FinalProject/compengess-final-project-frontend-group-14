/*

Extract example
Assignment
[
    {
        assignment_id: "948056",
        courseID: "000001",
        courseName: "Computer Engineering Essentials",
        courseSemester: 1,
        courseYear: "2022",
        title: "Final Project Preparation (Set up an EC2 instance)",
        detail: "Go to Sleep zZz",
        date: { day: 12, month: 5, year: 2023 },
        dueTime: 188882,
        imgUrl: "com-eng-ess.png",
         -- get front Database -> status: true
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

import { getItemFromDB, itemsData } from '../scripts/scriptItems.js';
import { userID } from '../scripts/scriptCV.js';

async function getSignedCourses(allCourseAssignments) {
    let uniqueCourse = [];
    for (let i = 0; i < allCourseAssignments.length; i++) {
        const currentCourse = allCourseAssignments[i];

        if(currentCourse.assignment_length == 0)
            continue;
            
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


async function ExtractAssignments(allCourseAssignments) {
    await getItemFromDB();
    const userSentAssignments=[];
    for(const user of itemsData) {
        if(user.user_id == userID) {
            userSentAssignments.push(user.assignment_id);
        }
    }
    console.log(userSentAssignments)

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
            const sentStatus = userSentAssignments.includes((currentCourse.assignment[j].itemid).toString());
            extractAssignments.push({
                assignment_id: currentCourse.assignment[j].itemid,
                courseID: courseID,
                courseName: courseName,
                courseSemester: courseSemester,
                courseYear: courseYear,
                title: currentCourse.assignment[j].title,
                detail: currentCourse.assignment[j].instruction,
                date: { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() },
                dueTime: currentCourse.assignment[j].duetime,
                imgUrl: imgUrl,
                status: sentStatus, // get from DB Later
            });
        }
    }

    return extractAssignments;
}

export { getSignedCourses, ExtractAssignments };