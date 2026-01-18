import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

//register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;
  if (!name || !email || !imageFile || !password) {
    return res.json({ message: "All fields are required", success: false });
  }

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.json({ message: "Company already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      image: imageUpload.secure_url,
      password: hashPassword,
    });

    res.json({
      message: "Company registered successfully",
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

//company login
export const loginCompany = async (req, res) => {
  // Logic to handle company login
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (await bcrypt.compare(password, company.password)) {
      res.json({
        message: "Login successful",
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({
        message: "Invalid email or password",
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

//get company data
export const getCompanyData = async (req, res) => {
  // Logic to get company data

  try {
    const company = req.company; // here req.company is in middleware (check middleware) (include token in postmain or thunderclient)
    res.json({
      success: true,
      company,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//post a new job
export const postJob = async (req, res) => {
  // Logic to post a new job
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id; // here req.company is in middleware (check middleware) (include token in postmain or thunderclient)

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();
    res.json({
      message: "Job posted successfully",
      success: true,
      newJob,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

//get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  // Logic to get posted jobs for a company
  try {
    const companyId = req.company._id; // here req.company is in middleware (check middleware) (include token in postmain or thunderclient)
    const jobs = await Job.find({ companyId });

   const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    res.json({
      success: true,
      jobsData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//get company job applicants
export const getCompanyJobApplicants = async (req, res) => {
  // Logic to get job applicants for a company
  try {
    const companyId = req.company._id;
    //find job applications for the user and populate related data
    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//change job application status (accept or reject)
export const changeJobApplicationStatus = async (req, res) => {
    // Logic to change the status of a job application
  try {
    const { id, status } = req.body;

    //find job application data and update status
    await JobApplication.findOneAndUpdate({ _id: id }, { status });

    res.json({ success: true, message: "s Changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//change job visibilities
export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;

    // Get the logged-in company's ID(token) from the request (set by auth middleware see middleware you will se  req.company)
    const companyId = req.company._id;

    // Find the job document by req.body ID
    const job = await Job.findById(id);

    // Check if the logged-in company owns this job
    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible; // toggle visible 
    }

    await job.save();
    res.json({
      success: true,
      message: "Job visibility changed successfully",
      job,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
