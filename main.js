const api_key = 'live_Kuq30cHWHlp1gWjzq56GvZpaN3LFL5axykpIZB5HavHTJbjoAG6S87hqPjo9ePK0';
const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2`;
const API_URL_FAVOURITES = `https://api.thecatapi.com/v1/favourites`;
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'http://api.thecatapi.com/v1/images/upload?api_key=live_Kuq30cHWHlp1gWjzq56GvZpaN3LFL5axykpIZB5HavHTJbjoAG6S87hqPjo9ePK0';

const spanError = document.getElementById('error');

async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': api_key
        }
    });
    const data = await res.json(); 
    if(res.status !== 200){
        spanError.innerText = `Error: ${res.status}`
     }else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btnRan1 = document.getElementById('btnRan1');
        const btnRan2 = document.getElementById('btnRan2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        btnRan1.onclick = () => saveFavouriteMichi(data[0].id);
        btnRan2.onclick = () => saveFavouriteMichi(data[1].id);  
        console.log(data);
     }
    
}

async function loadFavouritesMichis() {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'X-API-KEY': api_key
            }
    });
    const data = await res.json(); 
    if(res.status !== 200){
        spanError.innerText = 'Error: ' + res.status;
     }else{
        const section = document.getElementById('favoritesMichis');
        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => { 
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

            //para eliminar michi
            button.onclick = () => deleteFavouriteMichi(michi.id);
        });
     }

     console.log(data);
}

async function  saveFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': api_key
        },
        body: JSON.stringify ({ /
            image_id: id 
        })
    })
    if(res.status !== 200){
        spanError.innerText = 'Error: ' + res.status;
     }else{
        console.log('Michi guardado de favoritos');
        loadFavouritesMichis();
     } 
}

async function deleteFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': api_key
        }
    })
    if(res.status !== 200){
        spanError.innerText = 'Error: ' + res.status;
     }else{
        loadFavouritesMichis();
        console.log('Michi eliminado de favoritos');
     }
}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form);
  
    console.log(formData.get('file'))
  
    const res = await fetch(API_URL_UPLOAD, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
    const data = await res.json();
  
    if (res.status !== 201) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      console.log({data})
    } else {
      console.log('Foto de michi subida :)')
      console.log({data})
      console.log(data.url)
      saveFavouriteMichi(data.id);
    }
  }

loadRandomMichis();
loadFavouritesMichis();

