/**
 * Inline-CSS HTML email templates for the contact form. Email clients vary
 * wildly in CSS support — system font stack only, no `var(...)`, no
 * external CSS, all colors hard-coded.
 */

import { LEGAL, SITE } from "@/lib/site";

export type Locale = "en" | "de";

type Subject =
  | "sourcing"
  | "distribution"
  | "brokerage"
  | "partnership"
  | "other";

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: Subject;
  message: string;
  volume?: string;
  locale: Locale;
}

const COLORS = {
  navy: "#011125",
  navyMuted: "rgba(1, 17, 37, 0.65)",
  navySoft: "rgba(1, 17, 37, 0.08)",
  border: "rgba(1, 17, 37, 0.1)",
  accent: "#E8B86D",
  white: "#ffffff",
  bg: "#fafafb",
};

const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const LOGO_URL = `${SITE.url}/brand/minova-logo-navy-header.png`;
const LOGO_WHITE_URL = `${SITE.url}/brand/minova-logo-white-header.png`;

/* -------------------------------------------------------------------------- */
/*                              i18n                                            */
/* -------------------------------------------------------------------------- */

const T = {
  en: {
    subjectInquiry: (name: string) => `New inquiry from ${name}`,
    subjectConfirmation: "We received your message — Minova Commerce",
    inquiryHeader: "New inquiry",
    inquirySubtitle: (name: string, company?: string) =>
      company ? `${name} · ${company}` : name,
    fieldName: "Name",
    fieldCompany: "Company",
    fieldEmail: "Email",
    fieldPhone: "Phone",
    fieldSubject: "Subject",
    fieldVolume: "Indicative volume",
    fieldMessage: "Message",
    sentBy: "Sent from minova-commerce.ch · contact form",
    confirmationHeading: (name: string) => `Thank you, ${name}.`,
    confirmationBody:
      "We received your inquiry and will respond within 1–2 business days.",
    confirmationQuoteLabel: "Your message",
    confirmationCloser: "Need to reach us sooner?",
    confirmationSignature: "— The Minova desk",
    legalNote:
      "This is a transactional message confirming a request you submitted on minova-commerce.ch.",
    subjects: {
      sourcing: "Sourcing",
      distribution: "Distribution",
      brokerage: "Brokerage",
      partnership: "Partnership",
      other: "Other",
    } as Record<Subject, string>,
  },
  de: {
    subjectInquiry: (name: string) => `Neue Anfrage von ${name}`,
    subjectConfirmation: "Wir haben Ihre Nachricht erhalten — Minova Commerce",
    inquiryHeader: "Neue Anfrage",
    inquirySubtitle: (name: string, company?: string) =>
      company ? `${name} · ${company}` : name,
    fieldName: "Name",
    fieldCompany: "Unternehmen",
    fieldEmail: "E-Mail",
    fieldPhone: "Telefon",
    fieldSubject: "Betreff",
    fieldVolume: "Indikatives Volumen",
    fieldMessage: "Nachricht",
    sentBy: "Gesendet von minova-commerce.ch · Kontaktformular",
    confirmationHeading: (name: string) => `Vielen Dank, ${name}.`,
    confirmationBody:
      "Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 1–2 Werktagen.",
    confirmationQuoteLabel: "Ihre Nachricht",
    confirmationCloser: "Sie möchten uns früher erreichen?",
    confirmationSignature: "— Das Minova-Team",
    legalNote:
      "Dies ist eine transaktionale Bestätigung einer Anfrage, die Sie auf minova-commerce.ch übermittelt haben.",
    subjects: {
      sourcing: "Beschaffung",
      distribution: "Distribution",
      brokerage: "Vermittlung",
      partnership: "Partnerschaft",
      other: "Sonstiges",
    } as Record<Subject, string>,
  },
};

/* -------------------------------------------------------------------------- */
/*                          html escape (safe email body)                     */
/* -------------------------------------------------------------------------- */

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(input: string): string {
  return escapeHtml(input).replace(/\r?\n/g, "<br>");
}

/* -------------------------------------------------------------------------- */
/*                          inquiry email — to Minova                          */
/* -------------------------------------------------------------------------- */

export function buildInquiryEmail(payload: ContactPayload) {
  const t = T[payload.locale];
  const subj = t.subjects[payload.subject] ?? payload.subject;
  const sentAt = new Date().toLocaleString(
    payload.locale === "de" ? "de-CH" : "en-GB",
    {
      timeZone: "Europe/Zurich",
      dateStyle: "medium",
      timeStyle: "short",
    }
  );

  const subjectLine = t.subjectInquiry(payload.name);
  const html = `<!doctype html>
<html lang="${payload.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(subjectLine)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};font-family:${FONT};color:${COLORS.navy};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${COLORS.bg};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:${COLORS.white};border-radius:14px;overflow:hidden;border:1px solid ${COLORS.border};">
        <tr>
          <td style="padding:28px 32px 0 32px;">
            <img src="${LOGO_URL}" alt="Minova Commerce" width="120" height="30" style="display:block;height:30px;width:auto;">
            <div style="margin-top:18px;height:2px;width:32px;background:${COLORS.accent};"></div>
          </td>
        </tr>
        <tr>
          <td style="padding:18px 32px 8px 32px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.accent};font-weight:600;">${escapeHtml(t.inquiryHeader)}</p>
            <h1 style="margin:8px 0 0 0;font-size:24px;font-weight:600;letter-spacing:-0.02em;color:${COLORS.navy};">${escapeHtml(t.inquirySubtitle(payload.name, payload.company))}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 8px 32px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid ${COLORS.border};">
              ${row(t.fieldName, escapeHtml(payload.name))}
              ${payload.company ? row(t.fieldCompany, escapeHtml(payload.company)) : ""}
              ${row(t.fieldEmail, `<a href="mailto:${escapeHtml(payload.email)}" style="color:${COLORS.navy};text-decoration:underline;">${escapeHtml(payload.email)}</a>`)}
              ${payload.phone ? row(t.fieldPhone, escapeHtml(payload.phone)) : ""}
              ${row(t.fieldSubject, escapeHtml(subj))}
              ${payload.volume ? row(t.fieldVolume, escapeHtml(payload.volume)) : ""}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 32px 28px 32px;">
            <p style="margin:24px 0 8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.navyMuted};">${escapeHtml(t.fieldMessage)}</p>
            <div style="background:${COLORS.bg};border:1px solid ${COLORS.border};border-radius:10px;padding:18px 20px;font-size:15px;line-height:1.65;color:${COLORS.navy};">${nl2br(payload.message)}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:18px 32px 28px 32px;border-top:1px solid ${COLORS.border};">
            <p style="margin:0;font-size:12px;color:${COLORS.navyMuted};">
              ${escapeHtml(t.sentBy)} · ${escapeHtml(sentAt)}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    `${t.inquiryHeader}: ${t.inquirySubtitle(payload.name, payload.company)}`,
    "",
    `${t.fieldEmail}: ${payload.email}`,
    payload.phone ? `${t.fieldPhone}: ${payload.phone}` : "",
    `${t.fieldSubject}: ${subj}`,
    payload.volume ? `${t.fieldVolume}: ${payload.volume}` : "",
    "",
    `${t.fieldMessage}:`,
    payload.message,
    "",
    "—",
    `${t.sentBy} · ${sentAt}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject: subjectLine, html, text };
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${COLORS.border};vertical-align:top;width:35%;">
        <span style="display:inline-block;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.navyMuted};">${escapeHtml(label)}</span>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid ${COLORS.border};font-size:15px;color:${COLORS.navy};">
        ${value}
      </td>
    </tr>
  `;
}

/* -------------------------------------------------------------------------- */
/*                       confirmation email — to user                          */
/* -------------------------------------------------------------------------- */

export function buildConfirmationEmail(payload: ContactPayload) {
  const t = T[payload.locale];
  const subjectLine = t.subjectConfirmation;

  const html = `<!doctype html>
<html lang="${payload.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(subjectLine)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};font-family:${FONT};color:${COLORS.navy};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${COLORS.bg};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:${COLORS.white};border-radius:14px;overflow:hidden;border:1px solid ${COLORS.border};">
        <tr>
          <td style="padding:32px 32px 8px 32px;">
            <img src="${LOGO_URL}" alt="Minova Commerce" width="120" height="30" style="display:block;height:30px;width:auto;">
          </td>
        </tr>
        <tr>
          <td style="padding:8px 32px 8px 32px;">
            <h1 style="margin:24px 0 0 0;font-size:28px;font-weight:600;letter-spacing:-0.02em;color:${COLORS.navy};">${escapeHtml(t.confirmationHeading(payload.name))}</h1>
            <p style="margin:14px 0 0 0;font-size:16px;line-height:1.6;color:${COLORS.navyMuted};">${escapeHtml(t.confirmationBody)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 32px 8px 32px;">
            <p style="margin:28px 0 8px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.navyMuted};">${escapeHtml(t.confirmationQuoteLabel)}</p>
            <div style="border-left:2px solid ${COLORS.accent};padding:4px 16px;font-size:15px;line-height:1.65;color:${COLORS.navy};background:${COLORS.bg};border-radius:0 8px 8px 0;">${nl2br(payload.message)}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 32px 28px 32px;">
            <p style="margin:0 0 8px 0;font-size:13px;color:${COLORS.navyMuted};">${escapeHtml(t.confirmationCloser)}</p>
            <p style="margin:0;font-size:14px;line-height:1.7;color:${COLORS.navy};">
              <a href="tel:${SITE.phoneTel}" style="color:${COLORS.navy};text-decoration:none;font-weight:600;">${escapeHtml(SITE.phone)}</a><br>
              <a href="mailto:${SITE.email}" style="color:${COLORS.navy};text-decoration:none;">${escapeHtml(SITE.email)}</a><br>
              <a href="${SITE.linkedin}" style="color:${COLORS.navy};text-decoration:none;">LinkedIn</a>
            </p>
            <p style="margin:24px 0 0 0;font-size:13px;color:${COLORS.navyMuted};">${escapeHtml(t.confirmationSignature)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:18px 32px 24px 32px;border-top:1px solid ${COLORS.border};">
            <p style="margin:0;font-size:12px;line-height:1.5;color:${COLORS.navyMuted};">
              <strong style="color:${COLORS.navy};">${escapeHtml(LEGAL.companyName)}</strong> · ${escapeHtml(SITE.location)}<br>
              ${escapeHtml(t.legalNote)}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
  <!-- white logo fallback (some clients block external images) -->
  <img src="${LOGO_WHITE_URL}" alt="" width="0" height="0" style="display:none;width:0;height:0;">
</body>
</html>`;

  const text = [
    t.confirmationHeading(payload.name),
    "",
    t.confirmationBody,
    "",
    `${t.confirmationQuoteLabel}:`,
    payload.message,
    "",
    `${t.confirmationCloser}`,
    `${SITE.phone} · ${SITE.email} · ${SITE.linkedin}`,
    "",
    t.confirmationSignature,
    "",
    `${LEGAL.companyName} · ${SITE.location}`,
    t.legalNote,
  ].join("\n");

  return { subject: subjectLine, html, text };
}
