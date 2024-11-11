// "use server";

// import { getAuthToken } from "@/data/services/get-token";
// import { mutateData } from "@/data/services/mutate-data";
// import { redirect } from "next/navigation";

// interface Payload {
//   data: {
//     title?: string;
//     videoId: string;
//     summary: string;
//   };
// }

// export async function createSummaryAction(payload: Payload) {
//   const authToken = await getAuthToken();
//   if (!authToken) throw new Error("No auth token found");

//   const data = await mutateData("POST", "/api/summaries", payload);
//   console.log("Response from mutateData:", data);
//   redirect("/dashboard/summaries/" + data.data.documentId);
// }
"use server";

import { getAuthToken } from "@/data/services/get-token";
import { mutateData } from "@/data/services/mutate-data";
import { redirect } from "next/navigation";

interface Payload {
  data: {
    title?: string;
    videoId: string;
    summary: string;
  };
}

export async function createSummaryAction(payload: Payload) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("POST", "/api/summaries", payload);

  // Extract documentId from the nested structure
  const documentId = data?.data?.[0]?.documentId;

  if (documentId) {
    redirect("/dashboard/summaries/" + documentId);
  } else {
    console.error("Identifier not found in server response");
    throw new Error("Identifier not found in server response");
  }
}
