import axios from 'axios';
import * as crypto from 'crypto';

describe('Halopesa Payment Tests', () => {
  const mid = "2222244444777777";
  const tid = "771199";
  const username = "+2557877788899";
  const secretKey = 'irqVzdWnXpEjietOZezxYpvkSxYr39Xm';

  it('should authenticate and perform complete Halopesa payment with Java app', async () => {
    // Authentication
    const authTimestamp = Date.now().toString();
    const authPayload = `${mid}${tid}${username}${authTimestamp}`;
    const authHash = crypto.createHmac('sha256', secretKey).update(authPayload).digest('hex');
    const authSignature = `HmacSHA256;${authHash}`;

    const authUrl = 'https://appuat.instantpaygateway.com/merchant-payment-api/payment/authenticate';
    const authHeaders = {
      'X-Payload-Signature': authSignature,
      'Timestamp': authTimestamp,
      'Content-Type': 'application/json',
    };
    const authData = {
      mid: mid,
      tid: tid,
      username: username,
      password: '123456',
    };

    try {
      console.log("📤 Authentication Headers:");
      console.log(JSON.stringify(authHeaders, null, 2));
      console.log("📤 Authentication Payload:");
      console.log(JSON.stringify(authData, null, 2));
      
      const authResponse = await axios.post(authUrl, authData, { headers: authHeaders });
      console.log("📥 Authentication Response:");
      console.log(JSON.stringify(authResponse.data, null, 2));
      
      const token = authResponse.data.data.token;

      // Payment - Java app will handle mock engine communication
      const paymentAmount = 1;
      const phoneNumber = '+2557477788899';
      const paymentTimestamp = Date.now().toString();
      const paymentPayload = `${mid}${tid}${paymentAmount}${phoneNumber}${paymentTimestamp}`;
      const paymentHash = crypto.createHmac('sha256', secretKey).update(paymentPayload).digest('hex');
      const paymentSignature = `HmacSHA256;${paymentHash}`;

      const paymentUrl = 'https://appuat.instantpaygateway.com/merchant-payment-api/payment/mno';
      const paymentHeaders = {
        'X-Payload-Signature': paymentSignature,
        'Timestamp': paymentTimestamp,
        'X-XSRF-TOKEN': token,
        'Content-Type': 'application/json',
      };
      const paymentData = {
        mid: mid,
        tid: tid,
        amount: paymentAmount,
        issuerName: 'HALOPESA',
        enteredBy: 'Sushant Pandey',
        currency: 'TZS',
        tenantId: '000',
        phoneNumber: phoneNumber
      };

      console.log("📤 Payment Payload:");
      console.log(JSON.stringify(paymentData, null, 2));

      const paymentResponse = await axios.post(paymentUrl, paymentData, { headers: paymentHeaders });
      console.log("📥 Payment Response:");
      console.log(JSON.stringify(paymentResponse.data, null, 2));
      
      // Get transaction ID from initial response
      const transactionId = paymentResponse.data.data?.transactionIdentifier || paymentResponse.data.data?.id;

      if (transactionId) {
        // Wait for Java app to complete mock engine communication (ACK + FIN)
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

        // Check final payment status after mock engine flow
        const statusUrl = `https://appuat.instantpaygateway.com/merchant-payment-api/payment/status/${transactionId}`;
        const statusHeaders = {
          'X-XSRF-TOKEN': token,
          'Content-Type': 'application/json',
        };

        try {
          const statusResponse = await axios.get(statusUrl, { headers: statusHeaders });
          console.log("📥 Status Check Response:");
          console.log(JSON.stringify(statusResponse.data, null, 2));
        } catch (statusError: any) {
          console.log("ℹ️ Status endpoint not available");
        }
      }

    } catch (error: any) {
      console.log("❌ Halopesa Payment Error:");
      console.error(error.message);
      if (error.response) {
        console.log("❌ Error Response:");
        console.log(JSON.stringify(error.response.data, null, 2));
      }
    }
  });
});
