import nodemailer from "nodemailer";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  subject?: string;
  message: string;
  email?: string;
  company?: string;
};

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const name = String(payload.name ?? "").trim();
  const subject = String(payload.subject ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const company = String(payload.company ?? "").trim();

  if (!name || !message) {
    return json({ ok: false, error: "Missing required fields" }, 400);
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return json(
      {
        ok: false,
        error:
          "Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.",
      },
      500,
    );
  }

  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.CONTACT_FROM ?? user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const safeSubject = subject || `Portfolio contact from ${name}`;
  const intro = [
    `Name: ${name}`,
    email ? `Email: ${email}` : undefined,
    company ? `Company: ${company}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");

  const text = `${intro}\n\n${message}\n`;

  try {
    await transporter.sendMail({
      to,
      from,
      replyTo: email || undefined,
      subject: safeSubject,
      text,
    });
  } catch {
    return json({ ok: false, error: "Failed to send email" }, 502);
  }

  return json({ ok: true });
}

