import axios from 'axios';
import * as crypto from 'crypto';

describe('MPESA API Tests', () => {
  const mid = "2222244444777777";
  const tid = "771199";
  const username = "+2557877788899";
  const secretKey = 'irqVzdWnXpEjietOZezxYpvkSxYr39Xm';

  describe('Authentication', () => {
    it('should authenticate successfully', async () => {
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
        console.log("✅ Good Response - Authentication:");
        console.log(JSON.stringify(authResponse.data, null, 2));
        
        expect(authResponse.status).toBe(200);
        expect(authResponse.data.code).toBe("200");
        expect(authResponse.data.data.token).toBeDefined();
      } catch (error: any) {
        console.log("❌ Bad Response - Authentication Error:");
        console.log(JSON.stringify(error.response?.data, null, 2));
        throw error;
      }
    });
  });

  describe('Payment', () => {
    it('should process MPESA payment', async () => {
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

      const authResponse = await axios.post(authUrl, authData, { headers: authHeaders });
      const token = authResponse.data.data.token;

      // Payment
      const paymentAmount = 121;
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
        issuerName: 'MPESA',
        enteredBy: 'Sushant Pandey',
        currency: 'TZS',
        tenantId: '000',
        phoneNumber: phoneNumber,
        clientRequestId: 'payment-' + Date.now(),
        callbackUrl: 'https://appuat.instantpaygateway.com/mock-api/callback_receiver/process'
      };

      try {
        console.log("📤 Payment Headers:");
        console.log(JSON.stringify(paymentHeaders, null, 2));
        console.log("📤 Payment Payload:");
        console.log(JSON.stringify(paymentData, null, 2));

        const paymentResponse = await axios.post(paymentUrl, paymentData, { headers: paymentHeaders });
        console.log("✅ This is the Response - Payment:");
        console.log(JSON.stringify(paymentResponse.data, null, 2));

        expect(paymentResponse.status).toBe(200);
      } catch (error: any) {
        console.log("❌ Bad Response - Payment Error:");
        console.log(JSON.stringify(error.response?.data, null, 2));
        throw error;
      }
    });
  });

  describe('Payout', () => {
    it('should process MPESA payout', async () => {
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

      const authResponse = await axios.post(authUrl, authData, { headers: authHeaders });
      const token = authResponse.data.data.token;

      // Payout
      const payoutAmount = 1000;
      const payoutTimestamp = Date.now().toString();
      const payoutPayload = `${mid}${tid}${payoutAmount}${payoutTimestamp}`;
      const payoutHash = crypto.createHmac('sha256', secretKey).update(payoutPayload).digest('hex');
      const payoutSignature = `HmacSHA256;${payoutHash}`;

      const payoutUrl = 'https://appuat.instantpaygateway.com/merchant-payment-api/payment/payout';
      const payoutHeaders = {
        'X-Payload-Signature': payoutSignature,
        'Timestamp': payoutTimestamp,
        'X-XSRF-TOKEN': token,
        'Content-Type': 'application/json',
      };
      const payoutData = {
        mid: mid,
        tid: tid,
        payoutAmount: payoutAmount,
        walletDetails: {
          walletId: "+255712345678",
          walletName: "MPESA",
          walletCode: "MPESA",
          currency: "TZS"
        },
        clientRequestId: 'payout-' + Date.now(),
        callbackUrl: 'https://appuat.instantpaygateway.com/mock-api/callback_receiver/process'
      };

      try {
        console.log("📤 Payout Headers:");
        console.log(JSON.stringify(payoutHeaders, null, 2));
        console.log("📤 Payout Payload:");
        console.log(JSON.stringify(payoutData, null, 2));

        const payoutResponse = await axios.post(payoutUrl, payoutData, { headers: payoutHeaders });
        console.log("✅ This is the Response - Payout:");
        console.log(JSON.stringify(payoutResponse.data, null, 2));

        expect(payoutResponse.status).toBe(200);
        expect(payoutResponse.data.code).toBe("200");
      } catch (error: any) {
        console.log("❌ Bad Response - Payout Error:");
        console.log(JSON.stringify(error.response?.data, null, 2));
        throw error;
      }
    });
  });
});