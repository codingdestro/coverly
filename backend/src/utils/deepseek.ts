import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.OPENAI_API_KEY,
});

export const createCoverLetterPrompt = (
  jobDescription: string,
  candidateDetails: string,
) => {
  const promptTemplate = `
Write a concise and formal cover letter in simple English for a job application. Use the following details:

Applicant's Name: 
Applicant's Key Skills/Qualifications: 
Job Title: 
Company Name: 
Key Requirements from Job Description: 
Why the Applicant is a Good Fit: 
Call to Action: 
get the user details and job description from the json string ${candidateDetails} and ${jobDescription}
`;
  return promptTemplate;
};
interface DeepseekResponse {
  template: string;
}
const deepseek = async (
  prompt: string,
  userDetails?: string,
): Promise<DeepseekResponse | null> => {
  const response = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that creates a cover letter for a given job description and candidate details. organize the coverletter in a way that is easy to read and understand properly and use proper given details. the output should be in palin text not in markdown. ${userDetails}`,
      },
      { role: "user", content: prompt },
    ],
  });
  if (response.choices[0]!.message.content) {
    return { template: response.choices[0]!.message.content.toString() };
  } else {
    return null;
  }
};

const pmt = `
% === RESUME TEMPLATE ===
\\documentclass[a4paper,12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[top=0.5in, bottom=.5in, left=0.5in, right=0.5in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{paracol}
\\usepackage{fontawesome5}
\\usepackage{helvet}
\\renewcommand{\familydefault}{\sfdefault}

% Colors
\\definecolor{primary}{HTML}{0d6efd}
\\definecolor{lightgray}{HTML}{777777}

% Skill badge command
\\newcommand{\skillbadge}[1]{%
  \begingroup
  \setlength{\fboxsep}{2pt}%
  \textcolor{black}{\\underline{\texttt{\small #1}}}%
  \endgroup
}

% Subheading style
\newcommand{\subheading}[1]{\textbf{\textcolor{primary}{#1}}}

% Section title style
\titleformat{\section}
  {\color{primary}\Large\bfseries\\uppercase}{}{0em}{}
\titlespacing{\section}{0pt}{1.2em}{0.4em}

% Divider line
\newcommand{\sectiondivider}{\noindent\rule{\linewidth}{0.2pt}}

% No page number
\pagenumbering{gobble}

\begin{document}

% ==== HEADER ====
\begin{center}
  {\Huge \bfseries \color{black} {{NAME}}} \\[0.5em]
  \textcolor{primary}{\large {{TITLE}}} \\[1em]

  \small
  \href{mailto:{{EMAIL}}}{\faIcon{envelope} \ {{EMAIL}}} \quad
  \faIcon{map-marker-alt} {{LOCATION}} \quad
  \faIcon{phone} {{PHONE}} \\[0.5em]
  \href{{{LINKEDIN}}}{\faIcon{linkedin} LinkedIn} \quad
  \href{{{TWITTER}}}{\faIcon{twitter} Twitter} \quad
  \href{{{PORTFOLIO}}}{\faIcon{globe} Portfolio}
\end{center}

\vspace{1em}

% ==== TWO-COLUMN LAYOUT ====
\begin{paracol}{2}
\columnratio{0.38}

% ==== LEFT COLUMN ====
\begin{flushleft}
\section*{Summary}
\sectiondivider

{{SUMMARY}}

\section*{Experience}
\sectiondivider

\textbf{{{ROLE}}} \hfill \textit{{{DATES}}} \\
\subheading{{{COMPANY}}} \\
\begin{itemize}[leftmargin=*]
  \item {{EXPERIENCE_POINT_1}}
  \item {{EXPERIENCE_POINT_2}}
\end{itemize}

\section*{Education}
\sectiondivider

\textbf{{DEGREE}} \\
\subheading{{INSTITUTE}} \\
\textit{{EDU_DATES}} \\

\vspace{0.5em}

\textbf{{SECONDARY_DEGREE}} \\
\subheading{{SECONDARY_INSTITUTE}} \hfill \textit{{SECONDARY_YEAR}} \\
Percentage: {{SECONDARY_PERCENT}}

\vspace{0.5em}

\textbf{{CERT_COURSE}} \\
\subheading{{CERT_PROVIDER}} \hfill \textit{{CERT_YEAR}} \\

\section*{Certifications}
\sectiondivider

{{CERTIFICATIONS}}

\end{flushleft}

% ==== RIGHT COLUMN ====
\switchcolumn
\begin{flushleft}

\section*{Strengths}
\sectiondivider

{{STRENGTHS}}

\section*{Skills}
\sectiondivider
{{#each SKILLS}}
\skillbadge{{{this}}} \ 
{{/each}}

\section*{Projects}
\sectiondivider

\textbf{\subheading{{{PROJECT_1}}}} \hfill
\href{{{GITHUB_1}}}{\faIcon{github}} \quad
\href{{{LIVE_1}}}{\faIcon{external-link-alt}} \\
{{DESC_1}}

\vspace{0.5em}

\textbf{\subheading{{{PROJECT_2}}}} \hfill
\href{{{GITHUB_2}}}{\faIcon{github}} \\
{{DESC_2}}

\vspace{0.5em}

\textbf{\subheading{{{PROJECT_3}}}} \hfill
\href{{{GITHUB_3}}}{\faIcon{github}} \quad
\href{{{LIVE_3}}}{\faIcon{external-link-alt}} \\
{{DESC_3}}

\section*{Languages}
\sectiondivider

\textbf{Hindi:} {{LANG_HINDI}} \\
\textbf{English:} {{LANG_ENGLISH}}

\end{flushleft}
\end{paracol}

\end{document}
`;

export const createResume = async (prompt: string) => {
  const res = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: `you are latex resume template generate, you creates template according to user details and context of template. the output
        should be in latex formate and don't add any comment or anything else.`,
      },
      {
        role: "user",
        content: `${pmt} inject the user details ${prompt} and create a error free latex resume template.`,
      },
    ],
  });

  if (res.choices[0]!.message.content) {
    return { template: res.choices[0]!.message.content };
  } else {
    return null;
  }
};

export default deepseek;
