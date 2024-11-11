import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/custom/HeroSection";
import { getHomePageData } from "@/data/loaders";
import { FeatureSection } from "@/components/custom/FeaturesSection";

// const homePageQuery = qs.stringify({
//   populate: {
//     blocks: {
//       on: {
//         "layout.hero-section": {
//           populate: {
//             image: {
//               fields: ["url", "alternativeText"],
//             },
//             link: {
//               populate: true,
//             },
//           },
//         },
//         "layout.features-section": {
//           populate: {
//             feature: {
//               populate: true,
//             },
//           },
//         },
//       },
//     },
//   },
// });

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.features-section": FeatureSection,
};

function blockRenderer(block: any) {
  const Component =
    blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}

// async function getStrapiData(path: string) {
//   const baseUrl = getStrapiURL();
//   const url = new URL(path, baseUrl);
//   url.search = homePageQuery;
//   console.log(url.href);
//   try {
//     const response = await fetch(url.href, { cache: "no-store" });
//     const data = await response.json();
//     console.dir(data, { depth: null });
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export default async function Home() {
  const strapiData = await getHomePageData();

  const { blocks } = strapiData.data;
  if (!blocks) return <div>No Blocks Found</div>;

  return <main>{blocks.map((block: any) => blockRenderer(block))}</main>;
}
