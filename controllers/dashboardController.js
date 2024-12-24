const EngineeringLicense = require("../models/licenceSchema");

// Controller function for handling form submission
exports.submitApplication = async (req, res) => {
  try {
    const {
      applicantName,
      email,
      phone,
      country,
      city,
      address,
      companyName,
      registrationNumber,
      engineeringFields,
      licenseType,
      description,
    } = req.body;

    console.log(req.files);
    // Ensure supporting documents are uploaded
    // if (!req.files) {
    //   return res.status(400).send("Please upload supporting documents.");
    // }

    const documents = req.files?.documents.map(file => file.path);

    // Create a new record
    const newLicense = new EngineeringLicense({
      applicantName,
      email,
      phone,
      country,
      city,
      address,
      companyName,
      registrationNumber,
      engineeringFields,
      licenseType,
      documents,
      description,
    });

    // Save to database
    await newLicense.save();
    res.redirect("/dashboard/newApplication");
  } catch (error) {
    console.error("Error saving engineering license application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }
};
