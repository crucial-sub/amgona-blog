---
title: '[wesbos30] 29. CountDown Timer'
date: '2023.02.22, 02:00'
category: 'wesbos30'
excerpt: 'π‘ μκ°μ μ ν΄μ£Όλ©΄ μΉ΄μ΄νΈ λ€μ΄μ ν΄μ£Όλ νμ΄λ¨Έλ₯Ό λ§λ€μ΄λ³΄μ!'
thumbnail: '/images/wesbos29-countdown-timer.webp'
---

> π‘ μκ°μ μ ν΄μ£Όλ©΄ μΉ΄μ΄νΈ λ€μ΄μ ν΄μ£Όλ νμ΄λ¨Έλ₯Ό λ§λ€μ΄λ³΄μ!

## λ‘μ§

1. 1μ΄λ§λ€ μΉ΄μ΄νΈλ€μ΄ν΄μ£Όλ timer ν¨μ λ§λ€κΈ°
2. λ¨μμκ° νμ ν¨μμ λλλ μκ° νμ ν¨μ λ§λ€κΈ°
3. timer ν¨μμ μκ° νμ ν¨μ 2κ° μΆκ°
4. λ²νΌκ³Ό μλ ₯ νΌμΌλ‘ timerν¨μ μλμν€κΈ°

---

## μ½λ© κ³Όμ 

### **1. νμ΄λ¨Έ ν¨μ λ§λ€κΈ°**

```jsx
let countdown

function timer(seconds) {
  //νμ¬ μκ°μ ms λ¨μλ‘ λνλ
  const now = Date.now()
  //νμ¬ μκ°μμ μλ ₯ν μκ° νλ₯Ό ms λ¨μλ‘ λνλ
  const then = now + seconds * 1000

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    //λ¨μ μκ°μ΄ 0 λ³΄λ€ μμμ§λ©΄ μΈν°λ² λλ΄κ³  ν¨μ μ’λ£
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
  }, 1000)
}
```

λ¨Όμ  setIntervalλ‘ 1μ΄λ§λ€ λ¨μ μκ°μ μΉ΄μ΄νΈλ€μ΄νλ ν¨μλ₯Ό λ§λ λ€.

### **2. νλ©΄μ νμν΄μ£Όλ ν¨μ λ§λ€κΈ°**

#### λ¨μ μκ° νμ (λΆ:μ΄)

```jsx
const timerDisplay = document.querySelector('.display__time-left')

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`
  document.title = display
  timerDisplay.textContent = display
}
```

λΆ λ¨μλ μλ ₯λ°μ μκ°(μ΄)μ 60μΌλ‘ λλκ³  μμ«μ μ μμ€ κ°

μ΄ λ¨μλ μλ ₯λ°μ μκ°(μ΄)μ 60μΌλ‘ λλκ³  λ¨μ λλ¨Έμ§μ΄λ€.

μ΄ λ μ΄ λ¨μκ° 10 μλλ‘ λ΄λ €κ° κ²½μ°μλ μμ 0μ λΆνλλ‘ μ€μ νλ€.

#### νμ΄λ¨Έκ° λλλ μκ° νμ (μ:λΆ)

```jsx
const endTime = document.querySelector('.display__end-time')

function displayEndtime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const minutes = end.getMinutes()
  const adjustedHour = hour > 12 ? hour - 12 : hour
  endTime.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`
}
```

μ, λΆ κ°κ°μ λ¨μλ νμ¬ μκ°μμ μλ ₯λ°μ μκ°μ΄ μ§λ¬μ λμ μκ° κ°(then)μμ μ, λΆ κ°μ λ°μμ¨λ€.

μ΄λ μ κ°μ΄ 12λ₯Ό λμ κ²½μ° 12λ₯Ό λΉΌμ£Όμ΄ νννλ€.

λ§μ°¬κ°μ§λ‘ λΆ λ¨μκ° 10 μλλ‘ λ΄λ €κ° κ²½μ°μλ μμ 0μ λΆνλλ‘ μ€μ νλ€.

### **3. νμ΄λ¨Έ ν¨μμ νλ©΄νμ ν¨μ μΆκ°**

```jsx
function timer(seconds) {
  clearInterval(countdown)

  const now = Date.now()
  const then = now + seconds * 1000
  //νμ΄λ¨Έκ° λ°λ‘ μλνλλ‘ ν¨μλ₯Ό νλ² μ€νμμΌμ€λ€.
  displayTimeLeft(seconds)
  //νλ©΄μ λλλ μκ°μ νμ!
  displayEndtime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    //νλ©΄μ λ¨μμκ°μ νμ!
    displayTimeLeft(secondsLeft)
  }, 1000)
}
```

<br/>

### **4. λ²νΌκ³Ό μλ ₯ νΌμΌλ‘ νμ΄λ¨Έ λμμν€κΈ°**

```jsx
const buttons = document.querySelectorAll('[data-time]')

function startTimer() {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
//HTML νκ·Έ μμ±μ€μ nameμ΄ ν¬ν¨λμ΄ μμ κ²½μ° λ°λ‘ document.nameκ° μΌλ‘ λΆλ¬μ¬ μ μλ€.
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const mins = this.minutes.value
  //μλ ₯ νΌμλ λΆ λ¨μλ‘ μλ ₯νκ³  ν¨μμλ μλ ₯κ°μ 60μ κ³±ν΄ μ΄λ¨μλ‘ μλ ₯νλλ‘ νλ€.
  timer(mins * 60)
  this.reset()
})
```

λ¨Όμ  λ²νΌμ λλ₯΄λ©΄ κ° λ²νΌμ data-time κ°μ΄ timerν¨μμ μλ ₯λλλ‘ νλ€.

μλ ₯ νΌμ λΆ λ¨μμ κ°μ μλ ₯νλ©΄ μ΄λ₯Ό μ΄ λ¨μλ‘ λ°κΎΈμ΄ timerν¨μμ μλ ₯λλλ‘ νλ€.

---

## μ΅μ’ μμ± μ½λ

```jsx
let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
  clearInterval(countdown)

  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndtime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`
  document.title = display
  timerDisplay.textContent = display
}

function displayEndtime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const minutes = end.getMinutes()
  const adjustedHour = hour > 12 ? hour - 12 : hour
  endTime.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`
}

function startTimer() {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const mins = this.minutes.value
  timer(mins * 60)
  this.reset()
})
```
