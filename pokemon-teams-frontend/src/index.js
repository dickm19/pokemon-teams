document.addEventListener("DOMContentLoaded", function(){
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    const main = document.querySelector("main")


    
    // function for fetching trainers
    function getTrainers(){
        return fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => renderTrainers(trainers))
    }

    //function for fetching pokemon\
    function getPokemon(){
        return fetch(POKEMONS_URL)
        .then(response => response.json())
        .then()
    }

    
    //function to render trainers
    function renderTrainers(trainers){
        trainers.forEach(trainer =>{
            //create card elements
            const card = document.createElement("div")
            const p = document.createElement("p")
            const button = document.createElement("button")
            const ul = document.createElement("ul")  

            //set card ID to corresponding trainer ID
            card.dataset.id = trainer.id
            
            //add class "card" to card element
            card.classList.add("card")

            //Add trainer name to p element and append to card element
            p.textContent = trainer.name
            card.append(p)
            
            //assign button id to corresponding trainer id
            button.dataset.id = trainer.id

            //set button content to "add pokemon" and append to card
            button.textContent = "Add Pokemon"
            card.append(button)
               
            //append ul to card
            card.append(ul)

            //append pokemons to card via forEach
            trainer.pokemons.forEach(pokemon =>{
                 const li = document.createElement("li")
                 li.innerHTML = `
                 ${pokemon.nickname} (${pokemon.species})
                 <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
                 `
                 ul.append(li)
            })
            
            main.append(card)
        })
    }
    
    
    getTrainers()
})
