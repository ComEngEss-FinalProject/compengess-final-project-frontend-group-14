var signedCourse = [
    {
        courseName: "Computer Engineering Essentials",
        courseID: "000001",
        imgUrl: "com-eng-ess.png",
    },
    {
        courseName: "Programming Methology",
        courseID: "000002",
        imgUrl: "prog-meth.png",
    },
    {
        courseName: "Calculus II",
        courseID: "000003",
        imgUrl: "cal-ii.png",
    },
    {
        courseName: "General Physics II",
        courseID: "000004",
        imgUrl: "gen-phy-ii.svg",
    },
]

var assignments = [
    {
        date: { day: 12, month: 5, year: 2023 },
        courseName: "Computer Engineering Essentials",
        courseID: "000001",
        title: "Final Project Preparation (Set up an EC2 instance)",
        imgUrl: "com-eng-ess.png",
        status: true
    },
    {
        date: { day: 15, month: 4, year: 2023 },
        courseName: "Programming Methology",
        courseID: "000002",
        title: "Lab5",
        imgUrl: "prog-meth.png",
        status: false
    },
    {
        date: { day: 13, month: 6, year: 2023 },
        courseName: "Programming Methology",
        courseID: "000002",
        title: "Lab6",
        imgUrl: "prog-meth.png",
        status: false
    },
    {
        date: {day: 31, month: 12, year: 2022},
        courseName: "General Physics II",
        courseID: "000004",
        title: "Random Homework 1",
        imgUrl: "gen-phy-ii.svg",
        status: true
    },
    {
        date: {day: 31, month: 1, year: 2023},
        courseName: "General Physics II",
        courseID: "000004",
        title: "Random Homework 1",
        imgUrl: "gen-phy-ii.svg",
        status: false
    },
    {
        date: {day: 24, month: 4, year: 2023},
        courseName: "General Physics II",
        courseID: "000004",
        title: "Random Homework 1",
        imgUrl: "gen-phy-ii.svg",
        status: false
    },
    {
        date: {day: 10, month: 6, year: 2023},
        courseName: "Calculus II",
        courseID: "000003",
        title: "Random Homework 2",
        imgUrl: "cal-ii.png",
        status: false,
    },
];

export {assignments, signedCourse};