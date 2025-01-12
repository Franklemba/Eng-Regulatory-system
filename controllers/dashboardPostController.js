// dashboardPostController.js



const EngineeringLicense = require("../models/licenseSchema");
const EngineeringProject = require("../models/projectSchema");
const ProductCertificationSchema = require("../models/productCertificationSchema");
const AnnualDeclaration = require("../models/annualDeclarationSchema");
const PremiseLeasing = require("../models/premiseSchema");
const LicenseAndCertification = require("../models/licenseAndCertificationSchema");
const BusinessClosure = require('../models/businessClosureSchema')
const StructuralEnvironmentalLicense = require("../models/structuralEnvironmentalLicenceSchema");
const StatutoryCompliance = require("../models/statutoryComplianceSchema");


const base64Encode = (data) => {
  return Buffer.from(data).toString('base64');
};


// Charles's routes

const submitApplication = async (req, res) => {
  try {
    // Extract basic form fields
    const {
      zebraClientId,
      primaryDiscipline,
      otherDiscipline,
      technicalDescription,
      leadEngineer,
      registrationNumber,
      professionalBody,
      otherProfessionalBody,
      teamMember
    } = req.body;

    // Process file uploads and get their paths
    const designCalculations = req.files.designCalculations?.[0]?.location || '';
    const engineeringDrawings = req.files.engineeringDrawings?.map(file => file.location) || [];
    const feasibilityStudy = req.files.feasibilityStudy?.[0]?.location || '';
    const boqDocument = req.files.boqDocument?.[0]?.location || '';
    const qaqcPlan = req.files.qaqcPlan?.[0]?.location || '';

    // Process team members array
    const teamMembers = [];
    if (Array.isArray(teamMember)) {
      for (let i = 0; i < teamMember.length; i++) {
        if (teamMember[i].name) {  // Only add if name exists
          teamMembers.push({
            name: teamMember[i].name,
            role: teamMember[i].role,
            contact: teamMember[i].contact,
            regNumber: teamMember[i].regNumber
          });
        }
      }
    }
console.log(req.files)
    // Create new application instance
    const newApplication = new EngineeringLicense({
      zebraClientId,
      primaryDiscipline,
      otherDiscipline,
      technicalDescription,
      designCalculations,
      engineeringDrawings,
      leadEngineer,
      registrationNumber,
      professionalBody,
      otherProfessionalBody,
      teamMembers,
      feasibilityStudy,
      boqDocument,
      qaqcPlan,
      userId: req.user._id  // Assuming you have user authentication
    });

    await newApplication.save();

    // Redirect after successful submission
    res.redirect("/dashboard/submittedApplication");

  } catch (error) {
    console.error("Error saving engineering application:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your application.",
      error: error.message
    });
  }
};

const submitSingleDocForApplication = async (req,res) =>{
  
  const docName = req.params.uploadSingleDoc;
  const projectId = req.body.userId; // Replace with the actual project ID
  console.log(docName);
  console.log(projectId);
  

  try {
    

    const updateData = {
      [`${docName}`]: req.file.location, 
    };
    
    console.log(updateData);
    
    EngineeringLicense.findByIdAndUpdate(
        projectId,
        { $set: updateData },
        { new: true } // Return the updated document

    ).then(updatedProject => {
        console.log("Updated Project:", updatedProject);
    }).catch(error => {
        console.error("Error updating project:", error);
    });

    const successMessage = ` ${docName} uploaded successfully`;
  
   res.redirect(`/dashboard/submittedApplication?message=${encodeURIComponent(base64Encode(successMessage))}`);
    
  } catch (error) {

    console.log(error);
    res.send(error.message)
    
  }
}

const submitProject = async (req, res) => {
  try {
    const {
      title,
      projectType,
      projectScope,
      projectValue,
      duration,
      status,
      objectives,
      locations,
      workers
  } = req.body;

    console.log("Received Data:", req.body);

    const filePaths = {};
        for (const field in req.files) {
            filePaths[field] = req.files[field][0].location;
        }

    
    // Parse locations and workers if sent as JSON strings (adjust if frontend sends raw arrays)
    const parsedLocations = typeof locations === 'string' ? JSON.parse(locations) : locations;
    const parsedWorkers = typeof workers === 'string' ? JSON.parse(workers) : workers;
    
    // const documents = req.files.documents?.map(file => file.location) || [];
     console.log('files',req.files);
    //  console.log('documents',documents);
    // Create a new project instance
    const newProject = new EngineeringProject({
      title,
      projectType,
      projectScope,
      projectValue,
      duration,
      status,
      objectives,
      userId:req.user._id,
      locations: parsedLocations, // Array of location objects
      workers: parsedWorkers, // Object with worker categories
      documents: filePaths
    });

    // Handle file uploads if there are any
    // newProject.files = documents;

    // Save the new project to the database
    await newProject.save();

    console.log("Project saved successfully:", newProject);

    // Redirect to a new page after the project is saved
    successMessage = `Project successfully uploaded, Please complete other required mini applications.`;

    res.redirect(`/dashboard/?message=${encodeURIComponent(base64Encode(successMessage))}`);
  
  } catch (error) {
    console.error("Error saving project application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }
};

const submitSingleDocForProject = async (req,res) => {
   const docName = req.params.uploadSingleDoc;
  //  const updatedDocName = "documents." +docName;
  console.log(docName);
  
  const projectId = req.body.userId; // Replace with the actual project ID

  try {
    
    const updateData = {
      [`documents.${docName}`]: req.file.location,
        status: "In Progress", 
    };
    
    console.log(updateData);
    
    EngineeringProject.findByIdAndUpdate(
        projectId,
        { $set: updateData },
        { new: true } // Return the updated document

    ).then(updatedProject => {
        console.log("Updated Project:", updatedProject);
    }).catch(error => {
        console.error("Error updating project:", error);
    });

    const successMessage = ` ${docName} uploaded successfully`;
  
   res.redirect(`/dashboard/reviewCompliance?message=${encodeURIComponent(base64Encode(successMessage))}`);
    
  } catch (error) {

    console.log(error);
    res.send(error.message)
    
  }


   


};


const submitPremiseLeasing = async (req, res) => {


  try {
  

    const {
      applicationType,
      applicantName,
      organizationName,
      zepraClientId,
      phoneNumber,
      emailAddress,
      premisesType,
      physicalAddress,
      provinceCity,
      gpsCoordinates,
      landlordName,
      landlordContact,
      leaseStartDate,
      leaseEndDate,
      monthlyRent,
      totalLeaseValue,
      projectName,
      purposeOfPremises,
      areaSize,
      zoningType,
      declaration,
      authorizedPersonName,
      submissionDate,
      digitalSignature
  } = req.body;

  const files = req.files;

  // Create a new application
  const application = new PremiseLeasing({
      applicationType,
      applicantName,
      organizationName,
      zepraClientId,
      phoneNumber,
      emailAddress,
      premisesType,
      physicalAddress,
      provinceCity,
      gpsCoordinates,
      landlordName,
      landlordContact,
      leaseAgreement: files?.leaseAgreement ? files.leaseAgreement[0].location : undefined,
      leaseStartDate,
      leaseEndDate,
      monthlyRent,
      totalLeaseValue,
      projectName,
      purposeOfPremises,
      areaSize,
      zoningType,
      zoningApproval: files?.zoningApproval ? files.zoningApproval[0].location : undefined,
      environmentalClearance: files?.environmentalClearance ? files.environmentalClearance[0].location : undefined,
      buildingSafetyCert: files?.buildingSafetyCert ? files.buildingSafetyCert[0].location : undefined,
      otherDocs: files?.otherDocs ? files.otherDocs.map(doc => doc.location) : [],
      declaration,
      authorizedPersonName,
      submissionDate,
      digitalSignature,
      userId:req.user._id

  });

    // Save the application to the database
    await application.save();
    const successMessage = ` ${applicantName} premise leasing uploaded successfully`;

    res.redirect(`/dashboard/submittedPremiseLeasings?message=${encodeURIComponent(base64Encode(successMessage))}`);

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting application', error });
}

};

const submitAnnualDeclaration= async (req, res) => {

  try {
    const {

    } = req.body;
    const newAnnualDeclaration = new AnnualDeclaration({

    });

    const documents = req.files?.map(file => file.location) || [];
    await newAnnualDeclaration.save();
    res.redirect("/dashboard/newApplication");
  }
  catch (error) {
    console.error("Error annual declaration application:", error);
    res.status(500).send("An error occurred while processing your application.");
  }

};

const submitProductCertificationApplication = async (req, res) => {
  try {
    const {
      productName,
      manufacturerName,
      model,
      serialNumber,
      source,
      countryOfManufacture,
      productFunctionality,
      standards,
      applicantName,
      submissionDate,
      declaration,
      signature
    } = req.body;

    // Validate required files
    

    const productCertificationApplication = new ProductCertificationSchema({
      productName,
      manufacturerName,
      model,
      serialNumber,
      source,
      countryOfManufacture,
      productFunctionality,
      standards: Array.isArray(standards) ? standards : [standards].filter(Boolean),
      applicantName,
      submissionDate,
      declaration: declaration === 'on' || declaration === true,
      signature,
      // File paths
      productDatasheet: req.files.productDatasheet?.[0]?.location || '' ,
      standardCertifications: req.files.standardCertifications?.[0]?.location || '' ,
      manufacturerAuthorization: req.files.manufacturerAuthorization?.[0]?.location || '' ,
      billOfQuantities: req.files.billOfQuantities?.[0]?.location || '' ,
      
      // Set initial status
      status: 'submitted',
      userId:req.user._id

    });

    // res.send(req.body)
    await productCertificationApplication.save();

    req.flash('success', 'Product certification application submitted successfully');
    res.redirect("/dashboard/productCertificationApplications");
  }
  catch (error) {
    console.error("Error submitting product certification application:", error);
    req.flash('error', 'An error occurred while processing your application');
    res.redirect("/dashboard/productCertificationApplications");
  }
};

const submitSingleDocForProductCertification = async (req, res) => {
  const docName = req.params.uploadSingleDoc;
  //  const updatedDocName = "documents." +docName;
  console.log(docName);
  
  const projectId = req.body.userId; // Replace with the actual project ID

  try {
    
    const updateData = {
      [`${docName}`]: req.file.location
    };
    
    console.log(updateData);
    
    ProductCertificationSchema.findByIdAndUpdate(
        projectId,
        { $set: updateData },
        { new: true } // Return the updated document

    ).then(updatedProject => {
        console.log("Updated Project:", updatedProject);
    }).catch(error => {
        console.error("Error updating project:", error);
    });

    const successMessage = ` ${docName} uploaded successfully`;
  
   res.redirect(`/dashboard/productCertificationApplications?message=${encodeURIComponent(base64Encode(successMessage))}`);
    
  } catch (error) {

    console.log(error);
    res.send(error.message)
    
  }

}


//Franks routes
  // ### Submit business closure route
const submitBusinessClosure =  async (req, res, next) => {

  const {
      businessName,
      licenseID,
      reasonForClosure,
      closureDate
    } = req.body;

  const uploadedDoc = req.file.location;

  try{
    
    const businessClosure = new BusinessClosure({
      businessName,
      licenseID,
      reasonForClosure,
      closureDate,
      finalFinancialStatement : uploadedDoc,
      userId:req.user._id

    })

    await businessClosure.save();
    successMessage = ` ${businessName} business closure uploaded successfully`;

    res.redirect(`/dashboard/businessClosure?message=${encodeURIComponent(base64Encode(successMessage))}`);

  }catch (error) {
    console.error(`Error uploading business closure : ${error.message}`);
    res.send("Error uploading business closure");
  }

 
};

// ## strauctural environment licence over here
const submitStructuralEnvironmentalLicense = async (req, res) => {
  const {
    projectName,
    projectID,
    isEIArequired,
    localEcosystemImpactDescription,
    structuralSafetyStandards,
    structureType,
    environmentalAssessDetails,
    structuralSafetyDetails,
    emergencyResponsePlan
  } = req.body;

  // if(!req.files){
  //   return res.status(404).send('no files uploaded');
  // }

// const uploadedDoc = req.file.path.replace(/.*public[\\/]/, '');
console.log(req.files);
const structuralIntegrityEvaluationReport = req.files.structuralIntegrityEvaluationReport?.[0]?.location || '';
const environmentImpactMitigationPlan = req.files.environmentImpactMitigationPlan?.[0]?.location || '';
const supportingDocument = req.files.supportingDocument?.[0]?.location || '';

try{
  
  const structuralEnvironmentalLicence = new StructuralEnvironmentalLicense({
    projectName,
    projectID,
    isEIArequired,
    localEcosystemImpactDescription,
    structuralSafetyStandards,
    structureType,
    structuralIntegrityEvaluationReport: structuralIntegrityEvaluationReport,
    environmentImpactMitigationPlan: environmentImpactMitigationPlan,
    environmentalAssessDetails,
    structuralSafetyDetails,
    emergencyResponsePlan,
    supportingDocument: supportingDocument ,
    userId:req.user._id

  })

  await structuralEnvironmentalLicence.save();
  console.log(structuralEnvironmentalLicence)
  successMessage = ` License certification uploaded successfully`;

  res.redirect(`/dashboard/structuralEnvironmentalLicenses?message=${encodeURIComponent(base64Encode(successMessage))}`);

}catch (error) {
  console.error(`Error uploading environment structural what what error : ${error.message}`);
  res.send("Error uploading environment structural what what error");
}
};


const submitSingleDocForEnvStructural = async (req, res) => {
  const docName = req.params.uploadSingleDoc;
  //  const updatedDocName = "documents." +docName;
  console.log(docName);
  
  const projectId = req.body.userId; // Replace with the actual project ID

  try {
    
    const updateData = {
      [`${docName}`]: req.file.location
    };
    
    console.log(updateData);
    
    StructuralEnvironmentalLicense.findByIdAndUpdate(
        projectId,
        { $set: updateData },
        { new: true } // Return the updated document

    ).then(updatedProject => {
        console.log("Updated Project:", updatedProject);
    }).catch(error => {
        console.error("Error updating project:", error);
    });

    const successMessage = ` ${docName} uploaded successfully`;
  
   res.redirect(`/dashboard/structuralEnvironmentalLicenses?message=${encodeURIComponent(base64Encode(successMessage))}`);
    
  } catch (error) {

    console.log(error);
    res.send(error.message)
    
  }

}

const submitLicenseAndCertification = async (req, res) => {
  try {
    const {
      companyName,
      membershipClass,
      country,
      additionalInfo,
      subcontractor
    } = req.body;


    console.log(req.file);



    const newCertificationAndLicense = new LicenseAndCertification({
      companyName,
      membershipClass,
      country,
      additionalInfo,
      subcontractor,
      licenseAndCertificationDoc:req.file.location,
      userId:req.user._id
    });

    await newCertificationAndLicense.save();
    const successMessage = 'Certificate and License uploaded successfully';
    res.redirect(`/dashboard/?message=${encodeURIComponent(base64Encode(successMessage))}`);

  } catch (error) {
    console.error("Error in license and certification submission:", error);
    res.status(500).send("An error occurred while processing your application.");
  }

};
// ####statutory compliance documents route
const statutoryCompliance = async (req, res) => {
  try {
    const user = req.user;
 

    const zppaDocument = req.files.zppaDocument?.[0]?.location || '' ;
    const pacraDocument = req.files.pacraDocument?.[0]?.location || '';
    const taxDocument = req.files.taxDocument?.[0]?.location || '';
    const workersCompensation = req.files.workersCompensation?.[0]?.location || '';
    const energyRegulation = req.files.energyRegulation?.[0]?.location || '';
    const nhimaDocument = req.files.nhimaDocument?.[0]?.location || '';

    // Create document object with required fields
    const documentData = {
      userId: req.user._id,
      userEmail: user.email,
      zppaDocument,
      pacraDocument,
      taxDocument,
      workersCompensation,
      energyRegulation,
      nhimaDocument
    };

    documentData.otherDocuments = req.files.otherDocuments?.map(file => file.location) || [];
    // Add other documents if present
    

    const statutoryComplianceDoc = new StatutoryCompliance(documentData);
    await statutoryComplianceDoc.save();

    const successMessage = 'Statutory compliance documents uploaded successfully';
    res.redirect(`/dashboard/newCompliance?message=${encodeURIComponent(base64Encode(successMessage))}`);

  } catch (error) {
    console.error('Error uploading statutory documents:', error);
    res.status(500).json({ error: 'Error uploading statutory documents' });
  }
};

const submitSingleDocForCompliance = async (req, res) => {
  const docName = req.params.uploadSingleDoc;
  //  const updatedDocName = "documents." +docName;
  console.log(docName);
  
  const projectId = req.body.userId; // Replace with the actual project ID

  try {
    
    const updateData = {
      [`${docName}`]: req.file.location
    };
    
    console.log(updateData);
    
    StatutoryCompliance.findByIdAndUpdate(
        projectId,
        { $set: updateData },
        { new: true } // Return the updated document

    ).then(updatedProject => {
        console.log("Updated Project:", updatedProject);
    }).catch(error => {
        console.error("Error updating project:", error);
    });

    const successMessage = ` ${docName} uploaded successfully`;
  
   res.redirect(`/dashboard/reviewCompliance?message=${encodeURIComponent(base64Encode(successMessage))}`);
    
  } catch (error) {

    console.log(error);
    res.send(error.message)
    
  }

}

const submitAssessment = async (req, res) => console.log(req.body);



module.exports = {
  submitApplication,
  submitSingleDocForApplication,
  submitProject,
  submitSingleDocForProject,
  submitPremiseLeasing,
  submitAnnualDeclaration,
  submitProductCertificationApplication,
  submitSingleDocForProductCertification,
  submitBusinessClosure,
  submitStructuralEnvironmentalLicense,
  submitSingleDocForEnvStructural,
  submitLicenseAndCertification,
  statutoryCompliance,
  submitSingleDocForCompliance,
  submitAssessment,
};
