import { OpenAI } from "openai";
import { queryChroma } from "./chroma";

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
  coverLetter: string;
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
        content: `You are a helpful assistant that creates a cover letter for a given job description and candidate details. organize the coverletter in a way that is easy to read and understand properly and use proper given details. the output should be in raw text don't add any comments or anything else. ${userDetails}`,
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

const pmt = `I need a professional LaTeX resume template with the following specifications:

1. **Document Structure**:
   - 10pt article class
   - UTF-8 encoding
   - 0.75-inch margins
   - Two-column layout using paracol

2. **Required Packages**:
   - inputenc, geometry, xcolor, paracol, enumitem, hyperref, fontawesome5
   - Proper package configuration

3. **Content Sections**:
   - Header with name, title, and contact information
   - Summary section
   - Experience with bullet points
   - Education
   - Skills (with badge-style formatting)
   - Projects
   - Languages

4. **Styling Requirements**:
   - Custom color scheme (primary, secondary, accent)
   - Section dividers
   - Consistent spacing
   - Proper hyperlink formatting
   - FontAwesome icons for contact info

5. **Error Prevention**:
   - All commands must be properly defined
   - No unclosed environments
   - Proper escaping of special characters
   - Valid column switching in paracol
   - Correct package usage

Please:
1. Generate complete compilable LaTeX code
2. Include detailed comments explaining key sections
3. Ensure all brackets and braces are properly matched
4. Verify all commands are defined before use
5. Use robust column switching in the paracol environment`;

export const createResume = async (prompt: string) => {
  const document = await queryChroma({
    nResults: 1,
    queryTexts: "resume template",
  });
  const res = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: `you are latex resume template generate, you creates template according to user details and context of template ${document.documents} `,
      },
      {
        role: "user",
        content: `${pmt} inject the user details ${prompt} `,
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
