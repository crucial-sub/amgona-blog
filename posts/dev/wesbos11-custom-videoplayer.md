---
title: '[wesbos30] 11. Custom Video Player'
date: '2023.02.19, 01:00'
category: 'wesbos30'
excerpt: 'π‘ λΉλμ€ νλ μ΄μ΄μ μ¬λ¬ κΈ°λ₯λ€μ μ§μ  κ΅¬νν΄λ³΄μ!'
thumbnail: '/images/wesbos11-custom-videoplayer.webp'
---

> π‘ λΉλμ€ νλ μ΄μ΄μ μ¬λ¬ κΈ°λ₯λ€μ μ§μ  κ΅¬νν΄λ³΄μ!

## λΉλμ€ νλ μ΄μ΄ κΈ°λ₯ κ΅¬ν λͺ©λ‘

1. μμ μ¬μ λ° λ©μΆ€ κΈ°λ₯
2. μμ μ€ν΅ κΈ°λ₯
3. μμ μ§νλ νμ κΈ°λ₯
4. μμ λ³Όλ₯¨ λ° μμ μλ μ‘°μ  κΈ°λ₯

---

## μ½λ© κ³Όμ 

### 1. κ° μμλ€ μμλ‘ μ μΈ

```jsx
// λΉλμ€ νλ μ΄μ΄ μ μ²΄ div
const player = document.querySelector('.player')
// λΉλμ€
const video = player.querySelector('.viewer')
// μμ μ§νλ λ° λ΄μ div
const progress = player.querySelector('.progress')
// μμ μ§νλ λ°
const progressBar = player.querySelector('.progress__filled')
// μμ μ¬μ λ²νΌ
const toggle = player.querySelector('.toggle')
// μ§μ ν μκ°λ§νΌ νλ²μ μ€ν΅ν  μ€ν΅ λ²νΌ
const skipButtons = player.querySelectorAll('[data-skip]')
// λ³Όλ₯¨ λ°μ μμμλ λ°
const ranges = player.querySelectorAll('.player__slider')
```

### 2. μ¬μ κ΄λ ¨ κΈ°λ₯ κ΅¬ν

```jsx
function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  // λ¬Έμμ΄μ λ³μλ‘ μ μΈν΄μ£ΌμμΌλ―λ‘ μ  νκΈ°λ²μ΄ μλ κ΄νΈ νκΈ°λ²μ ν΅ν΄ μμ±μ μ κ·Όνλ€!
  video[method]()
}

function updateButton() {
  const icon = this.paused ? 'βΊ' : 'β β'
  toggle.textContent = icon
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
toggle.addEventListener('click', togglePlay)
```

> π‘ attributeμ property
>
> attributeμ property λ λ€ μμ±μ μλ―Ένμ§λ§ μ μλλ κ³³μμ μ°¨μ΄κ° λ°μνλ€.</br>
> attributeλ html document/file μμμ elements μ μΆκ°μ μΈ μ λ³΄λ₯Ό λ£μ λ μ¬μ©λλ μμμ΄κ³ ,</br>
> property λ html DOM treeμμμ attribute λ₯Ό κ°λ¦¬ν€λ(νΉμ λμ νλ) ννμ΄λ€.</br></br>
> μ΄κ²μ΄ λ»νλ κ²μ attributeλ μ μ μΌλ‘ λ³νμ§ μμ§λ§,
> propertyλ DOM treeμ νΉμ±μ μλ°μ€ν¬λ¦½νΈμ μν΄ λμ μΌλ‘ κ·Έ κ°μ΄ λ³ν  μ μλ€λ κ²μ΄λ€.

`HTML <video>` μλ μ¬λ¬κ°μ§ μμ±μ΄ μ‘΄μ¬νλ€.

```jsx
** : λ³Έ μ±λ¦°μ§μμ μ¬μ©ν μμ±

**attributes**
src (string): μ¬μν  λ―Έλμ΄μ URL(κ²½λ‘ ν¬ν¨).
poster (string): λ―Έλμ΄μ νμλ  λν μ΄λ―Έμ§μ URL.
controls (boolean): μ¬μ λ²νΌκ³Ό κ°μ λΈλΌμ°μ μ κΈ°λ³Έ μ μ΄λκ΅¬ νμ. (λΈλΌμ°μ λ§λ€ κΈ°λ³Έ μ μ΄λκ΅¬κ° λ€λ¦)
width (integer): λ―Έλμ΄ νλ μ΄μ΄μ λλΉ.
height (integer): λ―Έλμ΄ νλ μ΄μ΄μ λμ΄.
autoplay (boolean): λ―Έλμ΄ μλμ¬μ.
loop (boolean): λ―Έλμ΄ λ°λ³΅ μ¬μ.
preload (boolean): νμ΄μ§λ₯Ό μ½μ λ λ―Έλμ΄λ κ°μ΄ μ½μ΄λ€μ¬ μ¬μμ μ€λΉ, `autoplay` μμ±μ΄ μ€μ λμ΄μμΌλ©΄ λ¬΄μλ¨.

**properties**
** CurrentTime (float): μ¬μ μ€μΈ λ―Έλμ΄μ νμ¬ μμΉ.
startTime (float): μ¬μ μμ μκ°. (λ―Έλμ΄κ° 0.0μμ μμλμ§ μλ κ²½μ°, μλ₯Ό λ€μ΄ μ€νΈλ¦Ό)
** duration (float): μ΄, λ―Έλμ΄ μ΄ μ¬μ κΈΈμ΄.
** paused (boolean): λ―Έλμ΄ μΌμ μ μ§ μ¬λΆ. (iosμμ  pauseμ΄λ©° μΌμμ μ§ λ²νΌ λΏλ§ μλλΌ, "Done", "μλ£" λ²νΌμ λλ₯Όλλ κ°μ μ΄λ²€νΈλ‘ μ μ©λλ€.)
ended (boolean): λ―Έλμ΄ μ’λ£ μ¬λΆ.
autobuffer (boolean): λΈλΌμ°μ κ° λ‘λ©λλ©΄ λ°λ‘ λ²νΌλ§ μμν  κ²μΈμ§ μ¬λΆ.
seeking (boolean): λ―Έλμ΄μ νΉμ  μμΉλ‘ νμ μ€μΌ λ. νμ μ μ΄κ±°λ νμμ μλ£ν νμλ ν­μ `false`.
defaultPlaybackRate (float): λ―Έλμ΄ κΈ°λ³Έ μ¬μ μλ. (κΈ°λ³Έκ°μ 1.0).
** playbackRate (float): λ―Έλμ΄ μ¬μ μλ λ°°μ. (κΈ°λ³Έκ°μ 1.0μ΄λ©° μ΄ μμ±μ μ‘°μ νλ©΄ λΉ¨λ¦¬κ°κΈ°λ μ¬λ‘μ° λͺ¨μ κΈ°λ₯ κ΅¬ν κ°λ₯)
** volume (float): λ³Όλ₯¨ ν¬κΈ°. (0.0μμ 1.0)
mute (boolean): μμκ±° μ¬λΆ
readyState (integer): video μμμ μ€λΉ μνλ₯Ό λνλ΄λ 0λΆν° 4κΉμ§μ μ μ.
networkState (integer): λ€νΈμν¬μ μνλ₯Ό λνλ΄λ 0λΆν° 3κΉμ§μ μ μ.
error (MediaError): λ―Έλμ΄ μ€λ₯. (κ°μ²΄κ° μ€λ₯ λ¬μ κ²½μ°).

**methods**
load(): λ―Έλμ΄λ₯Ό μ½μ΄λ€μ.
** play(): λ―Έλμ΄ μ¬μ.
** pause(): λ―Έλμ΄ μΌμ μ μ§.

μ°Έκ³ 
https://eyecandyzero.tistory.com/207
https://taegon.kim/archives/3058
```

### 3. μ€ν΅ κΈ°λ₯ κ΅¬ν

```jsx
function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

skipButtons.forEach(button => button.addEventListener('click', skip))
```

λ―Έλ¦¬ HTML button νκ·Έμ data-skip κ°μ μ€μ ν΄μ€ λ€
μ΄ κ° λ§νΌ λΉλμ€μ currentTime μμ±μ λ³κ²½μμΌμ€λ€.

### 4. μμ μ§νλ νμ κΈ°λ₯ κ΅¬ν

```jsx
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

video.addEventListener('timeupdate', handleProgress)

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', e => mousedown && scrub(e))
progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', () => (mousedown = false))
```

### 5. λ³Όλ₯¨ μ‘°μ  & μμμλ μ‘°μ  κΈ°λ₯ κ΅¬ν

```jsx
function handleRangeUpdate() {
  video[this.name] = this.value
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
```

λ―Έλ¦¬ HTML input νκ·Έμ κ°κ° name κ°μΌλ‘ βvolumeβκ³Ό βplaybackRateβ λ₯Ό μ€μ ν΄μ£Όμ΄ range λ°λ₯Ό μ‘°μ ν  λ λ§λ€ ν΄λΉ μμ±κ°μ λ³κ²½μμΌμ€λ€.

---

## μ΅μ’ μ½λ

```jsx
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function updateButton() {
  const icon = this.paused ? 'βΊ' : 'β β'
  console.log(icon)
  toggle.textContent = icon
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', e => mousedown && scrub(e))
progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', () => (mousedown = false))
```
