let animating = false
let positioned = false

const message = "this is a very fancy menu I've created"

const flakesContainer = document.querySelector('#animation-start')
const clickMe = document.querySelector('#click-me')

const positions = [
  [175, 276],
  [113, 185],
  [245, 152],
  [204, 88],
  [48, 66],
  [205, 31],
  [101, -43],
  [24, -85],
  [265, -139],
  [148, -185]
]

const createFlakes = () => {
  return message.toLowerCase().split(' ').map(word => {
    const flake = document.createElement('div')
    flake.classList = 'flake'
    flake.textContent = word[0]
    flakesContainer.append(flake)
    flake.addEventListener('click', () => {
      positioned ? unPositionFlakes() : positionFlakes()
    })
    const span = document.createElement('span')
    span.textContent = word.slice(1)
    flake.append(span)
    return flake
  })
}

const flakes = createFlakes()

const toggleFullText = () => {
  const spans = Array.from(document.querySelectorAll('div.flake span'))
  spans.forEach(span => {
    span.style.opacity = positioned ? '1' : '0'
  });

}

flakes[0].addEventListener('transitionend', () => {
  animating = false
  toggleFullText()
})

const positionFlakes = () => {
  if (!animating) {
    clickMe.style.color = 'var(--bgcolor)'
    clickMe.style.left = '100px'
    positioned = true
    animating = true
    flakes.forEach((flake, i) => {
      flake.style.left = `${positions[i][0]}px`
      flake.style.top = `${-positions[i][1]}px`
      flake.style.transform = `rotate3d(1,1,1,${Math.floor(Math.random() * 10 + 3) * 360}deg)`
      flake.style.color = `var(--bgcolor)`
    })
  }
}

const unPositionFlakes = () => {
  if (!animating) {
    positioned = false
    clickMe.style.color = ''
    clickMe.style.left = ''
    toggleFullText()
    animating = true
    flakes.forEach(flake => {
      flake.style.top = ''
      flake.style.left = ''
      flake.style.transform = ''
      flake.style.color = ``
    })
  }
}

clickMe.addEventListener('click', () => positioned ? unPositionFlakes() : positionFlakes())
