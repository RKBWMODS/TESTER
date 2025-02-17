export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { ip, speed, link } = req.body;
    if (!ip || !speed || !link) {
        return res.status(400).json({ error: "IP, speed, dan link wajib diisi!" });
    }

    global.attacks = global.attacks || [];
    global.attacks.push({ ip, speed, link, time: new Date().toISOString() });

    res.status(200).json({ message: "Serangan tercatat!" });
}
