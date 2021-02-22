import 'carbon-components-svelte/css/all.css'
import './styles/layout.less';
import './styles/theme.less';
import App from './app.svelte';

const app = new App({
	target: document.body,
	props: { githubUrl: GITHUB_URL },
});

export default app;