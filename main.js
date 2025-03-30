const URL = "https://api.thecatapi.com/v1/images/search";

const cat = document.getElementById('cat');

async function fetchData(urlAPI){
    const response = await fetch(urlAPI);
    const data = response.json();
    return data;
}

(async () => {
    try{
    const img = await fetchData(URL);
    cat.src = img[0].url;
    }catch(error){
        console.error(error);
    }
})();