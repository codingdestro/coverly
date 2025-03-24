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

    // Return JSON response instead of redirecting
    res.status(200).json({ message: "Details saved successfully" });
  } catch (error) {
    console.error("Error saving user details:", error);
    res.status(500).json({ message: "Failed to save details" });
  }
};

export const addSocialMedia = async (req: Request, res: Response) => {
  try {
    const { social, url, user } = req.body;
    const userId = user.userId;
    const socialMedia = new Social({ userId, social, url });
    await socialMedia.save();
    res.status(201).json(socialMedia);
  } catch (error) {
    console.error("Error adding social media:", error);
    res.status(500).json({ message: "Failed to add social media" });
  }
};

export const addEducation = async (req: Request, res: Response) => {
  try {
    const { school, degree, fieldOfStudy, startDate, endDate, description } =
      req.body;
    const userId = req.body.user.userId;
    const education = new Education({
      userId,
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      description,
    });
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    console.error("Error adding education:", error);
    res.status(500).json({ message: "Failed to add education" });
  }
};

export const addExperience = async (req: Request, res: Response) => {
  try {
    const { company, title, location, startDate, endDate, description } =
      req.body;
    const userId = req.body.user.userId;
    const experience = new Experience({
      userId,
      company,
      title,
      location,
      startDate,
      endDate,
      description,
    });
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    console.error("Error adding experience:", error);
    res.status(500).json({ message: "Failed to add experience" });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.userId;
    const userDetails = await UserDetails.findOne({ userId });
    if (!userDetails) {
      res.status(404).json({ message: "User details not found" });
      return;
    }
    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error getting user details:", error);
    res.status(500).json({ message: "Failed to get user details" });
  }
};

export const getEducation = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.userId;
    const education = await Education.find({ userId }).sort({ startDate: -1 });
    res.status(200).json(education);
  } catch (error) {
    console.error("Error getting education:", error);
    res.status(500).json({ message: "Failed to get education" });
  }
};

export const getExperience = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.userId;
    const experience = await Experience.find({ userId }).sort({
      startDate: -1,
    });
    res.status(200).json(experience);
  } catch (error) {
    console.error("Error getting experience:", error);
    res.status(500).json({ message: "Failed to get experience" });
  }
};

export const getSocialMedia = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.userId;
    const socialMedia = await Social.find({ userId });
    res.status(200).json(socialMedia);
  } catch (error) {
    console.error("Error getting social media:", error);
    res.status(500).json({ message: "Failed to get social media" });
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.body.user.userId;
    const { school, degree, fieldOfStudy, startDate, endDate, description } =
      req.body;

    const education = await Education.findOne({ _id: id, userId });
    if (!education) {
      res.status(404).json({ message: "Education not found" });
      return;
    }

    education.school = school;
    education.degree = degree;
    education.fieldOfStudy = fieldOfStudy;
    education.startDate = startDate;
    education.endDate = endDate;
    education.description = description;

    await education.save();
    res.status(200).json(education);
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ message: "Failed to update education" });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.body.user.userId;
    const { company, title, location, startDate, endDate, description } =
      req.body;

    const experience = await Experience.findOne({ _id: id, userId });
    if (!experience) {
      res.status(404).json({ message: "Experience not found" });
      return;
    }

    experience.company = company;
    experience.title = title;
    experience.location = location;
    experience.startDate = startDate;
    experience.endDate = endDate;
    experience.description = description;

    await experience.save();
    res.status(200).json(experience);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Failed to update experience" });
  }
};

export const updateSocial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.body.user.userId;
    const { social, url } = req.body;

    const socialMedia = await Social.findOne({ _id: id, userId });
    if (!socialMedia) {
      res.status(404).json({ message: "Social media not found" });
      return;
    }

    socialMedia.social = social;
    socialMedia.url = url;

    await socialMedia.save();
    res.status(200).json(socialMedia);
  } catch (error) {
    console.error("Error updating social media:", error);
    res.status(500).json({ message: "Failed to update social media" });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.body.user.userId;

    const education = await Education.findOneAndDelete({ _id: id, userId });
    if (!education) {
      res.status(404).json({ message: "Education not found" });
      return;
    }

    res.status(200).json({ message: "Education deleted successfully" });
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({ message: "Failed to delete education" });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.body.user.userId;

    const experience = await Experience.findOneAndDelete({ _id: id, userId });
    if (!experience) {
      res.status(404).json({ message: "Experience not found" });
      return;
    }

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ message: "Failed to delete experience" });
  }
};

export const deleteSocial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.body.user.userId;

    const socialMedia = await Social.findOneAndDelete({ _id: id, userId });
    if (!socialMedia) {
      res.status(404).json({ message: "Social media not found" });
      return;
    }

    res.status(200).json({ message: "Social media deleted successfully" });
  } catch (error) {
    console.error("Error deleting social media:", error);
    res.status(500).json({ message: "Failed to delete social media" });
  }
};
