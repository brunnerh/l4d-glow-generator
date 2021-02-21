import 'carbon-components-svelte/css/g100.css'
import './styles/layout.less';
import './styles/theme.less';
import App from './app.svelte';

const app = new App({
	target: document.body,
});

export default app;