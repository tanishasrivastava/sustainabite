import express from "express";
import cors from "cors";
import { createHash } from "crypto";
import axios from "axios";


const app = express();
app.use(cors({
    origin: "http://localhost:5173", // Change this to match your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
app.use(express.json());  // Fix json() issue
app.use(express.urlencoded({ extended: true }));

let salt_key = '96434309-7796-489d-8924-ab56988a6076';
let merchant_id = 'PGTESTPAYUAT86';

app.get('/', (req, res) => {
    res.send("hello world");
});

app.post('/order', async (req, res) => {
    try {
        let merchantTransactionId = req.body.transactionId;

        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:8000/status/?id=${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: req.body.phone,
            paymentInstrument: {
                type: "PAY_PAGE"
            }
        };

        const payload = JSON.stringify(data);
        // eslint-disable-next-line no-undef
        const payloadMain = Buffer.from(payload, 'utf-8').toString('base64');  // ✅ Fix Buffer issue
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        const response = await axios.request(options); // ✅ Fixed axios call
        console.log(response.data);
        return res.json(response.data);

    } catch (error) {
        console.error("Error in /order:", error);
        return res.status(500).json({ error: "Something went wrong!" });
    }
});

app.post('/status', async (req, res) => {
    try {
        const merchantTransactionId = req.query.id;
        const merchantId = merchant_id;

        const keyIndex = 1;
        const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
        const sha256 = createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + "###" + keyIndex;

        const options = {
            method: 'GET',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': `${merchantId}`,
            },
        };

        const response = await axios.request(options); // ✅ Fixed axios call

        if (response.data.success === true) {
            return res.redirect('http://localhost:5173/success');
        } else {
            return res.redirect('http://localhost:5173/fail');
        }

    } catch (error) {
        console.error("Error in /status:", error);
        return res.status(500).json({ error: "Error checking payment status" });
    }
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
