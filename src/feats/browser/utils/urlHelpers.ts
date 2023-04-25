const isValidURL = (url: string) => {
	const pattern =
		/^(https?:\/\/)?([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(\/.*)?$/i;
	return pattern.test(url);
};

export const handleSearch = (searchText: string, setUrl: (url: string)=> void) => {
	if (isValidURL(searchText)) {
		if (!searchText.match(/^https?:\/\//i)) {
			searchText = `https://www.${searchText}`;
		}
		setUrl(searchText);
	} else {
		const searchQuery = encodeURIComponent(searchText);
		setUrl(`https://www.google.com/search?q=${searchQuery}`);
	}
};
