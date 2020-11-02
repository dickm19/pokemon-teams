// document.addEventListener("DOMContentLoaded", function(){
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
    // function getPokemon(){
    //     return fetch(POKEMONS_URL)
    //     .then(response => response.json())
    //     .then()
    // }

    
    //function to render trainers
    function renderTrainers(trainers){
        trainers.forEach(trainer =>{
            //create card elements
            const card = document.createElement("div")
            const p = document.createElement("p")
            const button = document.createElement("button")
            const ul = document.createElement("ul")  

            ul.dataset.id = trainer.id
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


            button.addEventListener("click", getPokemon)
               
            //append ul to card
            card.append(ul)

            //append pokemons to card via forEach
            trainer.pokemons.forEach(pokemon =>{ 
                 const li = document.createElement("li")
                 li.dataset.id = pokemon.id
                 const deleteButton = document.createElement("button")
                 deleteButton.classList.add("release")
                 deleteButton.textContent = "Release"
                 deleteButton.setAttribute("data-pokemon-id", pokemon.id)
                 li.innerHTML = `
                 ${pokemon.nickname} (${pokemon.species})
                 `
                 li.append(deleteButton)
                 deleteButton.addEventListener("click", releasePokemon)
                 ul.append(li)
            })
            
            main.append(card)
        })
    }
    
    


    function getPokemon(event) {

        const config = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                "trainer_id": event.target.parentElement.dataset.id
            })
        }
        
        return fetch(`${POKEMONS_URL}/?_limit=1`, config)
        .then(response => response.json())
        .then(pokemon =>{
            
            const ul = event.target.parentElement.querySelector("ul")
            const li = document.createElement("li")
            if (ul.children.length < 6){
                li.innerHTML = `
                 ${pokemon.nickname} (${pokemon.species})
                 <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
                 `
                ul.append(li)
            } else {
                alert("Cannot add more than six pokemon to team")
            }
            
        })

    }

    // pokemon => addPokemon(pokemon, event.target)
    

    //function to release pokemon
    function releasePokemon(event){
        const config = {
            method: "DELETE",
            headers: { "Content-Type": "application/json"},
            
        }
        
        return fetch(`${POKEMONS_URL}/${event.target.parentElement.dataset.id}`, config)
        .then(response => response.json())
        .then(pokemon =>{
            event.target.parentElement.remove()
        })
    }
    
    getTrainers()



