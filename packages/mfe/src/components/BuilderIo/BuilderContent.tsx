import { component$ } from "@builder.io/qwik";
import { Content } from "@builder.io/sdk-qwik";
import { BUILDER_API_KEY } from "./constants";
import type { BuilderContentProps } from "./types";

export const BuilderContent = component$<BuilderContentProps>(
  ({ apiKey = BUILDER_API_KEY, model, customComponents, content }) => {
    return (
      <Content
        model={model}
        content={content}
        apiKey={BUILDER_API_KEY}
        customComponents={customComponents ? customComponents : undefined}
      />
    );
  },
);
