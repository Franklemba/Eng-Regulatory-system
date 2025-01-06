require("dotenv").config();
//  require("dotenv").config();
var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.EMAILAPI;

// BREVO_EMAIL_API = 

//apiKey.apiKey =   	v.BREVO_EMAIL_API;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


const sendOTPemail = (userName, email, otp)=>{

    apiInstance
         .sendTransacEmail({
           sender: { email: `odtm00@gmail.com`, name: 'ZEPRA' },
           subject: "ZEPRA Account",
           htmlContent: `<html>
           <head></head>
           <body></body>
           </html>
           `,
           messageVersions: [
             //Definition for Message Version 1
             {
               to: [
                 {
                   email: email,
                   name: userName,
                 },
               ],
               htmlContent: generateOtpHTML({otp }),
               subject: "Email Verification! ~ ZEPRA",
             }
           ],
         })
         .then(
           function (data) {
             console.log(data);
           },
           function (error) {
               console.error(error);
             return null;
           }
         );
}
  
  

  function generateOtpHTML({ otp }) {
    const emailHtml = `
    <div style="max-width: 400px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333;">ZEPRA Account Email Verification</h2>
    <p style="color: #555; margin-bottom: 20px;">Thank you for registering with ZEPRA. OTP code:</p>


    <h1 style="display: inline-block; text-decoration: none; background-color: #ffc107; color: #333; padding: 10px 20px; border-radius: 5px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">${otp}</h1>

  
    <p style="color: #555; margin-top: 20px;">If you didn't register with ZEPRA , please ignore this email.</p>
  </div>
    `
    return emailHtml;
  }


  function sendReviewRequestEmail(email, requestCount){

  }

  function generateRequestForReviewEmail(){

  }

  function generateRequestForReviewAdminEmail(){

  }


  async function sendReviewRequestEmail(email, requestCount) {
    try {
      // Send email to user
      apiInstance.sendTransacEmail({
        sender: { 
          email: 'zepra@co.zm', 
          name: 'ZEPRA' 
        },
        subject: "Review Request Confirmation",
        htmlContent: `<html><head></head><body></body></html>`,
        messageVersions: [
          {
            to: [{ email }],
            htmlContent: generateRequestForReviewEmail(requestCount),
            subject: "Your Review Request Has Been Submitted",
          }
        ],
      });
  
      // Send notification to admin
      await apiInstance.sendTransacEmail({
        sender: { 
          email: 'zepra@co.zm', 
          name: 'System Notifications' 
        },
        subject: "New Review Request",
        htmlContent: `<html><head></head><body></body></html>`,
        messageVersions: [
          {
            to: [{ 
              email: 'chisalecharles23@gmail.com',
              name: 'Admin'
            },{ 
              email: 'franklembalemba3@gmail.com',
              name: 'Admin'
            },{ 
              email: 'Kawazalawson08@gmail.com',
              name: 'Admin'
            }],
          
            htmlContent: generateRequestForReviewAdminEmail(email, requestCount),
            subject: "New Review Request Received",
          }
        ],
      });
  
      return true;
    } catch (error) {
      console.error('Failed to send review request emails:', error);
      throw error;
    }
  }
  function generateRequestForReviewEmail(requestCount) {
    const isFirstRequest = requestCount === 1;
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #024731;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
          .header h3 {
            margin: 5px 0 0 0;
            font-size: 16px;
            font-weight: normal;
          }
          .content {
            padding: 20px;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            margin-top: 20px;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          ul li {
            background: #f8f9fa;
            padding: 8px;
            margin: 5px 0;
            border-left: 4px solid #024731;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #024731;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
          }
          .btn:hover {
            background-color: #016326;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Review Request Confirmation</h2>
            <h3>Zambia Engineering and Procurement Regulatory Authority</h3>
          </div>
          <div class="content">
            <p>Hello,</p>
            ${isFirstRequest ? `
              <p>Thank you for submitting your first review request! We have received your submission and our team will review it shortly.</p>
            ` : `
              <p>Thank you for submitting another review request! This is request number ${requestCount} from you.</p>
            `}
  
            <p>What happens next:</p>
            <ul>
              <li>Our review team will assess your submission</li>
              <li>You will receive feedback within 2-3 business days</li>
              <li>We may contact you if we need any additional information</li>
            </ul>
  
            <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
  
            <p>Best regards,<br>ZEPRA Team</p>
          </div>
          <div class="footer">
            <p>This is an automated message, please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  function generateRequestForReviewAdminEmail(userEmail, requestCount) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #024731;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
          .header h3 {
            margin: 5px 0 0 0;
            font-size: 16px;
            font-weight: normal;
          }
          .content {
            padding: 20px;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            margin-top: 20px;
          }
          .highlight {
            background-color: #e8f5e9;
            padding: 2px 5px;
            border-left: 4px solid #024731;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          ul li {
            background: #f8f9fa;
            padding: 8px;
            margin: 5px 0;
            border-left: 4px solid #024731;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Review Request Received</h2>
            <h3>Zambia Engineering and Procurement Regulatory Authority</h3>
          </div>
          <div class="content">
            <p>Hello Admin,</p>
  
            <p>A new review request has been submitted with the following details:</p>
  
            <ul>
              <li>User Email: <span class="highlight">${userEmail}</span></li>
              <li>Request Count: <span class="highlight">${requestCount}</span></li>
              <li>Submission Time: <span class="highlight">${new Date().toLocaleString()}</span></li>
            </ul>
  
            <p>Please review this submission at your earliest convenience.</p>
  
            <p>User History:</p>
            <ul>
              <li>Total Requests: ${requestCount}</li>
              <li>Status: ${requestCount === 1 ? 'First-time requester' : 'Returning requester'}</li>
            </ul>
  
            <p>Best regards,<br>ZEPRA System</p>
          </div>
          <div class="footer">
            <p>This is an automated administrative notification.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }


module.exports = { sendOTPemail, sendReviewRequestEmail};