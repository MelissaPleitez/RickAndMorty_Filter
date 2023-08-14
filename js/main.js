


function startApp(){

//   Variables

    const option_characters= document.querySelector('#characters')

    characters()

    function characters(){

    const URL= `https://rickandmortyapi.com/api/character`
      
    fetch(URL)
        .then(response => response.json())
        .then(response => adding_characters(response.results))

    }

    function adding_characters(allCharacters){
        console.log(allCharacters)

        allCharacters.forEach(character => {
            const {name} = character

            const option_input= document.createElement('option')
            option_input.value= name
            option_input.textContent= name

            option_characters.appendChild(option_input)

        });

    }

}











window.addEventListener('DOMContentLoaded', startApp)