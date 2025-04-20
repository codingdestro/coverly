import type { Request, Response } from "express";
import { createCoverLetterPrompt, createResume } from "../../utils/deepseek";
import deepseek from "../../utils/deepseek";
import {
  UserDetails,
  Education,
  Experience,
  Social,
} from "../../models/userDetails";
import UserFiles from "../../models/userFiles";
import { createPDF } from "../userFiles";

export const createCoverLetter = async (req: Request, res: Response) => {
  const { jobDescription } = req.body;
  const user = res.locals.user;
  const userId = user.userId;

  const userDetails = await UserDetails.findOne({ userId });
  const education = await Education.find({ userId });
  const experience = await Experience.find({ userId });
  const socialMedia = await Social.find({ userId }); // select every filed except ids

  const userDetailsString = JSON.stringify(userDetails);
  const educationString = JSON.stringify(education);
  const experienceString = JSON.stringify(experience);
  const socialMediaString = JSON.stringify(socialMedia);

  const candidateDetails = `
  ${userDetailsString}
  ${educationString}
  ${experienceString}
  ${socialMediaString}
`;

  const prompt = createCoverLetterPrompt(jobDescription, candidateDetails);
  const coverLetter = await deepseek(prompt, userDetailsString);
  res.json({ ...coverLetter });
};

//User Resume creator from user details in db
export const createResumeTemplate = async (req: Request, res: Response) => {
  console.log("request get from client");
  const user = res.locals.user;
  const userId = user.userId;
  try {
    const userDetails = await UserDetails.findOne({ userId });
    const education = await Education.find({ userId });
    const experience = await Experience.find({ userId });
    const socialMedia = await Social.find({ userId });

    const userDetailsString = JSON.stringify(userDetails);
    const educationString = JSON.stringify(education);
    const experienceString = JSON.stringify(experience);
    const socialMediaString = JSON.stringify(socialMedia);

    const prompt = `
      ${userDetailsString},
      ${educationString},
     ${experienceString}, 
     ${socialMediaString}, 
    `;
    const resume = await createResume(prompt);
    const fileId = await createPDF(resume!.template);

    //save the fileId to userFiles
    const newDocument = new UserFiles({
      fileId,
      userId,
    });
    await newDocument.save();

    res.json({ fileId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating resume" });
  }
};
