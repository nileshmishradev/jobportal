import express from "express";
import {
  registerCompany,
  loginCompany,
  getCompanyData,
  postJob,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  changeJobApplicationStatus,
  changeVisibility,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

//register a company
router.post("/register", upload.single("image"), registerCompany);

//company login
router.post("/login", loginCompany);

//get company data
router.get("/company", protectCompany, getCompanyData);

//post a new job
router.post("/post-job", protectCompany, postJob);

//get company job applicants
router.get("/applicants", protectCompany, getCompanyJobApplicants);

//get company posted jobs
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

//change job application status
router.post("/change-status", protectCompany, changeJobApplicationStatus);

//change job visibilities
router.post("/change-visiblity", protectCompany, changeVisibility);

export default router;