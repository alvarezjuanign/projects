const info = document.querySelector('.infoCont')
const btn = document.querySelector('.btnSearch')
const namePoke = document.querySelector('.name')
const orderPoke = document.querySelector('.order')
const typePoke = document.querySelector('.type')

const imagePoke = document.createElement('img')
const divImage = document.createElement('div')

async function fetchPokemon (pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await response.json()

    const { name, id, types } = data
    namePoke.textContent = name
    orderPoke.textContent = `No. ${id}`
    typePoke.textContent = types[0].type.name

    imagePoke.classList.add('imagePoke')
    imagePoke.alt = `Photo of ${name}`
    imagePoke.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    divImage.appendChild(imagePoke)
    info.appendChild(divImage)
  } catch (error) {
    console.log(error)
  }
}

btn.addEventListener('click', (e) => {
  e.preventDefault()

  const pokemon = document.querySelector('.inputSearch').value
  if (pokemon === '' || pokemon.length < 3) return

  fetchPokemon(pokemon)
})
