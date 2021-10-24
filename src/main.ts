import Vue from 'vue';

import App from './App.vue';

import { connectVuetify } from './plugins/vuetify';
import { connectRouter } from './plugins/vue-router';
import { connecti18n } from './plugins/vue-i18n';

import store from './store/store';
import axios from 'axios';

localStorage.setItem(
	'authorization_token',
	'YWxyZWFkeWJvcmVkOlRFU1RfUEFTU1dPUkQ='
);

axios.interceptors.response.use(
	res => res,
	err => {
		const status = err.response.status;

		switch (status) {
			case 401:
				alert(
					`Server has responded with status ${status}. It seems that "Authorization" header was missing in the request`
				);
				break;

			case 403:
				alert(
					`Server has responded with status ${status}. It seems that credentials are incorrect`
				);
		}

		return Promise.reject(err);
	}
);

const createApp = () => {
	Vue.config.productionTip = false;

	return new Vue({
		el: '#app',
		//
		router: connectRouter(Vue),
		vuetify: connectVuetify(Vue),
		i18n: connecti18n(Vue),
		store,
		//
		render: h => h(App),
	});
};

createApp();
