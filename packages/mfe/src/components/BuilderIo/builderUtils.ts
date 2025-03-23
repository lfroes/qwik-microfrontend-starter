import { fetchOneEntry, getBuilderSearchParams } from "@builder.io/sdk-qwik";
import { BUILDER_API_KEY } from "./constants";

//INFO: This is for reference purposes only. It is not used in the code.

export const createBuilderLoader = () => {
  return async ({ url, error, env }: any) => {
    const isPreviewing = url.searchParams.has("builder.preview");
    const apiKey = env?.BUILDER_API_KEY || BUILDER_API_KEY;
    const builderContent = await fetchOneEntry({
      apiKey,
      model: "page",
      options: getBuilderSearchParams(url.searchParams),
      userAttributes: {
        urlPath: url.pathname,
      },
    });

    if (!builderContent && !isPreviewing) {
      throw error(404, "Page not Found");
    }

    return builderContent;
  };
};
