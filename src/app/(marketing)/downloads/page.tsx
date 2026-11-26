import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { FinalCta, PageHero } from "@/components/marketing/Sections";
import { DownloadsGrid } from "@/components/downloads/DownloadsGrid";

export const metadata = pageMetadata({
  title: "Download Billing App for Android, Windows & Mac",
  description: "Download Adminuscurator POS, Optical, Retail or Services for Android phones and tablets, Windows PCs and Macs. Works offline; start with a free trial.",
  path: "/downloads",
});

export default async function DownloadsPage() {
  const { software } = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Downloads"
        title="Get the Apps"
        lede="Download our software for your phone, tablet or computer. Pick an app, choose your device and you're ready to go."
      />
      <section className="section section--tight" style={{ paddingTop: 0 }} aria-label="Available software">
        <div className="container">
          <DownloadsGrid software={software} showPlaceholderTags={siteConfig.showPlaceholderTags} />
          <p className="pricing-footnote">
            Need a version for another platform or an older release? <Link className="link" href="/contact?subject=support">Contact us</Link>.
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
