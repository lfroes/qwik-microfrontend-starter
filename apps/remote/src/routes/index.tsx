import { $, component$, useSignal, useStore } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getBuilderSearchParams, fetchOneEntry } from '@builder.io/sdk-qwik';
import { dispatchEvent } from '@qwik-microfrontend/mfe';
import { Counter, type CounterStore } from '@qwik-microfrontend/ui';
import { Detail } from '../components/Detail';

import { BuilderContent, BUILDER_API_KEY } from '@qwik-microfrontend/mfe';

const BUILDER_MODEL_NAME = 'new-footer-csgoroll';

export const useBuilderContent = routeLoader$(async ({ url, error }) => {
	const isPreviewing = url.searchParams.has('builder.preview');
	const apiKey = BUILDER_API_KEY;

	const builderContent = await fetchOneEntry({
		model: BUILDER_MODEL_NAME,
		apiKey,
		options: getBuilderSearchParams(url.searchParams),
		userAttributes: {
			urlPath: `http://localhost:5174/${url.pathname}`,
		},
	});

	if (!builderContent && !isPreviewing) {
		throw error(404, 'Page not found');
	}

	return builderContent;
});

export default component$(() => {
	const builderContent = useBuilderContent();
	const showDetailSig = useSignal(false);
	const toggleDetail = $(() => (showDetailSig.value = !showDetailSig.value));
	const state = useStore<CounterStore>({
		counter: 0,
		increment: $(function (this: CounterStore) {
			this.counter++;
		}),
	});
	const addCart = $(() => dispatchEvent('APP_VALUE_CHANGED_EVENT', 10));

	return (
		<>
			<BuilderContent content={builderContent.value} model={BUILDER_MODEL_NAME} />
			<div
				style={{
					background: '#1f2124',
					boxShadow: '0 0 20px rgba(0, 0, 0, 0.4)',
					borderRadius: '5px',
					margin: '20px 20px 20px 20px',
					width: '250px',
					padding: '20px',
					textAlign: 'center',
					color: 'white',
					float: 'left',
				}}
			>
				<div class="icon">
					<svg
						enable-background="new 0 0 512 512"
						height="100px"
						width="100px"
						id="Layer_1"
						version="1.1"
						viewBox="0 0 512 512"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M285.928,113.067c62.492,0,113.327,50.827,113.327,113.327c0,0.344-0.041,0.705-0.066,1.049  c-0.049,0.836-0.107,1.672-0.123,2.525l-0.426,17.133l17.159,0.065c41.53,0.115,75.313,34.005,75.313,75.535  c0,41.415-33.718,75.305-75.157,75.518l-3.664,0.016H104.977c-46.244-0.049-83.872-37.693-83.872-83.929  c0-35.825,22.806-67.714,56.737-79.356l9.444-3.229l1.664-9.838c4.115-24.282,24.97-41.907,49.588-41.907  c7.846,0,15.428,1.82,22.536,5.394l15.306,7.689l7.386-15.444C202.531,138.398,242.635,113.067,285.928,113.067 M285.928,96.277  c-51.778,0-96.358,30.315-117.303,74.092c-9.059-4.558-19.256-7.182-30.086-7.182c-33.233,0-60.762,24.184-66.14,55.893  C32.82,232.657,4.316,270.104,4.316,314.307c0,55.597,45.063,100.669,100.644,100.718h311.084v-0.016  c50.777-0.263,91.856-41.481,91.856-92.308c0-50.909-41.177-92.177-92.053-92.324c0.033-1.344,0.197-2.639,0.197-3.984  C416.044,154.532,357.79,96.277,285.928,96.277L285.928,96.277z"
							fill="#f6b352"
						/>
					</svg>
				</div>
				<div style={{ marginTop: '10px', fontSize: '25px' }}>I'm the remote app</div>
				<Counter label="Remote counter:" onClick$={addCart} state={state} />
			</div>

			<button
				style={{
					border: '0 solid #e2e8f0',
					marginTop: '20px',
					backgroundColor: 'rgb(246, 179, 82)',
					borderRadius: '.25rem',
					fontWeight: '700',
					padding: '.5rem 1rem .5rem 1rem',
					color: 'rgb(24, 24, 24)',
				}}
				onClick$={toggleDetail}
			>
				Toggle Detail
			</button>
			{showDetailSig.value && <Detail />}
		</>
	);
});
