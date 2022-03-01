const noResult = document.getElementById("no-result");

// Handle the search button
const handleSearch = () => {
    const searchText = document.getElementById("search-field");
    const url = `https://openapi.programming-hero.com/api/phones?search=${textNormalize(searchText.value)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
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
    const phoneDetails = document.getElementById("phone-details");
    searchResult.textContent = '';
    phoneDetails.style.display = "none";

    let selectedData = [];
    if (data.length > 20) {
        selectedData = data.slice(0, 20);
    }
    if (data.length < 20) {
        selectedData = data;
    }

    selectedData.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.classList.add("col-12");
        div.innerHTML = `
                <div class="card">
                    <img src=${phone.image} class="card-img-top w-75 m-auto mt-2" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${phone.phone_name}</h5>
                        <h6 class="card-brand mb-3">Brand: ${phone.brand}</h6>
                        <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary">Details</button>
                    </div>
                </div>
            `
        searchResult.appendChild(div);
    });
}

// fetch phone details and dispaly
const loadPhoneDetails = (id) => {
    const detailsUrl = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(detailsUrl)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}


// display phone details
const displayPhoneDetails = (data) => {
    const phoneDetails = document.getElementById("phone-details");
    const cardImage = document.querySelector(".details-img");
    const cardTitle = document.querySelector(".phone-title");
    const cardBrand = document.querySelector(".phone-brand");
    const cardRelase = document.querySelector(".card-release-date");
    const chipset = document.getElementById("chipset");
    const display = document.getElementById("displaysize");
    const memory = document.getElementById("memory");
    const others = document.querySelector(".card-others");
    const bluetooth = document.getElementById("bluetooth");
    const gps = document.getElementById("gps");
    const nfc = document.getElementById("nfc");
    const radio = document.getElementById("radio");
    const usb = document.getElementById("usb");
    const wlan = document.getElementById("wlan");

    phoneDetails.style.display = "block";

    cardImage.src = data.image;
    cardTitle.innerText = `Name: ${data.name}`
    cardBrand.innerText = `Brand: ${data.brand}`

    if (data.releaseDate) {
        cardRelase.innerText = `Release Date: ${data.releaseDate}`
    }
    if (!data.releaseDate) {
        cardRelase.innerText = `Release Date: No release date found`
    }

    chipset.innerText = `Chip Set: ${data.mainFeatures.chipSet}`
    display.innerText = `Display Size: ${data.mainFeatures.displaySize}`
    memory.innerText = `Memory: ${data.mainFeatures.memory}`
    displaySensors(data.mainFeatures.sensors);

    if (data.others) {
        bluetooth.innerText = `Bluetooth: ${data.others.Bluetooth}`
        gps.innerText = `GPS: ${data.others.GPS}`
        nfc.innerText = `NFC: ${data.others.NFC}`
        radio.innerText = `Radio: ${data.others.Radio}`
        usb.innerText = `USB: ${data.others.USB}`
        wlan.innerText = `WLAN: ${data.others.WLAN}`
    }
    if (!data.others) {
        bluetooth.innerText = `Bluetooth: Undefined`
        gps.innerText = `GPS: Undefined`
        nfc.innerText = `NFC: Undefined`
        radio.innerText = `Radio: Undefined`
        usb.innerText = `USB: Undefined`
        wlan.innerText = `WLAN: Undefined`
    }



    console.log(data.others);

}


// display sensors
const displaySensors = (sensorArray) => {
    const sensorId = document.getElementById("sensor-id");

    sensorArray.map(sensors => {
        console.log(sensors)
        const li = document.createElement("li");
        li.classList.add("sensor");
        li.innerText = `${sensors}`
        sensorId.appendChild(li);
    })

}