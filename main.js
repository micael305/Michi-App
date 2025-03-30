const URL = "https://api.thecatapi.com/v1/images/search";

const cat = document.getElementById('cat');
const btn = document.getElementById('btn-gen-cat');

async function fetchData(urlAPI){
    const response = await fetch(urlAPI);
    const data = await response.json();
    return data;
}

async function reload() {
    const img = await fetchData(URL);
    cat.src = img[0].url;
}

reload();

//btn.onclick = reload; no hace falta esta en el html del button






