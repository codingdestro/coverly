import { OpenAI } from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.OPENAI_API_KEY,
});

export const createPrompt = (
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
