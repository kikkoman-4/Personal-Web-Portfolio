import HomeClient from "@/app/home-client";
import type { Inventory } from "@/types/database";
import { COMPANY, BRANCHES, CONTACT, SITE } from "@/lib/site-config";

export default function Page() {
  // We completely bypass server-side fetching because Hostinger
  // has strict memory/timeout limits that cause 503 errors during SSR.
  // HomeClient will handle the fetch entirely on the client-side.
  const inventory: Inventory[] = [];

  return (
    <>
      {/*
       * Static SEO content block — visually hidden but fully readable by
       * search engines and AI crawlers that don't execute JavaScript.
       * This ensures the page has meaningful text content at crawl time.
       */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        <h1>{COMPANY.name} — Premium Wine &amp; Spirits Distributor Philippines</h1>
        <p>{COMPANY.description}</p>
        <p>{COMPANY.tagline}</p>

        <h2>About Wine Century Brothers</h2>
        <p>
          Wine Century Brothers is a premier importer and distributor of fine wines and luxury
          spirits in the Philippines. Established in {COMPANY.foundedYear}, we serve individual
          collectors, restaurants, hotels, and corporate clients across Metro Manila with a
          curated selection of wines from the world&apos;s finest wine regions.
        </p>

        <h2>Our Wine &amp; Spirits Collections</h2>
        <p>
          We carry an extensive range of imported wines including red wines, white wines, rosé,
          sparkling wines, champagne, and dessert wines. Our spirits selection includes premium
          whisky, cognac, brandy, and other luxury liquors sourced from top international producers.
        </p>

        <h2>Our Locations in Metro Manila</h2>
        {Object.values(BRANCHES).map((branch) => (
          <div key={branch.name}>
            <h3>{COMPANY.name} — {branch.name}</h3>
            <address>{branch.address}</address>
          </div>
        ))}

        <h2>Contact Us</h2>
        <p>Binondo: <a href={CONTACT.phone.binondo.href}>{CONTACT.phone.binondo.display}</a></p>
        <p>Parañaque: <a href={CONTACT.phone.aseana.href}>{CONTACT.phone.aseana.display}</a></p>
        <p>Website: <a href={SITE.url}>{SITE.url}</a></p>
      </div>

      <HomeClient initialInventory={inventory} />
    </>
  );
}