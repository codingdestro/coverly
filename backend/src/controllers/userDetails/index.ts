import type { Request, Response } from "express";
import {
  Education,
  Experience,
  Social,
  UserDetails,
} from "../../models/userDetails";

//adding user details to db
export const addUserDetails = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, city, state, zip } = req.body;
    const userId = req.body.user.userId;

    // Check if user details already exist
    let userDetails = await UserDetails.findOne({ userId });

    if (userDetails) {
      // Update existing user details
      userDetails.name = name;
      userDetails.email = email;
      userDetails.phone = phone;
      userDetails.city = city;
      userDetails.state = state;
      userDetails.zip = zip;
      userDetails.updatedAt = new Date();
      await userDetails.save();
    } else {
      // Create new user details
      userDetails = new UserDetails({
        userId,
        name,
        email,
        phone,
        city,
        state,
        zip,
      });
      await userDetails.save();
    }

    // Redirect back to dashboard with success message
    res.redirect("/dashboard?message=Details saved successfully");
  } catch (error) {
    console.error("Error saving user details:", error);
    res.redirect("/dashboard?error=Failed to save details");
  }
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
    res.status(404).json({ message: "User details not found" });
    return;
  }
  res.status(200).json(userDetails);
};

export const getEducation = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const education = await Education.find({ userId });
  if (!education) {
    res.status(404).json({ message: "Education not found" });
    return;
  }
  res.status(200).json(education);
};

export const getExperience = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const experience = await Experience.find({ userId });
  if (!experience) {
    res.status(404).json({ message: "Experience not found" });
    return;
  }
  res.status(200).json(experience);
};

export const getSocialMedia = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const socialMedia = await Social.find({ userId });
  if (!socialMedia) {
    res.status(404).json({ message: "Social media not found" });
    return;
  }
  res.status(200).json(socialMedia);
};
