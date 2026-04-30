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
  const t = await getTranslations({ locale: safe, namespace: "imprint_page" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `/${safe}/${safe === "de" ? "impressum" : "imprint"}`,
      languages: {
        en: "/en/imprint",
        de: "/de/impressum",
        "x-default": "/en/imprint",
      },
    },
  };
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ImprintContent />;
}

function ImprintContent() {
  const t = useTranslations("imprint_page");
  return (
    <LegalShell
      kicker={t("kicker")}
      title={t("title")}
      updated={t("updated")}
      current="/imprint"
    >
      <h2>{t("company_h")}</h2>
      <dl>
        <dt>{t("company_name_l")}</dt>
        <dd>{LEGAL.companyName}</dd>

        <dt>{t("legal_form_l")}</dt>
        <dd>{LEGAL.legalForm}</dd>

        <dt>{t("represented_l")}</dt>
        <dd>
          {LEGAL.owner} ({t("owner_label")})
        </dd>

        <dt>{t("address_l")}</dt>
        <dd>{LEGAL.addressLine}</dd>

        <dt>{t("phone_l")}</dt>
        <dd>
          <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
        </dd>

        <dt>{t("email_l")}</dt>
        <dd>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </dd>
      </dl>

      <h2>{t("registration_h")}</h2>
      <dl>
        <dt>{t("cr_number_l")}</dt>
        <dd>{LEGAL.commercialRegisterNumber}</dd>

        <dt>{t("cr_office_l")}</dt>
        <dd>{LEGAL.commercialRegisterOffice}</dd>

        <dt>{t("vat_l")}</dt>
        <dd>{LEGAL.vat}</dd>

        <dt>{t("registered_l")}</dt>
        <dd>{t("registered_value")}</dd>
      </dl>

      <h2>{t("purpose_h")}</h2>
      <p>{t("purpose_body")}</p>

      <h2>{t("liability_content_h")}</h2>
      <p>{t("liability_content_body")}</p>

      <h2>{t("liability_links_h")}</h2>
      <p>{t("liability_links_body")}</p>

      <h2>{t("copyright_h")}</h2>
      <p>{t("copyright_body")}</p>

      <h2>{t("law_h")}</h2>
      <p>{t("law_body")}</p>
    </LegalShell>
  );
}
