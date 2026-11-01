const projects = [
  {
    name: "AI-Driven Compiler Optimization",
    context: "Graduation Project & Research Paper",
    description:
      "Researching and developing a system using Large Language Models and Reinforcement Learning to optimize code efficiency within the LLVM infrastructure.",
  },
  {
    name: "Nour Al Ma'rifa",
    context: "IEEE Solve the 17 Hackathon",
    description:
      "Built an interactive educational website to help illiterate users learn to read and write Arabic; won 2nd place at the hackathon.",
    achievement: "2nd place - IEEE Solve the 17 Hackathon",
  },
  {
    name: "Voodoo",
    category: "Full-stack task manager",
    description:
      "A task manager for organizing work into folders, buckets, tasks, and subtasks. It combines a daily dashboard, calendar, and progress tracking to show what needs attention and how work is progressing.",
    features: [
      "Dashboard for overdue tasks, tasks due today or this week, and active bucket progress.",
      "Folders and buckets with inline editing, drag-and-drop, and automatic sorting.",
      "Tasks and subtasks with descriptions, due dates, importance colors, completion, and reordering.",
      "Progress calculated from completed subtasks and task completion.",
      "Monthly calendar with selectable days and task deadlines.",
      "Personal workspaces with Clerk sign-in and a starter workspace for new users.",
      "Responsive desktop and mobile interface with light and dark themes and reduced-motion support.",
    ],
    technologies: {
      frontend: [
        "React", "TypeScript", "Vite", "React Router", "Tailwind CSS",
        "TanStack Query", "Clerk", "dnd-kit", "FullCalendar", "Lucide",
      ],
      backend: [
        "Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL", "Clerk Express",
      ],
    },
  },
];

export default projects;
