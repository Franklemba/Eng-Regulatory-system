
const EngineeringLicense = require("../models/licenseSchema");
const EngineeringProject = require("../models/projectSchema");
const ProductCertifications = require("../models/productCertificationSchema");
const AnnualDeclaration = require("../models/annualDeclarationSchema");
const PremiseLeasing = require("../models/premiseSchema");
const BusinessClosure = require("../models/businessClosureSchema");
const OrderForSupply = require("../models/orderForSupplySchema");
const AwarenessAdvert = require("../models/awarenessAdvertSchema");
const StructuralEnvironmentalLicense = require("../models/structuralEnvironmentalLicenceSchema");



const deleteApplication = async (req, res) => {
    try {
      const { id } = req.params;
      await EngineeringLicense.findByIdAndDelete(id);
      res.redirect("/dashboard/submittedApplication");
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).send("An error occurred while processing your application.");
    }
  };

  const deleteProductCertification = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      await ProductCertifications.findByIdAndDelete(id);
      res.redirect("/dashboard/productCertificationApplications");
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).send("An error occurred while processing your application.");
    }
  };


  module.exports = {deleteApplication, deleteProductCertification};