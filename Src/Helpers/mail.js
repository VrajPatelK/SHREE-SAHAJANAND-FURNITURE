const nodemailer = require('nodemailer');
const { google } = require('googleapis'); // must not be wrote like this const google = require('googleapis');--> it will not work
const fs = require('fs');

// const OWNER = process.env.OWNER;
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
// const htmlContent = fs.readFileSync('doc.html', 'utf-8');

module.exports = {
    sendMail: async (mail, cid, makeid) => {
        try {
            const accessToken = await oAuth2Client.getAccessToken();
            // const accessToken = "ya29.a0AX9GBdU-WGCjpARufbYmxvUhI0J5gcJ4Y0yqXnFEKnqr_8dL2mwZYi0Cn4MT2UenRSvbKlSQAHUbwTeSFl6na7OyMmGd3wIdxVV5oeKAtHrSLSDzvHDroseSs6zex8bVgJDoFOf_1MJDnw1qR15Dpov2Z_4s29saCgYKARESAQASFQHUCsbCGM63SWTwC3TA9KPpSlgSpQ0166";

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.OWNER,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken
                }
            });

            const htmlContent =
                `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Change-Password</title>
                    </head>
                    <body>
                        <div style="width: 50%;border: .5px solid brown; padding-block: .5rem;border-radius: .5rem;background: #E5E5CB;">
                            <h2 style="color: brown;text-align: center;padding-block: 1rem;">Shree Shajanand Furniture</h2>
                            <div style="margin:2rem;text-align: center;">
                                <a href="${process.env.DOMAIN}/reset-password/${cid}/${makeid}" style="background: brown;
                                color: white;
                                padding: 1rem;
                                text-decoration: none;
                                border-radius: .5rem;margin-inline: 2rem;">Change-Password</a>
                            </div>
                        </div>
                    </body>
                </html>`;

            const mailConfigurations = {

                // It should be a string of sender email
                from: process.env.OWNER,

                // Comma Separated list of mails
                to: mail,

                // Subject of Email
                subject: 'SSF - Password Change',

                // // This would be the text of email body
                // text: 'Hi! There, You know I am using the'
                //     + ' NodeJS Code along with NodeMailer '
                //     + 'to send this email.',
                html: htmlContent
            };

            const result = await transporter.sendMail(mailConfigurations);

            return result;
        } catch (error) {
            return error;
        }
    }
}


