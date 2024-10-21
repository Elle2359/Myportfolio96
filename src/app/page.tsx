import { groq } from "next-sanity";
import dynamic from 'next/dynamic';
import RootLayout from "@/app/RootLayout";
import { client } from "@/lib/sanity/client";

const DynamicHero = dynamic(() => import("@/components/Index/Hero.component"), {
  loading: () => <div>Loading hero...</div>
});

const DynamicIndexContent = dynamic(() => import("@/components/Index/IndexContent.component"), {
  loading: () => <div>Loading content...</div>
});

export default async function HomePage() {
  const pageContentQuery = groq`
    *[_type == 'page' && title match 'Hjem'][0]{
      "id": _id, 
      title, 
      hero, 
      content
    }
  `;

  const pageContent = await client.fetch(pageContentQuery);

  return (
    <RootLayout>
      <main>
        <div className="mt-[4.5rem] md:mt-32 overflow-hidden">
          {pageContent.hero && (
            <DynamicHero content={pageContent.hero} />
          )}
        </div>
        {pageContent.content && (
          <DynamicIndexContent pageContent={pageContent.content} />
        )}
      </main>
    </RootLayout>
  );
}
