---
title: '[wesbos30] 12. Key Sequence Detection'
date: '2023.02.19, 02:00'
category: 'wesbos30'
excerpt: '๐ก ํน์  ํค๋ค์ ์์๋๋ก ์๋ ฅํ๋ฉด ๋ฐ์ํ๋ ์ด์คํฐ์๊ทธ๋ฅผ ๊ตฌํํด๋ณด์!'
thumbnail: '/images/wesbos12-key-sequence-detection.webp'
---

> ๐ก ํน์  ํค๋ค์ ์์๋๋ก ์๋ ฅํ๋ฉด ๋ฐ์ํ๋ ์ด์คํฐ์๊ทธ๋ฅผ ๊ตฌํํด๋ณด์!

## ๋ก์ง

1. ํค๋ณด๋ ์๋ ฅ์ ๊ฐ์ง
2. ํค๋ฅผ ๋๋ฅผ ๋ ๋ง๋ค ํด๋น ํค๋ฅผ ๋ฐฐ์ด์ ๋ด๊ธฐ
3. ๋ฐฐ์ด์ ๊ธธ์ด๊ฐ ๋ชฉํ ํค ์กฐํฉ์ ๊ธธ์ด๋ณด๋ค ์ปค์ง๋ฉด</br>
   โ ๋๋ฅธ ํค๋ฅผ ๋ฐฐ์ด์ ๋ด๋ ๋์์ ์ด๋ฏธ ๋ฐฐ์ด์ ์๋ ํค๋ค ์ค ๊ฐ์ฅ ๋จผ์  ๋ด๊ธด ํค๋ฅผ ์ ๊ฑฐ</br>
   โ ๋ฐฐ์ด์ ๊ธธ์ด๊ฐ ๋ชฉํ ํค ์กฐํฉ์ ๊ธธ์ด์ ๋์ผํ๊ฒ ์ ์ง๋จ</br>
4. ๋ฐฐ์ด๊ณผ ๋ชฉํ ํค ์กฐํฉ์ด ๊ฐ์์ง๋ฉด ์ด์คํฐ์๊ทธ ๋ฐ์!

---

## ์ฝ๋ฉ ๊ณผ์ 

### 1. ํค๋ณด๋ ์๋ ฅ ๊ฐ์ง ํธ๋ค๋ฌ ์์ฑ

```jsx
window.addEventListener('keyup', e => {
  console.log(e.key)
})
```

### 2. ๋ฐฐ์ด์ ๋๋ฅธ ํค ๋ด๊ธฐ

```jsx
const pressedArr = []

window.addEventListener('keyup', e => {
  console.log('key:', e.key)
  pressedArr.push(e.key)
  console.log('pressed key array:', pressedArr)
})
```

![แแฉแซแแฉแฏแแฉแแณ1](https://user-images.githubusercontent.com/87363422/156253964-3cec548d-32af-499e-9c31-3521e210d483.png)

### 3. ์ด์คํฐ์๊ทธ ๋ฐ์ ์กฐ๊ฑด ๋ง๋ค๊ธฐ

```jsx
const pressedArr = []
const secretCode = 'sub'

window.addEventListener('keyup', e => {
  pressed.push(e.key)
  console.log(
    '๋ฐฐ์ด์๋ฅด๊ธฐ ์ ',
    'codeL',
    secretCode.length,
    'arrL',
    pressed.length,
  )
  pressed.splice(0, pressed.length - secretCode.length)
  if (pressed.join('').includes(secretCode)) {
    console.log('DING DING!')
    // cornify_add()๋ wesbos๊ฐ ๋ฃ์ด๋ ๋๋ค ์ ๋์ฝ ์ด๋ฏธ์ง ์ถ๊ฐ ํจ์
    cornify_add()
  }
  console.log(pressed)
  console.log('๋ฐฐ์ด์๋ฅธ ํ', 'codeL', secretCode.length, 'arrL', pressed.length)
  console.log('')
})
```

์ฐ์  ๋ชฉํ ํค ์กฐํฉ `secretCode`๋ฅผ ๋ฏธ๋ฆฌ ์์๋ก ์ ์ธํด์ฃผ์.

#### array.splice(start, [deleteCount], [item1], [item2], ...)

`splice()`๋ฉ์๋๋ ๋ฐฐ์ด์ ๊ธฐ์กด ์์๋ฅผ ์ญ์  ๋๋ ๊ต์ฒดํ๊ฑฐ๋ ์ ์์๋ฅผ ์ถ๊ฐํ์ฌ ๋ฐฐ์ด์ ๋ด์ฉ์ ๋ณ๊ฒฝํ๋ค.

`start`๋ ๋ฐฐ์ด์ ๋ณ๊ฒฝ์ ์์ํ  ์ธ๋ฑ์ค๋ก

- ๋ฐฐ์ด์ ๊ธธ์ด๋ณด๋ค ํฐ ๊ฐ์ด๋ฉด ๋ฐฐ์ด์ ๊ธธ์ด๋ก ์ค์ 
- ์์์ธ ๊ฒฝ์ฐ์๋ ๋ฐฐ์ด์ ๋์์๋ถํฐ ์์๋ฅผ ์ธ์ด๋๊ฐ
- ์์์ธ ๊ฐ์ ์ ๋๊ฐ์ด ๋ฐฐ์ด์ ๊ธธ์ด๋ณด๋ค ํฌ๋ฉด 0์ผ๋ก ์ค์ 

`deleteCount`๋ ๋ฐฐ์ด์์ ์ ๊ฑฐํ  ์์์ ์๋ก

- `deleteCount`๋ฅผ ์๋ตํ๊ฑฐ๋ ๊ฐ์ดย `array.length - start`๋ณด๋ค ํฌ๋ฉดย `start`๋ถํฐ์ ๋ชจ๋  ์์๋ฅผ ์ ๊ฑฐ
- `deleteCount`๊ฐ 0 ์ดํ๋ผ๋ฉด ์ด๋ค ์์๋ ์ ๊ฑฐX.
  ์ด ๋๋ ์ต์ํ ํ๋์ ์๋ก์ด ์์๋ฅผ ์ง์ ํด์ผ ํ๋ค.

`item1, item2, ...`๋ ๋ฐฐ์ด์ ์ถ๊ฐํ  ์์๋ก

- ์๋ฌด ์์๋ ์ง์ ํ์ง ์์ผ๋ฉด `splice()`๋ ์์๋ฅผ ์ ๊ฑฐํ๊ธฐ๋ง ํ๋ค.

์ฌ๊ธฐ์ `start`๋ ๋ฐฐ์ด ๋งจ ์์ ํค๋ฅผ ์ ๊ฑฐํ  ๊ฒ์ด๋ฏ๋ก 0์ผ๋ก ๋๊ณ 
`deleteCount`๋ ๋ฐฐ์ด์ ๊ธธ์ด(arrL)๊ฐ `secretCode`์ ๊ธธ์ด(codeL)๋ณด๋ค ์ปค์ก์ ๋๋ง ๋งจ ์ ํค 1๊ฐ๋ฅผ ์ ๊ฑฐํ๋๋ก
`pressedArr.length - secretCode.length`๋ก ๋๋ค.

![แแฉแซแแฉแฏแแฉแแณ2](https://user-images.githubusercontent.com/87363422/156253965-be501eab-d60e-4523-962e-898704d3b6e0.png)
(arrL์ด 3๋ณด๋ค ์ปค์ง ์๊ฐ ๋ฐฐ์ด ๋งจ์ ํค๋ฅผ ์ ๊ฑฐํด arrL์ 3์ผ๋ก ์ ์งํ๋ค.)

์ด ํ `array.join(โโ)`์ผ๋ก ๋ฐฐ์ด์ ๋ชจ๋  ์์๋ฅผ ์ฐ๊ฒฐํด ๋ง๋  ํ๋์ ๋ฌธ์์ด์ด `secretCode`๋ฅผ ํฌํจํ๋ฉด ์ด์คํฐ์๊ทธ๊ฐ ๋ฐ๋ํ๋ค!

![แแตแแณแแฅแแฆแแณ](https://user-images.githubusercontent.com/87363422/156253944-de06aa57-3ef3-47ae-ab54-39f998780424.png)

---

## ์ต์ข ์์ฑ ์ฝ๋

```jsx
const pressed = []
const secretCode = 'crusub'

window.addEventListener('keyup', e => {
  pressed.push(e.key)
  pressed.splice(0, pressed.length - secretCode.length)
  if (pressed.join('').includes(secretCode)) {
    console.log('DING DING!')
    cornify_add()
  }
})
```
