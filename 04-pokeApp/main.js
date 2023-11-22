const info = document.querySelector('.infoCont')
const btn = document.querySelector('.btnSearch')
const input = document.querySelector('.inputSearch')

const imagePoke = document.createElement('img')
const divImage = document.createElement('div')

const pokemonFetched = []

async function fetchPokemon (random) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
    const data = await response.json()

    imagePoke.classList.add('imagePoke')
    imagePoke.alt = `Photo of pokemon ${data.name}`
    imagePoke.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
    divImage.appendChild(imagePoke)
    info.appendChild(divImage)

    pokemonFetched.push(data.name)
  } catch (error) {
    console.log(error)
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault()

    if (input.value === pokemonFetched[0]) {
      imagePoke.style.filter = 'blur(0)'
    } else {
      imagePoke.style.background = 'red'
    }
  })
}

window.addEventListener('load', () => {
  const random = Math.round(Math.random() * 930)
  fetchPokemon(random)
})
