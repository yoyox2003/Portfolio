const myInfo = {
  name: {
    first: "Youssef",
    second: "Ahmed",
    last: "Hany",
    full: "Youssef Ahmed Hany",
  },
  title: "Software Engineer",
  location: "Cairo, Egypt",
  contact: {
    phone: "+20-101-775-5504",
    email: "youssef.a.hany.03@gmail.com",
    linkedin: "https://www.linkedin.com/in/youssef-ahmed-7306b6341/",
    github: "https://github.com/yoyox2003",
  },
  summary:
    "Computer Science graduate with a 3.86 GPA and Top 10 university ranking. Experience across front-end development and DevOps practices, including web applications, containerization, cloud infrastructure, and CI/CD.",
  education: {
    degree: "Bachelor of Science in Computer Science",
    institutions: ["Future University in Egypt", "University of Cincinnati"],
    program: "Dual degree",
    location: "Cairo, Egypt",
    graduation: "2026",
    gpa: "3.86/4.00",
    distinction: "Ranked in the Top 10 students at the university",
  },
  skills: {
    languages: ["C++", "Java", "Python", "JavaScript", "TypeScript"],
    frontend: ["React", "HTML", "CSS"],
    toolsAndDatabases: ["Git", "GitHub", "MySQL"],
    devops: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions"],
    computerScience: ["Data Structures & Algorithms", "OOP", "Problem Solving"],
  },
  experience: [
    {
      role: "DevOps Intern",
      organization: "Banque Misr - Rowad Internship",
      location: "Cairo",
      period: "Jul 2025 - Sep 2025",
      highlights: [
        "Used Docker and Kubernetes for containerization and orchestration of scalable application deployments.",
        "Provisioned and managed AWS cloud infrastructure with Terraform using Infrastructure as Code practices.",
        "Designed and implemented automated CI/CD pipelines with GitHub Actions to streamline software delivery.",
      ],
    },
    {
      role: "Front-End Development Intern",
      organization: "Gamers Lounge",
      location: "Cairo",
      period: "Nov 2024 - Jan 2025",
      highlights: [
        "Developed front-end applications using HTML, CSS, and JavaScript.",
        "Built an interactive Cat Memory Game and a static company website.",
        "Collaborated remotely with a development team to deliver web solutions.",
      ],
    },
  ],
  achievements: [
    { title: "ECPC Qualifications", result: "30th Place", date: "Aug 2023" },
    {
      title: "RoboCup Line Follower Competition",
      result: "3rd Place",
      date: "Feb 2022",
    },
    {
      title: "Minoan Robosport Competition Marathon",
      result: "2nd Place",
      date: "Dec 2023",
    },
  ],
  training: [
    {
      name: "Coach Academy - Problem Solving",
      period: "Dec 2022 - Jun 2024",
      description:
        "Completed two levels focused on advanced C++, algorithms, data structures, sorting, searching, and dynamic programming.",
    },
  ],
};

export default myInfo;
