require("dotenv").config();
var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// var apiKey = defaultClient.authentications["api-key"];
// const key = process.env.EMAILAPI;
// apiKey.apiKey = key;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


// Check if the API key is set properly
if (!process.env.EMAILAPI) {
  console.error("API key is not defined");
  process.exit(1);
}



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





module.exports = { sendOTPemail };