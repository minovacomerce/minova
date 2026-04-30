import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/hero";
import WhatWeDo from "@/components/sections/what-we-do";
import GlobalReach from "@/components/sections/global-reach";
import HowWeWork from "@/components/sections/how-we-work";
import IndustriesGrid from "@/components/sections/industries-grid";
import PartnerMarquee from "@/components/sections/partner-marquee";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <WhatWeDo />
      <GlobalReach />
      <HowWeWork />
      <IndustriesGrid />
      <PartnerMarquee />
      <Testimonials />
      <CTA />
    </>
  );
}
