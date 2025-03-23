import type { Request, Response } from "express";
import {
  Education,
  Experience,
  Social,
  UserDetails,
} from "../../models/userDetails";

//adding user details to db
export const addUserDetails = async (req: Request, res: Response) => {
  const { name, email, phone, address, city, state, zip } = req.body;
  const userDetails = new UserDetails({
    name,
    email,
    phone,
    address,
    city,
    state,
    zip,
  });
  await userDetails.save();
  res.status(201).json(userDetails);
};

export const addSocialMedia = async (req: Request, res: Response) => {
  const { social, url } = req.body;
  const socialMedia = new Social({ social, url });
  await socialMedia.save();
  res.status(201).json(socialMedia);
};

export const addEducation = async (req: Request, res: Response) => {
  const { school, degree, fieldOfStudy, startDate, endDate, description } =
    req.body;
  const education = new Education({
    school,
    degree,
    fieldOfStudy,
    startDate,
    endDate,
    description,
  });
  await education.save();
  res.status(201).json(education);
};

export const addExperience = async (req: Request, res: Response) => {
  const { company, title, location, startDate, endDate, description } =
    req.body;
  const experience = new Experience({
    company,
    title,
    location,
    startDate,
    endDate,
    description,
  });
  await experience.save();
  res.status(201).json(experience);
};

//getting user details by user id
//add error handling for not found
export const getUserDetails = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userDetails = await UserDetails.find({ userId });
  if (!userDetails) {
    return res.status(404).json({ message: "User details not found" });
  }
  res.status(200).json(userDetails);
};

export const getEducation = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const education = await Education.find({ userId });
  if (!education) {
    return res.status(404).json({ message: "Education not found" });
  }
  res.status(200).json(education);
};

export const getExperience = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const experience = await Experience.find({ userId });
  if (!experience) {
    return res.status(404).json({ message: "Experience not found" });
  }
  res.status(200).json(experience);
};

export const getSocialMedia = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const socialMedia = await Social.find({ userId });
  if (!socialMedia) {
    return res.status(404).json({ message: "Social media not found" });
  }
  res.status(200).json(socialMedia);
};
