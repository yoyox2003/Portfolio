// Nour Alma'rifa Imports
import nourPreviewLoop from "../assets/projects/nour alma'rifa/videos/Preview Loop.mp4";
import nourDemo from "../assets/projects/nour alma'rifa/videos/Main Page(With Audio).mp4";
import nourLetterLesson from "../assets/projects/nour alma'rifa/videos/Letter Lesson.mp4";
import nourHero from "../assets/projects/nour alma'rifa/photos/hero.png";
import nourHeroLightmode from "../assets/projects/nour alma'rifa/photos/hero_lightmode.png";
import nourHeroAlt from "../assets/projects/nour alma'rifa/photos/hero_2.png";
import nourLetterLessonScreenshot from "../assets/projects/nour alma'rifa/photos/letter_lesson.png";
import nourLetterLessonAlt from "../assets/projects/nour alma'rifa/photos/letter_lesson_2.png";
import nourNumberLessons from "../assets/projects/nour alma'rifa/photos/number_lessons.png";

// Voodoo imports
import voodooPreviewLoop from "../assets/projects/voodoo/videos/Voodoo-Preview-Loop-Edited-compressed.mp4";
import voodooDemo from "../assets/projects/voodoo/videos/Voodoo-Demo.mp4";
import voodooHome from "../assets/projects/voodoo/photos/voodoo-home-dark.png";
import voodooHomeLight from "../assets/projects/voodoo/photos/voodoo-home-light.png";
import voodooSignIn from "../assets/projects/voodoo/photos/voodoo-sign-in.png";
import voodooSignInLight from "../assets/projects/voodoo/photos/voodoo-sign-in_light.png";

// The cat memory game imports
import catDemo from "../assets/projects/the cat memory game/videos/demo.mp4";
import catEasyPartial from "../assets/projects/the cat memory game/photos/partial-cats-easy.png";
import catEasy from "../assets/projects/the cat memory game/photos/cats-easy.png";
import catHard from "../assets/projects/the cat memory game/photos/cats-hard.png";
import catHardHidden from "../assets/projects/the cat memory game/photos/hidden-cats-hard.png";
import catStartPage from "../assets/projects/the cat memory game/photos/start-page.png";

const projects = [
  {
    textOnly: false,
    name: "Voodoo",
    context: "Full-stack task manager",
    description:
      "A task manager for organizing work into folders, buckets, tasks, and subtasks. It combines a daily dashboard, calendar, and progress tracking to show what needs attention and how work is progressing.",
    technologies: [
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
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Clerk Express",
    ],
    repository: "https://github.com/yoyox2003/Voodoo",
    assets: {
      video: {
        preview_loop: voodooPreviewLoop,
        demo: voodooDemo,
        specific: null,
      },
      photo: {
        preview: voodooHome,
        screenshots: [voodooHomeLight, voodooSignIn, voodooSignInLight],
      },
    },
    features: [
      "Dashboard for overdue tasks, tasks due today or this week, and active bucket progress.",
      "Folders and buckets with inline editing, drag-and-drop, and automatic sorting.",
      "Tasks and subtasks with descriptions, due dates, importance colors, completion, and reordering.",
      "Progress calculated from completed subtasks and task completion.",
      "Monthly calendar with selectable days and task deadlines.",
      "Personal workspaces with Clerk sign-in and a starter workspace for new users.",
      "Responsive desktop and mobile interface with light and dark themes and reduced-motion support.",
    ],
  },
  {
    textOnly: true,
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
    researchDetails: [
      "Baseline: LLVM default<Oz>.",
      "Metric: Guarded OverOz instruction-count improvement.",
      "Dataset: Size-biased LLVM-19 IR-OptSet subset with 3,000 exact-IR-deduplicated programs.",
      "Split: 2,398 train / 299 validation / 303 test.",
      "Teacher reference: +3.92% guarded OverOz on the test split.",
    ],
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
    assets: {
      video: {
        preview_loop: null,
        demo: null,
        specific: null,
      },
      photo: {
        preview: null,
        screenshots: [],
      },
    },
  },
  {
    textOnly: false,
    name: "Nour al-Ma'rifa",
    context: "IEEE Solve the 17 Hackathon",
    description:
      "An accessible, gamified web app supporting foundational Arabic literacy for illiterate and semi-literate adults in Egypt through voice interaction, audio lessons, and simple navigation.",
    technologies: [
      "Next.js 14+",
      "App Router",
      "Tailwind CSS",
      "shadcn/ui",
      "Next.js API Routes",
      "PostgreSQL",
      "Drizzle ORM",
      "Neon",
      "Google Gemini API",
      "Speech-to-Text",
      "Text Generation",
      "Vercel",
    ],
    repository: "https://github.com/Abdo12KM/nour-alma3refa",
    assets: {
      video: {
        preview_loop: nourPreviewLoop,
        demo: nourDemo,
        specific: nourLetterLesson,
      },
      photo: {
        preview: nourHero,
        screenshots: [
          nourHero,
          nourHeroLightmode,
          nourHeroAlt,
          nourLetterLessonScreenshot,
          nourLetterLessonAlt,
          nourNumberLessons,
        ],
      },
    },
    features: [
      "2nd place - IEEE Solve the 17 Hackathon.",
      "Egyptian Arabic audio prompts for navigation, lessons, instructions, and feedback.",
      "Learning modules for Arabic letters, numerals, and common words and phrases, with visual and audio support.",
      "High-contrast interface with clear icons, minimal text, and direct navigation controls.",
      "Text-based registration and login using a name, PIN, and unique numeric ID, plus voice-based registration and login.",
      "AI-generated culturally relevant examples and voice-input feedback are planned features.",
      "Points, badges, and progress tracking are planned gamification features.",
      "A temporary guest login is available for testing and is intended to be removed before production.",
    ],
  },
  {
    textOnly: false,
    name: "The Cat Memory Game",
    context: "Browser-based memory game",
    description:
      "A cat-themed memory card game with three difficulty levels, a countdown score, and high scores saved in the browser.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Browser localStorage",
      "Google Fonts",
      "Bootstrap Icons",
    ],
    repository: "https://github.com/yoyox2003/the-cat-memory-game",
    assets: {
      video: {
        preview_loop: catDemo,
        demo: catDemo,
        specific: null,
      },
      photo: {
        preview: catEasyPartial,
        screenshots: [catStartPage, catEasy, catHard, catHardHidden],
      },
    },
    features: [
      "Choose Easy, Medium, or Hard difficulty, with 6, 8, or 12 matching pairs.",
      "Briefly preview the cards, then find matching pairs before the score runs out.",
      "Save the selected difficulty, current score, and high score in browser localStorage.",
      "Reset the saved high score from the start screen.",
      "Runs as a static site with no build step or package installation.",
    ],
  },
];

export default projects;
