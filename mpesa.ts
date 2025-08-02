// import axios from 'axios';
// import * as crypto from 'crypto';

// describe('MPESA Integration Tests', () => {
//   it('authenticate and payout', async () => {

//     const mid = "2222244444777777";
//     const tid = "771199";
//     const username = "+2557877788899";

//     // Secret key used for HMAC (update this with real key)
//     const secretKey = 'irqVzdWnXpEjietOZezxYpvkSxYr39Xm';
//     let timestamp = Date.now().toString();
//     const payload = `${mid}${tid}${username}${timestamp}`;
//     const hash = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
//     const finalSignature = `HmacSHA256;${hash}`;

//     // Generate timestamp

//     console.log("the payload here is ", finalSignature)
//     //C3A71D6E2F4B8F5E3C2A1D7B0E5F9B2C7D0A3E9B6F8C4D2A1E7F0C8D3A6B9E1F
//     //hg+iOKO4FtY4z7
//     //hg+iOKO4FtY4z7
//     //C3A71D6E2F4B8F5E3C2A1D7B0E5F9B2C7D0A3E9B6F8C4D2A1E7F0C8D3A6B9E1F
//     const url = 'https://appuat.instantpaygateway.com/merchant-payment-api/payment/authenticate';
//     const headers = {
//       'X-Payload-Signature': finalSignature,
//       'Timestamp': timestamp,
//       'Content-Type': 'application/json',
//     };
//     const data = {
//       mid: mid,
//       tid: tid,
//       username: username,
//       password: '123456',
//     };

//     await axios.post(url, data, { headers })
//         .then(async (response: { data: any }) => {
//           console.log(response.data);
//           const token = response.data.data.token;

//           const payoutAmount = 1; // Amount to be paid out
//           const payoutSecretKey = 'irqVzdWnXpEjietOZezxYpvkSxYr39Xm';
//           let payoutTimestamp = Date.now().toString();
//           const payoutPayload = `${mid}${tid}${payoutAmount}${payoutTimestamp}`;
//           const payoutHash = crypto.createHmac('sha256', payoutSecretKey).update(payoutPayload).digest('hex');
//           const payoutFinalSignature = `HmacSHA256;${payoutHash}`;
//           // Prepare the new request
//           const payoutUrl = 'https://appuat.instantpaygateway.com/merchant-payment-api/payment/payout';
//           const payoutHeaders = {
//             'X-Payload-Signature': payoutFinalSignature,
//             'Timestamp': payoutTimestamp,
//             'X-XSRF-TOKEN': token,
//             'Content-Type': 'application/json',
//           };
//           const payoutData = {
//             mid: mid,
//             tid: tid,
//             payoutAmount: payoutAmount,
//             walletDetails: {
//               walletId: "+2557477788899",
//               walletName: "MPESA",
//               walletCode: "MPESA",
//               currency: "TZS",
//             },
//           };

//           // Send the payout request
//           try {
//             const payoutResponse = await axios.post(payoutUrl, payoutData, { headers: payoutHeaders });
//             console.log("on success of payout", payoutResponse.data);
//           } catch (error: any) {
//             console.error("the error on payout is ", error.message);
//           }

//         })
//         .catch((error: any) => {
//           console.error(error.message);
//         });
//   },15000);

//   it('authenticate and payment', async () => {
//     const mid = "2222244444777777";
//     const tid = "771199";
//     const username = "+2557877788899";

//     const secretKey = 'irqVzdWnXpEjietOZezxYpvkSxYr39Xm';
//     let timestamp = Date.now().toString();
//     const payload = `${mid}${tid}${username}${timestamp}`;
//     const hash = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
//     const finalSignature = `HmacSHA256;${hash}`;

// // Generate timestamp

//     console.log("the payload here is ", finalSignature)

//     const url = 'https://appuat.instantpaygateway.com/merchant-payment-api/payment/authenticate';
//     const headers = {
//       'X-Payload-Signature': finalSignature,
//       'Timestamp': timestamp,
//       'Content-Type': 'application/json',
//     };
//     const data = {
//       mid: mid,
//       tid: tid,
//       username: username,
//       password: '123456',
//     };

//     await axios.post(url, data, { headers })
//         .then(async (response: { data: any }) => {
//           console.log(response.data);
//           const token = response.data.data.token;

//           const paymentAmount = 1; // Amount to be paid out
//           const phoneNumber = '+2557477788899'; // Phone number to receive the payment
//           const paymentSecretKey = 'irqVzdWnXpEjietOZezxYpvkSxYr39Xm';
//           let paymentTimestamp = Date.now().toString();
//           const paymentPayload = `${mid}${tid}${paymentAmount}${phoneNumber}${paymentTimestamp}`;
//           const paymentHash = crypto.createHmac('sha256', paymentSecretKey).update(paymentPayload).digest('hex');
//           const paymentFinalSignature = `HmacSHA256;${paymentHash}`;
//           // Prepare the new request
//           const paymentUrl = 'https://appuat.instantpaygateway.com/merchant-payment-api/payment/mno';
//           const paymentHeaders = {
//             'X-Payload-Signature': paymentFinalSignature,
//             'Timestamp': paymentTimestamp,
//             'X-XSRF-TOKEN': token,
//             'Content-Type': 'application/json',
//           };
//           const paymentData = {
//             mid: mid,
//             tid: tid,
//             amount: paymentAmount,
//             issuerName:'MPESA',
//             enteredBy:'Sushant Pandey',
//             currency:'TZS',
//             tenantId:'000',
//             phoneNumber:phoneNumber
//           };

//           // Send the payment request
//           try {
//             const paymentResponse = await axios.post(paymentUrl, paymentData, { headers: paymentHeaders });
//             console.log("on success of payment", paymentResponse.data);
//           } catch (error: any) {
//             console.error("the error on payment is ", error.message);
//           }

//         })
//         .catch((error: any) => {
//           console.error(error.message);
//         });
//   },15000);

//   it("send disbursement Request",async ()=>{
//     const url = 'https://appuat.instantpaygateway.com/ledger-engine/disbursements/trigger/merchant';
//     const headers = {
//       'x-xsrf-token':'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoieVJacFg3cEFXSUJDdjEwUjhkMjdTUT09OmVFREpxbVNJdVZJQjBjNlRjMzg4U1VMVVhXTDN6cVBzVTNWRmZvQy8wdVpobjdZUDV0WFloSzcySitKZ05pY2xtZ3YxcW9sLzc2N01lVGp4d2hPdkFJbjNKVFNSaVVLQW4xN2hnY1ROTGZMbDJXdGhKcEwrZDdHZzI3WFE0d3orckVyOFMwOHF1TW8xUGZqNTVBdHBLTUtjQi9ZWkNDZU03NzFCWHl0eVRlL1lXNmhkU2grSmJacDYzUXJGWjQ2b3NuejlPNWdtMzEyeVpvUjRleEZEZXVQd0tLVWRMcjdvQU94U2ExbnYvZ2RpL281cHhsN1BOQjdJVkxKRFBOZ1RYWWdVbHluemI2QWFZMFJEejRRN1RlOEVsL2VLbXltbzZUdzZCWmJQNzViYkZKeCs3cGNkMDlJM00vRzMrcW1PaVpxV0FJcWlEUmZ0bzU2MzJ0TEh6UlFpMGhZZ1BLWW9IazkvLzFLMGJoeERxcnFGWUtDbXUxdS9UcDJTU2NyMWpWSmdvSTBLNWZtVDBkemxlV3I5OVpQaWVqcDJEQVlITE01ckVzR3ZRK0Rwb0Z5d2ZVdXRhaHhNOU0rb2JJdmxSMmFIckhLZ3FJQUxhZzQzdnZUTUxrT2wwOTlMWXZTNTBwV3Q3RzhNbW9zZUNkMGxWdHlpb3JwMGtmRnIxNCtyU013ajJPeHM5aTZQUW1CR244Tm9HYlRJQlBIM1BmUTlQa3Uyb0pZeEYzbWJsU1locS9yVHFJbzRYS0RrUGdDWCIsImlhdCI6MTc1MjY1Nzc4MCwiZXhwIjoxNzUyNjU4MzgwLCJpc3MiOiJjaXR5dGVjaC5nbG9iYWwiLCJzdWIiOiIwYzBiYmMzOC01ZTU2LTQxNmEtOTc0My1jZWM3Zjc0OWMyYzUiLCJqdGkiOiJmMzIxZmZlNS1hMzEyLTQ5NTItYTFlMS0xYTgxODhhZmU5OWMifQ.KKqOyLG5NQwsSG-fhZZuM18lANhO5au8bdvJWxvoBY8mVwFNcrMsYkCqI7iNhvadVBYBKzrU8cBInjZGXsBsTQ',
//       'Content-Type': 'application/json',
//     };

//     const data = {
//       key1: 'value1',
//       key2: 'value2',
//     };

//     try {
//       const response = await axios.post(url, data, { headers });
//       console.log('Response:', response.data);
//     } catch (error:any ) {
//       console.error('Error:', error.message);
//     }  },15000)

//   it("simple xml request", async ()=>{
//     // auth  const payload = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gen="http://www.4cgroup.co.za/genericsoap" xmlns:soap="http://www.4cgroup.co.za/soapauth" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><SOAP-ENV:Header><soap:EventID>2500</soap:EventID></SOAP-ENV:Header><SOAP-ENV:Body><gen:getGenericResult><Request><dataItem><name>Username</name><type>String</type><value>310953</value></dataItem><dataItem><name>Password</name><type>String</type><value>18SpkzL15Op</value></dataItem></Request></gen:getGenericResult></SOAP-ENV:Body></SOAP-ENV:Envelope>'
//     // payment const payload = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gen="http://www.4cgroup.co.za/genericsoap" xmlns:soap="http://www.4cgroup.co.za/soapauth" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><SOAP-ENV:Header><soap:Token>RWS03E0YPN5MHRBWU7BN</soap:Token><soap:EventID>40035</soap:EventID></SOAP-ENV:Header><SOAP-ENV:Body><gen:getGenericResult><Request><dataItem><name>CustomerMSISDN</name><type>String</type><value>+2557477788899</value></dataItem><dataItem><name>BusinessName</name><type>String</type><value>Twists Media</value></dataItem><dataItem><name>BusinessNumber</name><type>String</type><value>12345</value></dataItem><dataItem><name>Currency</name><type>String</type><value>TZS</value></dataItem><dataItem><name>Date</name><type>String</type><value>20250722142448</value></dataItem><dataItem><name>Amount</name><type>String</type><value>1</value></dataItem><dataItem><name>ThirdPartyReference</name><type>String</type><value>58b2da0925434f3bb11d482167f409e4</value></dataItem><dataItem><name>Command</name><type>String</type><value>customerPayBill</value></dataItem><dataItem><name>CallBackChannel</name><type>String</type><value>1</value></dataItem><dataItem><name>CallbackDestination</name><type>String</type><value>https://appuat.instantpaygateway.com/payment-engine/mpesa/push/callback</value></dataItem><dataItem><name>Username</name><type>String</type><value>310953</value></dataItem></Request></gen:getGenericResult></SOAP-ENV:Body></SOAP-ENV:Envelope>'
//     // transfer
//     const payload = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><brokerRequest xmlns="http://inforwise.co.tz/broker/" version="2.0"><serviceProvider><spId>310953</spId><spPassword>RUZGMkE5NEI2RDE5MzQwRTdGQzM0QzEzRUFBNERFRDM1REQ4MTExRDBCMEY3RDkwNjFENjUzOTcwQzYwNzczQQ==</spPassword><timestamp>20250723112831</timestamp></serviceProvider><transaction><amount>1000</amount><commandID>BusinessPayment</commandID><initiator>12345</initiator><initiatorPassword>12345</initiatorPassword><recipient>+2557477788899</recipient><transactionDate>2025-07-23 11:28:31</transactionDate><transactionID>MPESA168</transactionID></transaction></brokerRequest>'

//    // const url = 'https://appuat.instantpaygateway.com/mock-api/mpesa/iPG/b2c/ussd_push';
//     //const url = 'http://localhost:5000/mpesa/iPG/b2c/ussd_push';
//     const url = 'http://localhost:5000/mpesa/ipg/b2c/transfer';
//     const headers = {
//       'Content-Type': 'text/xml',
//     };

//     try {
//       const response = await axios.post(url, payload, { headers });
//       console.log('Response:', response.data);
//     } catch (error:any ) {
//       console.error('Error:', error.message);
//     }  },15000)



// });
