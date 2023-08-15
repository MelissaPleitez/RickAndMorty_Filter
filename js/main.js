
function startApp(){
    //   Variables
    const results = document.querySelector('#results')
    const resultFav= document.querySelector('.fav')
    const option_status= document.querySelector('#status option')
    const option_characters= document.querySelector('#characters')
    const form = document.querySelector('#form')
 
     // Modal Variables

     const modal = new bootstrap.Modal('#modal')

   if(option_status || option_characters){
    form.addEventListener('submit', choice_character)
    characters()
    
   }

   if(resultFav){
    favorite_character_section()
   }

    
    // Functions
   
    function characters(){

    const URL= `https://rickandmortyapi.com/api/character`
      
    fetch(URL)
        .then(response => response.json())
        .then(response => adding_characters(response.results))

    }

    function adding_characters(allCharacters){
        
        // console.log(allCharacters)
        allCharacters.forEach(character => {
            const {name, status} = character

            // Inputs character
            const input_character= document.createElement('option')
            input_character.value= name
            input_character.textContent= name
            option_characters.appendChild(input_character)

             // Inputs status
            //  const input_status= document.createElement('option')
            //  input_status.value= status
            //  input_status.textContent= status
            //  option_status.appendChild(input_status)
 
            //  character_chosen= input_character
            //  status_character= input_status

            //  selecting_values(character_chosen, status_character)

        });

    }

    function choice_character(e){
        e.preventDefault()
   
        const characters= e.target[0].value
        const status= e.target[1].value
            const URL=`https://rickandmortyapi.com/api/character/?name=${characters}&status=${status}`
            cleaning_html(results)
        fetch(URL)
           .then(response => response.json() )
           .then(response => showing_characters(response.results))
           .catch(error => console.log('No exist Character', error))
   
   }


   function showing_characters(characters){
    console.log(characters)

   
        characters.forEach((character)=>{
            const {id, name, status, image, gender, episode, species} = character
    
            // Card containers
            const cardsContainer= document.createElement('div')
            cardsContainer.classList.add('col-md-4')
    
            const cards= document.createElement('div')
            cards.classList.add('card', 'mb-4', 'bg-nav-color')
            cards.style= 'width: 18rem;'
            // Cards Imgs
            const cardImg= document.createElement('img')
            cardImg.classList.add('card-img-top')
            cardImg.alt=`Character ${name}`
            cardImg.src= image ?? character.image
    
            // Card Body
            const cardBody= document.createElement('div')
            cardBody.classList.add('card-body')
    
            const cardTitle= document.createElement('h5')
            cardTitle.classList.add('card-title', 'fs-3', 'text-center')
            cardTitle.textContent= name ?? character.name
    
            const cardText= document.createElement('p')
            cardText.classList.add("card-text")
            const textCard= document.createElement('p')
            textCard.classList.add('text-center')
            textCard.textContent= status ?? character.status
            cardText.appendChild(textCard)
            // Card buttons
            const btn_info= document.createElement('button')
            btn_info.classList.add('btn', 'button-color-main', 'w-100')
            btn_info.textContent= 'Information'
    
            btn_info.onclick= function(){
                showing_modal({
                    id: id ?? character.id,
                    name,
                    image,
                    gender, 
                    episode, 
                    species,
                    status
                })
            }
            //Adding HTML
    
            cardBody.appendChild(cardTitle)
            cardBody.appendChild(cardText)
            cardBody.appendChild(btn_info)
            cards.appendChild(cardImg)
            cards.appendChild(cardTitle)
            cards.appendChild(cardBody)
            cardsContainer.appendChild(cards)
    
            results.appendChild(cardsContainer)
    
        })   

   
   }


   function showing_modal(info){
    const {id, name, image, gender, episode, species, status} = info


    const modal_body = document.querySelector('.modal-body')
    const modal_footer = document.querySelector('.modal-footer')
    const modal_title = document.querySelector('.modal-title')
    modal_title.textContent=name
    modal_body.innerHTML= `
    <img src=${image} class="w-100" />
    <p class="mt-1">Gender: ${gender}</p>
    <p class="">Species: ${species}</p>
    <h4 class="text-center">Episodes</h4>
    `

    episode.forEach((episodes)=>{

        const ul_container= document.createElement('ul')
        ul_container.classList.add('list-group')

        const li_item= document.createElement('li')
        li_item.classList.add('list-group-item')
        li_item.textContent= episodes

        ul_container.appendChild(li_item)
        modal_body.appendChild(ul_container)

    })

    cleaning_html(modal_footer)

    const btn_favorite = document.createElement('button')
    btn_favorite.classList.add('btn', 'btn-danger', 'col')
    btn_favorite.textContent= favorites_exist(id) ? "Delete from Fav" : 'Favorite'

    const btn_close = document.createElement('button')
    btn_close.classList.add('btn', 'modal-button-colors', 'col')
    btn_close.textContent= "Close"

    btn_close.onclick= function(){
        modal.hide()
    }


    btn_favorite.onclick= function(){

        if(favorites_exist(id)){
            delete_favorites(id)
            btn_favorite.textContent= 'Favorite'
            toast_alert('Character Removed')
            return
        }


        saving_favorite(info)
        btn_favorite.textContent= 'Delete from Fav'
        toast_alert('Character Added')
    }

    modal_footer.appendChild(btn_favorite)
    modal_footer.appendChild(btn_close)

    modal.show()
   }


   function saving_favorite(characters){

    console.log(characters)
    const favorites = JSON.parse(localStorage.getItem('characters')) ?? []
    localStorage.setItem('characters',JSON.stringify([...favorites, characters]))

   }

   function favorites_exist(id){
    const favorites = JSON.parse(localStorage.getItem('characters')) ?? []
    return favorites.some((favorite)=> favorite.id === id)
   }


   function delete_favorites(id){
    const favorites = JSON.parse(localStorage.getItem('characters')) ?? []
    const deleteFav = favorites.filter((favorite)=> favorite.id !== id)
    localStorage.setItem('characters',JSON.stringify(deleteFav))
   }

   function favorite_character_section(){

   const fav= JSON.parse(localStorage.getItem('characters')) ?? []
    showing_characters(fav)
   }

   function toast_alert(message){

    Toastify({
        text:`${message} ` ,
        className: "info",
        duration: 3000,
        style: {
          background: "#9d263a",
        }
      }).showToast();

   }

   function cleaning_html(components){

    while(components.firstChild){
        components.removeChild(components.firstChild)
    }

   }



    }


   











window.addEventListener('DOMContentLoaded', startApp)