const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Mengizinkan akses dari web
app.use(express.json()); // Parsing JSON dari request

let attacks = []; // Menyimpan data serangan sementara

// **1. Menerima data serangan (POST /attack)**
app.post("/attack", (req, res) => {
    const { ip, speed } = req.body;
    const attackData = {
        requests: attacks.length + 1,
        ip: ip || req.ip, // Jika IP tidak dikirim, pakai IP pengirim
        time: new Date().toLocaleTimeString(),
        speed: speed || (Math.random() * (500 - 10) + 10).toFixed(2),
    };
    attacks.push(attackData);

    // Simpan hanya 50 data terakhir agar tidak terlalu berat
    if (attacks.length > 50) {
        attacks.shift();
    }

    res.json({ success: true, attackData });
});

// **2. Mengambil data serangan (GET /attacks)**
app.get("/attacks", (req, res) => {
    res.json(attacks);
});

// **Export untuk Vercel**
module.exports = app;
