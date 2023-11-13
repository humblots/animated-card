interface Animations {
  [key: string]: (e: Event) => void
}

function flipCard (e: Event) {
  alert('TODO')
}

function bounce (e: Event) {
  alert('TODO')
}

function turn (e: Event) {
  alert('TODO')
}

const animations : Animations = {
  flipCard,
  bounce,
  turn,
}

export default animations;