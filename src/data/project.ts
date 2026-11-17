export type Project = {
  textOnly: boolean;
  name: string;
  context: string;
  description: string;
  technologies: string[];
  repository: string;
  deployment:
    | { status: "live"; url: string }
    | { status: "unavailable" | "not-deployed"; url: string | null };
  features?: string[];
  contributions?: string[];
  researchDetails?: string[];
  thesis?: string;
  authors?: string[];
  assets: {
    video: {
      preview_loop: string | null;
      demo: string | null;
      specific: string | null;
    };
    photo: {
      preview: string | null;
      screenshots: string[];
    };
  };
};
