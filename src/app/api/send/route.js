import nodemailer from "nodemailer";

export async function POST(request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP for other services
    auth: {
        user: "vinni0526@gmail.com",
        pass: "cblz wwjj baqb rvqa".replace(/\s/g, ""),
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // your inbox
      subject: `New message from ${name}`,
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
    });
  }
}
