// Handle the search button
const handleSearch = () => {
    const searchText = document.getElementById("search-field");
    const url = `https://openapi.programming-hero.com/api/phones?search=${textNormalize(searchText.value)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))

    searchText.value = "";
}

// text normalization into lowercase
const textNormalize = (text) => {
    return text.toLowerCase();
}