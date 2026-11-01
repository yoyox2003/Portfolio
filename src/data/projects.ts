const projects = [
  {
    name: "AutoCompile",
    context: "Graduation Project & Research Paper",
    description:
      "A research project exploring whether a fine-tuned language model can predict LLVM optimization pass sequences that reduce instruction count compared with LLVM default<Oz>, without running search during generation. The model predicts pass lists; LLVM applies and evaluates them.",
    contributions: [
      "Studies tool-free pass-sequence prediction from LLVM IR and compact program-shape evidence.",
      "Uses offline search to create supervised training labels and as a bounded teacher reference.",
      "Evaluates greedy single predictions separately from sampled Best-of-N candidates selected by compiler measurement.",
      "Across completed experiments, Best-of-40 reaches about +4% guarded OverOz on the held-out test set; greedy single predictions remain weak.",
      "Results report instruction-count metrics only. Semantic correctness verification with Alive2 is deferred because current proof coverage is insufficient.",
    ],
    researchDetails: {
      baseline: "LLVM default<Oz>",
      metric: "Guarded OverOz instruction-count improvement",
      dataset: "Size-biased LLVM-19 IR-OptSet subset with 3,000 exact-IR-deduplicated programs",
      split: "2,398 train / 299 validation / 303 test",
      teacherReference: "+3.92% guarded OverOz on the test split",
    },
    technologies: ["Python", "LLVM", "LLVM IR", "Large Language Models", "Reinforcement Learning"],
    repository: "https://github.com/Abdo12KM/autocompile",
    thesis: "AutoCompile: Tool-Free LLM Prediction of LLVM Optimization Pass Sequences",
    authors: [
      "Abdallah Mohamed",
      "Abdelrahman Khaled",
      "Mohamed Ayman",
      "Noureldeen Hatem",
      "Youssef Ahmed Hany",
    ],
  },
  {
    name: "Nour al-Ma'rifa",
    arabicName: "نور المعرفة",
    category: "Voice-first Arabic literacy learning app",
    context: "IEEE Solve the 17 Hackathon",
    description:
      "An accessible, gamified web app supporting foundational Arabic literacy for illiterate and semi-literate adults in Egypt through voice interaction, audio lessons, and simple navigation.",
    achievement: "2nd place - IEEE Solve the 17 Hackathon",
    features: [
      "Egyptian Arabic audio prompts for navigation, lessons, instructions, and feedback.",
      "Learning modules for Arabic letters, numerals, and common words and phrases, with visual and audio support.",
      "High-contrast interface with clear icons, minimal text, and direct navigation controls.",
      "Text-based registration and login using a name, PIN, and unique numeric ID, plus voice-based registration and login.",
      "AI-generated culturally relevant examples and voice-input feedback are planned features.",
      "Points, badges, and progress tracking are planned gamification features.",
      "A temporary guest login is available for testing and is intended to be removed before production.",
    ],
    technologies: {
      frontend: ["Next.js 14+", "App Router", "Tailwind CSS", "shadcn/ui"],
      backend: ["Next.js API Routes"],
      database: ["PostgreSQL", "Drizzle ORM", "Neon"],
      ai: ["Google Gemini API", "Speech-to-Text", "Text Generation"],
      deployment: ["Vercel"],
    },
  },
  {
    name: "The Cat Memory Game",
    category: "Browser-based memory game",
    description:
      "A cat-themed memory card game with three difficulty levels, a countdown score, and high scores saved in the browser.",
    features: [
      "Choose Easy, Medium, or Hard difficulty, with 6, 8, or 12 matching pairs.",
      "Briefly preview the cards, then find matching pairs before the score runs out.",
      "Save the selected difficulty, current score, and high score in browser localStorage.",
      "Reset the saved high score from the start screen.",
      "Runs as a static site with no build step or package installation.",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Browser localStorage",
      "Google Fonts",
      "Bootstrap Icons",
    ],
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
        "React",
        "TypeScript",
        "Vite",
        "React Router",
        "Tailwind CSS",
        "TanStack Query",
        "Clerk",
        "dnd-kit",
        "FullCalendar",
        "Lucide",
      ],
      backend: ["Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL", "Clerk Express"],
    },
  },
];

export default projects;
