const info = document.querySelector('.infoCont')

const pokemon = document.querySelector('.name')
const score = document.querySelector('.score')
const highScore = document.querySelector('.highScore')

const input = document.querySelector('.inputText')
const checkBtn = document.querySelector('.btnCheck')
const restartBtn = document.querySelector('.btnRestart')
const rerollBtn = document.querySelector('.btnRoll')

const lifes = document.querySelector('.lifeContainer')

const imagePoke = document.createElement('img')
const divImage = document.createElement('div')
const gameOver = document.createElement('p')

let scoreCount = ''
const random = Math.round(Math.random() * 898)
let pokemonFetched = []

async function fetchPokemon (random) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
    const data = await response.json()
    const { name, id } = data

    newGame(name, id)

    return (name, id)
  } catch (error) {
    console.log(error)
  }
}

const randomFetch = () => {
  const newRandom = Math.round(Math.random() * 898)
  if (newRandom === random) randomFetch()
  fetchPokemon(newRandom)
}

const newGame = (name, id) => {
  restartBtn.style.display = 'none'
  checkBtn.style.display = 'block'
  rerollBtn.style.display = 'block'

  if (pokemonFetched.length > 0) {
    pokemonFetched = []
  }

  if (lifes.children.length === 0) {
    createHearts()

    score.innerHTML = '0'
    scoreCount = '0'
  }

  if (divImage.firstChild) {
    divImage.removeChild(divImage.firstChild)
  }

  imagePoke.classList.add('imagePoke')
  imagePoke.alt = `Photo of pokemon ${name}`
  imagePoke.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  divImage.appendChild(imagePoke)
  info.appendChild(divImage)

  pokemon.innerHTML = name
  pokemon.style.opacity = '0'

  pokemonFetched.push(name, id)
}

const endGame = () => {
  const parsedHighScore = parseInt(highScore.innerHTML)

  if (divImage.firstChild) {
    divImage.removeChild(divImage.firstChild)
  }

  gameOver.innerHTML = 'GAME OVER'
  gameOver.classList.add('gameOver')

  pokemon.style.opacity = '0'
  input.value = ''

  if (scoreCount > parsedHighScore) {
    highScore.innerHTML = score.innerHTML
  }

  divImage.appendChild(gameOver)
}

const createHearts = () => {
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement('img')
    heart.src = 'https://res.cloudinary.com/ddmtmwlja/image/upload/v1700865379/a2blyurh74do4fzboewe.svg'
    heart.classList.add('heart')
    lifes.appendChild(heart)
  }
}

checkBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const parsedScore = parseInt(score.innerHTML)

  if (input.value === pokemonFetched[0]) {
    imagePoke.classList.add('correct')
    pokemon.style.opacity = '1'
    input.value = ''
    score.innerHTML = parsedScore + 1
    scoreCount = score.innerHTML

    pokemonFetched = []

    setTimeout(() => {
      randomFetch()
      imagePoke.classList.remove('correct')
    }, 2000)
  } else {
    if (lifes.hasChildNodes()) {
      lifes.children[0].remove()
    }

    if (lifes.children.length === 0) {
      restartBtn.style.display = 'block'
      checkBtn.style.display = 'none'
      rerollBtn.style.display = 'none'

      endGame()
      return
    }

    imagePoke.classList.add('wrong')
    pokemon.style.opacity = '1'
    input.value = ''
    score.innerHTML = scoreCount
    pokemonFetched = []

    setTimeout(() => {
      randomFetch()
      imagePoke.classList.remove('wrong')
    }, 2000)
  }
})

rerollBtn.addEventListener('click', (e) => {
  e.preventDefault()
  pokemonFetched = []
  randomFetch()
})

restartBtn.addEventListener('click', (e) => {
  e.preventDefault()
  randomFetch()
})

window.addEventListener('load', () => {
  fetchPokemon(random)
  createHearts()
})
