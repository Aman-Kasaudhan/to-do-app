import SibApiV3Sdk from 'sib-api-v3-sdk';

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications['api-key'];

apiKey.apiKey = process.env.API_KEY

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendOtp(email, otp) {

    const sender = {
        email: "rajg99842@gmail.com",
        name: "To-Do App"
    };

    const receivers = [
        {
            email: email
        }
    ];

   const res= await tranEmailApi.sendTransacEmail({

        sender,

        to: receivers,

        subject: "OTP Verification",

        htmlContent: `
                     
 
       
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    
    <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px; text-align: center;">
        
        <h2 style="color: #333;">OTP Verification</h2>

        <p style="font-size: 16px; color: #555;">
            Use the OTP below to verify your account.
        </p>

        <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #2563eb;
            margin: 20px 0;
        ">
            ${otp}
        </div>

        <p style="color: #777; font-size: 14px;">
            This OTP is valid for 5 minutes.
        </p>

        <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If you did not request this OTP, please ignore this email.
        </p>

    </div>

</div>

       
        `
    });
}
// console.log(res)
export default sendOtp;
