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

Applicant's Name: ${candidateDetails}

Applicant's Key Skills/Qualifications: ${candidateDetails}

Job Title: ${jobDescription}

Company Name: ${jobDescription}

Key Requirements from Job Description: ${jobDescription}

Why the Applicant is a Good Fit: ${jobDescription}

Call to Action: ${jobDescription}

Ensure the letter is professional, concise (no more than 150-200 words), and free of unnecessary jargon.
`;
  return promptTemplate;
};
interface DeepseekResponse {
  coverLetter: string;
}

export const createResumePrompt = (
  userDetails: string,
  education: string,
  experience: string,
  socialMedia: string,
) => {
  const promptTemplate = `
  User Details:
  ${userDetails}
  Education:
  ${education}
  Experience:
  ${experience}
  Social Media:
  ${socialMedia}

**Design Requirements:**  
1. Use the following document class and packages:  
   \`\`\`latex  
   \\documentclass[11pt, a4paper]{article}  
   \\usepackage[utf8]{inputenc}  
   \\usepackage[margin=0.5in]{geometry}  
   \\usepackage{xcolor}  
   \\usepackage{enumitem}  
   \\usepackage{hyperref}  
   \\usepackage{fontawesome5}  
   \\usepackage{tabularx}  
   \`\`\`  

2. Define the following theme colors:  
   \`\`\`latex  
   \\definecolor{mainorange}{RGB}{20,20,255}  
   \\definecolor{darkorange}{RGB}{0,0,0}  
   \`\`\`  

3. Use the provided section and subsection formatting:  
   \`\`\`latex  
   \\titleformat{\\section}{\\LARGE\\bfseries\\color{mainorange}}{}{0em}{}[\\titlerule]  
   \\titleformat{\\subsection}{\\large\\bfseries\\color{darkorange}}{}{0em}{}  
   \`\`\`  

4. Include the \`\\daterange\` command for date formatting:  
   \`\`\`latex  
   \\newcommand{\\daterange}[2]{\\small\\color{darkorange}\\faCalendar\\enspace\\textbf{From} #1 \\enspace\\textbar\\enspace \\faCalendarCheck\\enspace\\textbf{To} #2}  
   \`\`\`  

5. Use the \`\\header\` command for the header section:  
   \`\`\`latex  
   \\newcommand{\\header}[4]{%  
     \\begin{center}  
       {\\Huge\\bfseries\\color{mainorange}#1}\\\\[0.2em]  
       {\\Large\\color{darkorange}#2}\\\\[1em]  
       \\begin{tabular}{@{}c@{\\hspace{2em}}c@{\\hspace{2em}}c@{}}  
         \\faPhone\\ \\color{darkorange}#3 &  
         \\faEnvelope\\ \\href{mailto:#4}{\\color{darkorange}#4} &  
         \\faLinkedinIn\\ \\href{https://linkedin.com/in/#5}{\\color{darkorange}#5}  
       \\end{tabular}  
     \\end{center}  
     \\vspace{1em}  
   }  
   \`\`\`  

**User Details:**  
- **Name:** [User's Full Name]  
- **Job Title:** [User's Job Title]  
- **Phone Number:** [User's Phone Number]  
- **Email:** [User's Email Address]  
- **LinkedIn:** [User's LinkedIn Username]  
- **Technical Skills:** [List of skills, categorized into Frontend, Backend, Databases, DevOps, Tools]  
- **Professional Experience:**  
  - [Job Title 1] | [Company Name 1] | [Start Date] - [End Date]  
    - [Achievement/Bullet Point 1]  
    - [Achievement/Bullet Point 2]  
  - [Job Title 2] | [Company Name 2] | [Start Date] - [End Date]  
    - [Achievement/Bullet Point 1]  
    - [Achievement/Bullet Point 2]  
- **Education:**  
  - [Degree] | [Institution Name] | [Start Date] - [End Date]  
    - [Relevant Detail 1]  
    - [Relevant Detail 2]  
- **Key Projects:**  
  - [Project Name 1] | [Technologies Used] | [Start Date] - [End Date]  
    - [Achievement/Bullet Point 1]  
    - [Achievement/Bullet Point 2]  
  - [Project Name 2] | [Technologies Used] | [Start Date] - [End Date]  
    - [Achievement/Bullet Point 1]  
    - [Achievement/Bullet Point 2]  

**Output Requirements:**  
- Generate a complete LaTeX document with the user's details filled in.  
- Ensure the resume is concise, professional, and follows the provided design.  
- Use the \`\\header\`, \`\\daterange\`, and other commands as specified.  

**Example Input:**  
- **Name:** John Doe  
- **Job Title:** Full Stack Web Developer  
- **Phone Number:** +91 98765-43210  
- **Email:** john.doe@example.com  
- **LinkedIn:** johndoe  
- **Technical Skills:**  
  - Frontend: React, Angular, HTML5/CSS3  
  - Backend: Node.js, Python, REST APIs  
  - Databases: MongoDB, PostgreSQL  
  - DevOps: Docker, AWS, Jenkins  
  - Tools: Git, Webpack, Postman  
- **Professional Experience:**  
  - Senior Full Stack Developer | Tech Innovators Inc. | Jan 2020 - Present  
    - Led migration to microservices architecture.  
    - Developed real-time analytics dashboard.  
  - Full Stack Developer | Digital Solutions Co. | Jun 2017 - Dec 2019  
    - Built scalable e-commerce platform.  
    - Implemented CI/CD pipeline.  
- **Education:**  
  - B.Sc. Computer Science | State University | 2013 - 2017  
    - GPA: 3.8/4.0  
    - Dean's List (All Semesters)  
- **Key Projects:**  
  - AI Recruitment Platform | React, Python, AWS | 2022 - 2023  
    - Developed ML-powered candidate matching system.  
    - Designed responsive frontend.  
  - Real-Time Collaboration Tool | MERN Stack | 2021 - 2022  
    - Built document editor with operational transformation.  
    - Achieved 10k+ MAU.  

**Example Output:**  
\`\`\`latex  
\\documentclass[11pt, a4paper]{article}  
\\usepackage[utf8]{inputenc}  
\\usepackage[margin=0.5in]{geometry}  
\\usepackage{xcolor}  
\\usepackage{enumitem}  
\\usepackage{hyperref}  
\\usepackage{fontawesome5}  
\\usepackage{tabularx}  

% Orange Theme Colors  
\\definecolor{mainorange}{RGB}{20,20,255}  
\\definecolor{darkorange}{RGB}{0,0,0}  

% Section Header Formatting  
\\usepackage{titlesec}  
\\titleformat{\\section}  
  {\\LARGE\\bfseries\\color{mainorange}}  
  {}  
  {0em}  
  {}  
  [\\titlerule]  

% Subsection Formatting  
\\titleformat{\\subsection}  
  {\\large\\bfseries\\color{darkorange}}  
  {}  
  {0em}  
  {}  

% Date Range Format  
\\newcommand{\\daterange}[2]{%  
  \\small\\color{darkorange}\\faCalendar\\enspace\\textbf{From} #1 \\enspace\\textbar\\enspace \\faCalendarCheck\\enspace\\textbf{To} #2%  
}  

% Header Section  
\\newcommand{\\header}[4]{%  
  \\begin{center}  
    {\\Huge\\bfseries\\color{mainorange}#1}\\\\[0.2em]  
    {\\Large\\color{darkorange}#2}\\\\[1em]  
    \\begin{tabular}{@{}c@{\\hspace{2em}}c@{\\hspace{2em}}c@{}}  
      \\faPhone\\ \\color{darkorange}#3 &  
      \\faEnvelope\\ \\href{mailto:#4}{\\color{darkorange}#4} &  
      \\faLinkedinIn\\ \\href{https://linkedin.com/in/#5}{\\color{darkorange}#5}  
    \\end{tabular}  
  \\end{center}  
  \\vspace{1em}  
}  

\\begin{document}  

% Header Section  
\\header{John Doe}{Full Stack Web Developer}{+91 98765-43210}{john.doe@example.com}{johndoe}  

% Skills Section  
\\section{Technical Skills}  
\\begin{tabularx}{\\textwidth}{@{}>{\\color{darkorange}\\bfseries}l >{\\raggedleft\\arraybackslash}X@{}}  
  Frontend: & React, Angular, HTML5/CSS3 \\\\  
  Backend: & Node.js, Python, REST APIs \\\\  
  Databases: & MongoDB, PostgreSQL \\\\  
  DevOps: & Docker, AWS, Jenkins \\\\  
  Tools: & Git, Webpack, Postman \\\\  
\\end{tabularx}  

% Experience Section  
\\section{Professional Experience}  

\\subsection{Senior Full Stack Developer | Tech Innovators Inc.}  
\\daterange{Jan 2020}{Present}  
\\begin{itemize}[leftmargin=*]  
  \\item Led migration to microservices architecture.  
  \\item Developed real-time analytics dashboard.  
\\end{itemize}  

\\subsection{Full Stack Developer | Digital Solutions Co.}  
\\daterange{Jun 2017}{Dec 2019}  
\\begin{itemize}[leftmargin=*]  
  \\item Built scalable e-commerce platform.  
  \\item Implemented CI/CD pipeline.  
\\end{itemize}  

% Education Section  
\\section{Education}  

\\subsection{B.Sc. Computer Science | State University}  
\\daterange{2013}{2017}  
\\begin{itemize}[leftmargin=*]  
  \\item GPA: 3.8/4.0 \\quad Dean's List (All Semesters)  
  \\item Relevant Coursework: Distributed Systems, Web Architecture, Algorithms  
\\end{itemize}  

% Projects Section  
\\section{Key Projects}  

\\subsection{AI Recruitment Platform | React, Python, AWS}  
\\daterange{2022}{2023}  
\\begin{itemize}[leftmargin=*]  
  \\item Developed ML-powered candidate matching system.  
  \\item Designed responsive frontend.  
\\end{itemize}  

\\subsection{Real-Time Collaboration Tool | MERN Stack}  
\\daterange{2021}{2022}  
\\begin{itemize}[leftmargin=*]  
  \\item Built document editor with operational transformation.  
  \\item Achieved 10k+ MAU.  
\\end{itemize}  

\\end{document}  
\`\`\`
  `;
  return promptTemplate;
};

const deepseek = async (prompt: string): Promise<DeepseekResponse | null> => {
  const response = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that creates a cover letter for a given job description and candidate details.",
      },
      { role: "user", content: prompt },
    ],
  });
  if (response.choices[0]!.message.content) {
    return { coverLetter: response.choices[0]!.message.content };
  } else {
    return null;
  }
};

export default deepseek;
