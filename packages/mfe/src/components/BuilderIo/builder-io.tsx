import { component$ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik';
import { fetchOneEntry, getBuilderSearchParams, Content as BContent } from '@builder.io/sdk-qwik';

export { Content } from '@builder.io/sdk-qwik';

export const BUILDER_API_KEY = 'api-key'; //TODO: Replace to env variable futher on

//INFO: Usefull links https://www.builder.io/c/docs/custom-components-intro https://www.builder.io/c/docs/using-your-api-key  https://github.com/BuilderIO/builder/blob/main/examples/qwik/src/components/builder-registry.ts

export interface BuilderContentProps {
	apiKey?: string;
	model: string;
	customComponents?: any;
	content: any;
}

export const BuilderContent = component$<BuilderContentProps>(
	({
		apiKey = BUILDER_API_KEY,
		model, //INFO: model page is good to go, to use the section mode it must be on enterprise plan https://www.builder.io/c/docs/models-intro
		customComponents,
		content,
	}) => {
		return (
			<BContent
				model={model}
				content={content}
				apiKey={BUILDER_API_KEY}
				customComponents={customComponents ? customComponents : undefined}
				//INFO: use customComponents to add custom components to your page
			/>
		);
	},
);

export default BuilderContent;
