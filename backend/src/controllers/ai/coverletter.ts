import type { Request, Response } from "express";
import {
  createCoverLetterPrompt,
  createResumePrompt,
} from "../../utils/deepseek";
import deepseek from "../../utils/deepseek";
import {
  UserDetails,
  Education,
  Experience,
  Social,
} from "../../models/userDetails";

export const createCoverLetter = async (req: Request, res: Response) => {
  const jobDescription = `
  Job Title: Full Stack Web Developer Intern (Paid)
Company: WebBoost Solutions by UM
Location: Remote
Duration: 3 months
Employment Opportunity: Potential full-time role based on performance, with a Certificate of Internship.
About WebBoost Solutions by UM
WebBoost Solutions by UM provides students and graduates with practical learning opportunities and career growth in web development through real-world projects.
Role Overview
As a Full Stack Web Developer Intern, you will work on real-world projects, gaining hands-on experience in both front-end and back-end development while enhancing your technical expertise.
Responsibilities
✅ Design, code, and modify websites to ensure functionality and visual appeal.
✅ Develop responsive and dynamic web pages.
✅ Test and debug websites to ensure a seamless user experience.
✅ Utilize modern web development tools and frameworks.
Requirements
🎓 Currently enrolled in or recently graduated from a relevant program.
💻 Proficiency in HTML, CSS, and JavaScript.
🌐 Familiarity with frameworks such as React, Angular, or Node.js (preferred).
🗣 Strong communication and teamwork skills.
Stipend & Benefits
💰 Stipend: ₹7,500 - ₹15,000 (Performance-Based).
✔ Gain hands-on web development experience.
✔ Certificate of Internship & Letter of Recommendation.
✔ Build your portfolio with real-world projects.
How to Apply
📩 Submit your application by 23rd March 2025 with "Full Stack Web Developer Intern Application" as the subject.
Equal Opportunity
WebBoost Solutions by UM is an equal opportunity employer, encouraging applications from candidates of all backgrounds.
`;

  const candidateDetails = `
my name is mohd anas
my email is anas@gmail.com
my phone number is 9876543210
my skills are html, css, javascript, react, node.js, express, mongodb
my experience is 1 year
my education is btech
`;

  const prompt = createCoverLetterPrompt(jobDescription, candidateDetails);
  const coverLetter = await deepseek(prompt);
  res.json(coverLetter);
};

//User Resume creator from user details in db
export const createResume = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const userDetails = await UserDetails.findById(userId);
    const education = await Education.find({ userId });
    const experience = await Experience.find({ userId });
    const socialMedia = await Social.find({ userId });

    const userDetailsString = JSON.stringify(userDetails);
    const educationString = JSON.stringify(education);
    const experienceString = JSON.stringify(experience);
    const socialMediaString = JSON.stringify(socialMedia);

    const prompt = createResumePrompt(
      userDetailsString,
      educationString,
      experienceString,
      socialMediaString,
    );
    const resume = await deepseek(prompt);
    res.json(resume);
  } catch {
    res.status(500).json({ message: "Error creating resume" });
  }
};
