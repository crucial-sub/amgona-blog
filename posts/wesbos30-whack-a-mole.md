---
title: '[wesbos30] 30. 두더지 뚝배기'
date: '2023.02.22, 03:00'
category: 'wesbos30'
excerpt: '💡 랜덤으로 튀어나오는 두더지를 클릭해서 점수를 올리는 간단한 두더지 잡기 게임이다.'
thumbnail: '/images/wesbos30-whack-a-mole.gif'
---

> 💡 랜덤으로 튀어나오는 두더지를 클릭해서 점수를 올리는 간단한 두더지 잡기 게임이다.

## 로직

1. 스타트 버튼 누르면 랜덤한 구멍에서 두더지 올라오기 시작
2. 두더지가 제한시간 동안 랜덤한 시간으로 올라왔다가 내려옴
3. 두더지를 클릭할 때마다 스코어보드에 점수 갱신

---

## 코딩 과정

### **1. 사용할 상수 선언**

```jsx
const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
const btn = document.getElementById('startBtn')
```

### **2. 두더지가 나와있을 시간 정하기**

```jsx
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
```

#### 최솟값과 최댓값 사이에서 랜덤한 값 구하기

위의 식을 사용하면 최소시간 min과 최대시간 max 사이의 랜덤한 시간(초)을 반환한다.

### **3. 두더지가 랜덤한 구멍에서 나오도록 설정**

```jsx
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length)
  //두더지가 나올 랜덤한 구멍 선언
  const hole = holes[idx]
}
```

구멍의 총 개수 이하의 값을 랜덤으로 구한 후
이 값을 구멍들의 NodeList인 holes의 번호에 넣어 몇 번째 구멍에서 두더지가 튀어나올지 정한다.

> ❗️ 이 때 랜덤으로 구한 hole을 console에 찍어보면

![콘솔1](https://user-images.githubusercontent.com/87363422/156450552-a25d18e3-f5a0-42ad-98ed-2f4dc4486824.png)

hole4가 **연속으로** 3번 선택된 것을 볼 수 있다.

🆙 게임 난이도를 높이기 위해 두더지가 같은 구멍에선 **연속으로** 나오지 않게 다시 설정하면 아래와 같다.

```jsx
//변수 선언
let lastHole

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  //만약 랜덤으로 구한 hole이 직전에 실행된 함수에서 할당해 놓은 lastHole과 같다면 함수를 재실행해 다른 hole을 구하도록 함
  if (hole === lastHole) {
    return randomHole(holes)
  }
  //변수 lastHole에 hole 할당
  lastHole = hole
  return hole
}
```

### **4. 두더지가 나왔다가 들어가도록 설정**

```jsx
function peep() {
  //최소시간 200ms, 최대시간 1000ms 사이에서 랜덤한 시간값 구함
  const time = randomTime(200, 1000)
  const hole = randomHole(holes)
  //두더지가 튀어나오는 css적용
  hole.classList.add('up')
  //시간이 time만큼 지나면 두더지가 다시 들어가도록 class제거
  setTimeout(() => {
    hole.classList.remove('up')
    //두더지가 들어가면 다른 두더지가 이어서 튀어나오도록 함수 재실행
    peep()
  }, time)
}
```

randomHole 함수로 랜덤하게 지정한 hole에 'up' 클래스를 추가하여 실제로 두더지가 튀어나오게 하고

randomTime 함수로 랜덤하게 지정한 시간만큼 지나면 다시 'up' 클래스를 지워 두더지가 들어가도록 한다.

두더지가 들어가고 나면 peep 함수를 재실행하여 다른 두더지가 연이어 나오도록 한다.

### **5. 버튼에 전달할 게임시작 함수 설정**

```jsx
function startGame() {
  //맨 처음 스코어보드 점수는 0점 고정!
  scoreBoard.textContent = 0
  peep()
}

btn.addEventListener('click', startGame)
```

> 💡 이 상태로 게임을 실행시켜보면 peep 함수가 끝없이 재실행되어 게임이 끝나지 않는다.
>
> 따라서 peep 함수 재실행에 조건을 두어 시간이 지나면 게임이 끝날 수 있도록 한다.

```jsx
//게임종료를 위한 변수 선언
let timeUp = false

function peep() {
  const time = randomTime(200, 1000)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    //timeUp 값이 false일 때만 peep 함수 재실행
    if (!timeUp) peep()
  }, time)
}

function startGame() {
  scoreBoard.textContent = 0
  peep()
  //제한시간 10초가 지나면 timeUp 값을 true로 설정해 두더지가 더이상 안나오도록 한다.
  setTimeout(() => {
    timeUp = true
  }, 10000)
}
```

### **6. 두더지를 잡았을 때의 함수 설정**

```jsx
//초기 점수는 0점
let score = 0

function bonk(e) {
  //사용자가 직접 마우스를 클릭하여 두더지를 잡은게 아니라면 함수를 리턴시킴
  if (!e.isTrusted) return
  //두더지를 잡으면 score 변수의 값이 1씩 늘어남
  score++
  //두더지를 잡고나면 다시 땅속으로 들어감
  this.classList.remove('up')
  //두더지를 잡을 때 마다 스코어보드가 자동갱신되도록 설정
  scoreBoard.textContent = score
}

moles.forEach(mole => mole.addEventListener('click', bonk))
```

### event.isTrusted (부정 방지용!)

```jsx
if (!e.isTrusted) return
```

<img width="594" alt="콘솔2" src="https://user-images.githubusercontent.com/87363422/156451004-35549ea1-5f88-46d6-ba81-5f0177a8be79.png">

이벤트 객체의 isTrusted 속성을 통해 이 이벤트가 스크립트를 통해 생성된 이벤트인지
‘진짜’ 사용자 액션을 통해 생성된 이벤트인지 알 수 있다

여기선 두더지를 클릭한 이벤트가 '진짜' 사용자가 마우스를 눌러서 발생했는지를 확인하는데 쓰인다.

### 증가 연산자 ++

```jsx
let score = 0
score++
```

숫자 값을 가진 변수 앞뒤에 증가연산자 ++를 붙이면 그 값을 1 증가시킨다.

반대로 변수 앞뒤에 --를 붙이면 그 값을 1 감소 시킨다.

### **7. 추가 설정 !**

> 💢 게임을 다 만들고 나니 아쉬운 부분이 크게 두가지 있었다..
>
> 첫 번째는 스타트 버튼을 여러 번 누를 경우 게임이 중복 실행된다는 점
>
> 두 번째는 두더지가 올라와 있을 때 광클할 경우 점수가 여러 번 올라간다는 점이다

### 게임 중복 실행 해결

```jsx
function startGame() {
  //게임을 시작하면 버튼 비활성화
  btn.disabled = 'disabled'
  scoreBoard.textContent = 0
  timeUp = false
  peep()
  setTimeout(() => {
    timeUp = true
    //게임 제한시간이 끝나면 다시 버튼 활성화
    btn.disabled = ''
  }, 10000)
}
```

스타트 버튼을 눌러 게임을 실행시키고나면 버튼에 disabled 속성을 추가하여 게임 진행 중에는 더 이상 버튼을 누를 수 없도록하고

게임이 끝나면 disabled 속성이 제거되어 다시 버튼을 누를 수 있다.

### 두더지 한마리 당 1점씩만 얻을 수 있도록!

```jsx
//변수의 초기 설정값은 false
let clicked = false

function bonk(e) {
  //clicked 값이 true일 경우 함수 실행 x
  if (clicked) return
  if (!e.isTrusted) return // cheater!
  score++
  this.classList.remove('up')
  scoreBoard.textContent = score
  //일단 한번 두더지를 클릭하고나면 clicked 값 true로 변경
  clicked = true
}

//두더지 각각에게 땅속으로 들어갈 때마다 clicked 값이 false가 되도록 지정
moles.forEach(mole =>
  mole.addEventListener('transitionend', () => {
    clicked = false
  }),
)
```

1. 먼저 함수에 조건을 걸기위한 clicked 변수를 선언한다

1. clicked의 초기값은 false이며 두더지를 클릭하여 한번 bonk 함수가 실행되고나면 true로 값이 바뀐다.

1. 이후에는 다시 두더지를 클릭해도 clicked 값이 true이므로 함수 첫부분에서 막혀 더 이상 점수를 얻지 못한다.

1. transitionend 이벤트로 두더지가 다시 땅속으로 들어가면 clicked 값을 false로 되돌린다.
   ⇒ 두더지가 다시 나올 땐 다시 점수를 얻을 수 있음

---

## 최종 완성 코드

```jsx
const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
const btn = document.getElementById('startBtn')
let lastHole
let timeUp = false
let score = 0
let clicked = false

//두더쥐 나와있는 랜덤시간 설정
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

//랜덤으로 두더지 튀어나오게 설정
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  if (hole === lastHole) {
    return randomHole(holes)
  }
  lastHole = hole
  return hole
}

//두더지 튀어나올때 설정값들
function peep() {
  const time = randomTime(200, 1000)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if (!timeUp) peep()
  }, time)
}

//스타트 버튼누르면 발생하는 일들
function startGame() {
  btn.disabled = 'disabled'
  scoreBoard.textContent = 0
  timeUp = false
  //게임 시작하면 마우스 커서 망치로 변경
  document.body.classList.add('hammer')
  peep()
  setTimeout(() => {
    timeUp = true
    btn.disabled = ''
    document.body.classList.remove('hammer')
  }, 10000)
}

//두더지 눌렸을때 함수
function bonk(e) {
  if (clicked) return
  if (!e.isTrusted) return // cheater!
  score++
  this.classList.remove('up')
  scoreBoard.textContent = score
  clicked = true
}

btn.addEventListener('click', startGame)

moles.forEach(mole => mole.addEventListener('click', bonk))

//한번 클릭한 두더지는 다시 내려가기 전까진 눌러도 점수 안오름
moles.forEach(mole =>
  mole.addEventListener('transitionend', () => {
    clicked = false
  }),
)
```
