import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, useTranslations } from "next-intl";
import LegalShell from "@/components/sections/legal-shell";
import { LEGAL, SITE } from "@/lib/site";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: safe, namespace: "privacy_page" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `/${safe}/${safe === "de" ? "datenschutz" : "privacy"}`,
      languages: {
        en: "/en/privacy",
        de: "/de/datenschutz",
        "x-default": "/en/privacy",
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("privacy_page");

  // {company} / {address} / {owner} / {emailLink} / {phoneLink} substitution
  // is rendered manually since next-intl rich-text-only handles tags, not
  // arbitrary JSX in plain string slots.
  const blockText = t("p_controller_block", {
    company: LEGAL.companyName,
    address: LEGAL.addressLine,
    owner: LEGAL.owner,
    emailLink: SITE.email,
    phoneLink: SITE.phone,
  });
  const rightsOutroText = t("p_rights_outro", { emailLink: SITE.email });

  return (
    <LegalShell
      kicker={t("kicker")}
      title={t("title")}
      updated={t("updated")}
      current="/privacy"
    >
      <h2>{t("h_controller")}</h2>
      <p>{t("p_controller_intro")}</p>
      <p style={{ whiteSpace: "pre-line" }}>{blockText}</p>

      <h2>{t("h_scope")}</h2>
      <p>{t("p_scope")}</p>

      <h2>{t("h_categories")}</h2>
      <p>{t("p_categories_intro")}</p>
      <ul>
        <li>{t("li_categories_1")}</li>
        <li>{t("li_categories_2")}</li>
        <li>{t("li_categories_3")}</li>
      </ul>

      <h2>{t("h_purposes")}</h2>
      <p>{t("p_purposes_intro")}</p>
      <ul>
        <li>{t("li_purposes_1")}</li>
        <li>{t("li_purposes_2")}</li>
        <li>{t("li_purposes_3")}</li>
        <li>{t("li_purposes_4")}</li>
      </ul>

      <h2>{t("h_disclosure")}</h2>
      <p>{t("p_disclosure")}</p>

      <h2>{t("h_transfers")}</h2>
      <p>{t("p_transfers")}</p>

      <h2>{t("h_retention")}</h2>
      <p>{t("p_retention")}</p>

      <h2>{t("h_rights")}</h2>
      <p>{t("p_rights_intro")}</p>
      <ul>
        <li>{t("li_rights_1")}</li>
        <li>{t("li_rights_2")}</li>
        <li>{t("li_rights_3")}</li>
        <li>{t("li_rights_4")}</li>
        <li>{t("li_rights_5")}</li>
        <li>{t("li_rights_6")}</li>
      </ul>
      <p>{rightsOutroText}</p>

      <h2>{t("h_cookies")}</h2>
      <p>{t("p_cookies")}</p>

      <h2>{t("h_security")}</h2>
      <p>{t("p_security")}</p>

      <h2>{t("h_changes")}</h2>
      <p>{t("p_changes")}</p>
    </LegalShell>
  );
}
