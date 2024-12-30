const EngineeringLicense = require("../models/licenseSchema");
const EngineeringProject = require("../models/projectSchema");
const productCertification = require("../models/productCertificationSchema");
const AnnualDeclaration = require("../models/annualDeclarationSchema");
const PremiseLeasing = require("../models/premiseSchema");
const BusinessClosure = require("../models/businessClosureSchema");
const OrderForSupply = require("../models/orderForSupplySchema");
const AwarenessAdvert = require("../models/awarenessAdvertSchema");
const StatutoryCompliance = require("../models/statutoryComplianceSchema");
const productCertificationSchema = require("../models/productCertificationSchema");


const viewApplicationPage = async (req, res) => {
  try {
      const id = req.params.id;
      const application = await EngineeringLicense.findOne({_id: id});
      
      if (!application) {
          return res.status(404).send('Application not found');
      }

      console.log(application);
      res.render("home/dashboard/singleViews/viewApplication", {
          layout: "layouts/dashboardHeader.ejs",
          user: req.user,
          application
      });
  } catch (error) {
      console.error('Error fetching application:', error);
      res.status(500).send('Error loading application');
  }
};
  
const viewProductCertificationPage = async (req, res) => {
    try {
        const id = req.params.id;
        const productCertification = await productCertificationSchema.findOne({_id: id});
        
        if (!productCertification) {
            return res.status(404).send('productCertification not found');
        }
  
        console.log(productCertification);
        res.render("home/dashboard/singleViews/viewProductCertification", {
            layout: "layouts/dashboardHeader.ejs",
            user: req.user,
            productCertification
        });
    } catch (error) {
        console.error('Error fetching productCertification:', error);
        res.status(500).send('Error loading productCertification');
    }
  };
  module.exports = {viewApplicationPage, viewProductCertificationPage};