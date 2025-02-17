export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { ip, speed } = req.body;
    if (!ip || !speed) {
        return res.status(400).json({ error: "IP dan speed wajib diisi!" });
    }

    global.attacks = global.attacks || [];
    global.attacks.push({ ip, speed, time: new Date().toISOString() });

    res.status(200).json({ message: "Serangan tercatat!" });
}
