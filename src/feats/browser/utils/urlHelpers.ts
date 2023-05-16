const isValidURL = (url: string) => {
  const pattern =
    /^(https?:\/\/)?([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(\/.*)?$/i;
  return pattern.test(url);
};

export const handleSearch = (
  searchText: string,
  setUrl: (url: string) => void
) => {
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
export const isSameWebsite = (currentUrl: string, newUrl: string) => {
  const urlObj1 = new URL(currentUrl);
  const urlObj2 = new URL(newUrl);
  return urlObj1.hostname === urlObj2.hostname;
};
