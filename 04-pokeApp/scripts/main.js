const info = document.querySelector('.infoCont')
const btn = document.querySelector('.btnSearch')
const input = document.querySelector('.inputSearch')
const pokemon = document.querySelector('.name')
const score = document.querySelector('.score')
const highScore = document.querySelector('.highScore')
const nextPoke = document.querySelector('.btnNext')

const imagePoke = document.createElement('img')
const divImage = document.createElement('div')

const random = Math.round(Math.random() * 898)
let pokemonFetched = []

async function fetchPokemon (random) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
    const data = await response.json()

    imagePoke.classList.add('imagePoke')
    imagePoke.alt = `Photo of pokemon ${data.name}`
    imagePoke.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`

    divImage.appendChild(imagePoke)
    info.appendChild(divImage)

    pokemon.innerHTML = data.name
    pokemon.style.opacity = '0'

    pokemonFetched.push(data.name)
    console.log(pokemonFetched)
  } catch (error) {
    console.log(error)
  }
}

const newFetch = () => {
  const newRandom = Math.round(Math.random() * 898)
  if (newRandom === random) newFetch()
  fetchPokemon(newRandom)
}

btn.addEventListener('click', (e) => {
  e.preventDefault()

  const parsedScore = parseInt(score.innerHTML)
  const parsedHighScore = parseInt(highScore.innerHTML)

  if (input.value === pokemonFetched[0]) {
    imagePoke.classList.add('correct')
    pokemon.style.opacity = '1'
    input.value = ''
    score.innerHTML = parsedScore + 1

    pokemonFetched = []

    setTimeout(() => {
      newFetch()
      imagePoke.classList.remove('correct')
    }, 2000)
  } else {
    if (parsedScore > parsedHighScore) {
      highScore.innerHTML = score.innerHTML
    }

    imagePoke.classList.add('wrong')
    pokemon.style.opacity = '1'
    input.value = ''
    score.innerHTML = '0'

    pokemonFetched = []

    setTimeout(() => {
      newFetch()
      imagePoke.classList.remove('wrong')
    }, 2000)
  }
})

nextPoke.addEventListener('click', (e) => {
  e.preventDefault()
  pokemonFetched = []
  newFetch()
})

window.addEventListener('load', () => {
  fetchPokemon(random)
})
