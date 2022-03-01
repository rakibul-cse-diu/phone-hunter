const noResult = document.getElementById("no-result");

// Handle the search button
const handleSearch = () => {
    const searchText = document.getElementById("search-field");
    const url = `https://openapi.programming-hero.com/api/phones?search=${textNormalize(searchText.value)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (!data.status) {
                noResult.style.display = "block";
            }
            if (data.status) {
                noResult.style.display = "none";
                displayData(data.data);
            }
        })

    searchText.value = "";
}

// text normalization into lowercase
const textNormalize = (text) => {
    return text.toLowerCase();
}

// Display data
const displayData = (data) => {
    const searchResult = document.getElementById("search-result");
    data.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.classList.add("col-12");
        div.innerHTML = `
                <div class="card">
                    <img src=${phone.image} class="card-img-top w-75 m-auto mt-2" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${phone.phone_name}</h5>
                        <h6 class="card-brand mb-3">Brand: ${phone.brand}</h6>
                        <button type="button" class="btn btn-primary">Details</button>
                    </div>
                </div>
            `
        searchResult.appendChild(div);
        console.log(phone);
    });
}