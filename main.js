const API_URL_RANDOM = 
'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_Kuq30cHWHlp1gWjzq56GvZpaN3LFL5axykpIZB5HavHTJbjoAG6S87hqPjo9ePK0';

const API_URL_FAVOURITES = 
'https://api.thecatapi.com/v1/favourites?api_key=live_Kuq30cHWHlp1gWjzq56GvZpaN3LFL5axykpIZB5HavHTJbjoAG6S87hqPjo9ePK0';

const spanError = document.getElementById('error');

async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);
    if(res.status !== 200){
        spanError.innerText = `Error: ${res.status}`
     }else{
        const data = await res.json(); 
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btnRan1 = document.getElementById('btnRan1');
        const btnRan2 = document.getElementById('btnRan2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        btnRan1.onclick = () => saveFavouriteMichi(data[0].id);
        btnRan2.onclick = () => saveFavouriteMichi(data[1].id);  

     //hacemos el llamado a la funcion de otra funcion
     // ya que si no se llama aunque no le demos click
     }
    
}

async function loadFavouritesMichis() {
    const res = await fetch(API_URL_FAVOURITES);
    const data = await res.json();
    console.log('load favourite michis');
    if(res.status !== 200){
        spanError.innerText = 'Error: ' + res.status;
     }else{
        data.forEach(michi => {
            const section = document.getElementById('favoritesMichis');
            const article = document.createElement('article');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const buttonTxt = document.createTextNode('Quitar michi de favoritos');

            section.appendChild(article);
            article.appendChild(img);
            article.appendChild(button);
            img.src = michi.image.url;
            img.width = 150;
            button.appendChild(buttonTxt);
        });
     }

     console.log(data);
}

async function  saveFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' //ya que podria ser un png por ejemplo y no json
            //indicamos que json sera el lenguaje comun entre front y back
        },
        body: JSON.stringify ({ 
            image_id: id 
        })
    })
    if(res.status !== 200){
        spanError.innerText = 'Error: ' + res.status;
     }
     loadFavouritesMichis();
}

loadRandomMichis();
loadFavouritesMichis();

//En el body debemos enviarselo no como un objeto de JS si no como string.
//ya que no sabemos si el lenguaje de nuestra api tambien es JS,
//puede estar escrito en go, python, etc
//JSON.stringify(), te aseguras de que los datos que envías al servidor estén
//en el formato correcto, lo que permite al servidor analizarlos y procesarlos correctamente.






