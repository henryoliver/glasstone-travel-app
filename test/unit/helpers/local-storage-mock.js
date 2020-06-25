export default () => {
	const state = Object.create(null);

	return {
		setItem(key, value) {
			if (typeof value !== 'string') {
				throw new Error('You should pass in a string to localStorage.setItem');
			}
			state[key] = value;
		},
		getItem(key) {
			return state[key];
		}
	};
};
