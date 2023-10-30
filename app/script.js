const SUPERHERO_TOKEN = 5939075229530848
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`
const newHeroButton = document.getElementById('newHeroButton')
const HeroImageDiv = document.getElementById('heroImage') 
const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')

const getSuperHero = (id, name) => {
    //name 👉 base_url/search/batman
    //json.results[0].image.url
    //id: 👉 base_url/id
    fetch (`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
        console.log(json.powerstats)
        const superHero = json        
        showHeroInfo(superHero)
        
    }) 
}

const statToEmoji = {
    intelligence: '🧠',
    strength: '💪',
    speed: '⚡',
    durability: '🏋️',
    power: '📊',
    combat: '⚔️'

}


const showHeroInfo = (character) => {
    const name = `<h2>${character.name}</h2>`

    const img = `<img src="${character.image.url}" height="200" width="200"/>`

   const stats = Object.keys(character.powerstats).map(stat => {
       return `<p>${statToEmoji[stat]}${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
    }).join('')

    
    HeroImageDiv.innerHTML =  `${name}${img}${stats}`

}



const getSearchSuperhero = (name) =>{
    fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
        const hero = json.results[0]
        showHeroInfo(hero)

    } )
}


const RandomHero = () => {
    const numberOfHeros = 731
    return  Math.floor(Math.random() * numberOfHeros) + 1
}

newHeroButton.onclick = () =>    getSuperHero(RandomHero())  
searchButton.onclick = () =>  getSearchSuperhero(searchInput.value)
searchInput.onkeyup = () => getSearchSuperhero(searchInput.value)

 
 

 