---
title: '[wesbos30] 27. Click And Drag'
date: '2023.02.22, 01:00'
category: 'wesbos30'
excerpt: 'π‘ λ§μ°μ€λ₯Ό ν΄λ¦­ ν λλκ·Ένλ©΄ μ΄λ―Έμ§κ° μ’μ°λ‘ λΆλλ½κ² μ¬λΌμ΄λνλ κΈ°λ₯μ κ΅¬νν΄λ³΄μ!'
thumbnail: '/images/wesbos27-click-and-drag.webp'
---

> π‘ λ§μ°μ€λ₯Ό ν΄λ¦­ ν λλκ·Ένλ©΄ μ΄λ―Έμ§κ° μ’μ°λ‘ λΆλλ½κ² μ¬λΌμ΄λνλ κΈ°λ₯μ κ΅¬νν΄λ³΄μ!

## λ‘μ§

1. λ§μ°μ€ μ΄λ²€νΈμ μ νμ κ±ΈκΈ°μν λ³μ(`isDown`) μ μΈ
2. μμ λ³μλ₯Ό μ΄μ©νμ¬ μ¬λ¬ λ§μ°μ€μ΄λ²€νΈ μ€μμ λ§μ°μ€κ° λλ €μλ μ€μλ§ mousemove ν¨μκ° μ€νλλλ‘ μ€μ  (`mousedown`, `mouseleave`, `mouseup`, `mousemove`)
3. λ§μ°μ€κ° λλ¦° μκ° λλ¦° κ³³μ xμ’νμ μΌλ§λ μ€ν¬λ‘€ λΌμλμ§ κ³μ° (`e.pageX`, `offsetLeft`, `scrollLeft`)
4. λ§μ°μ€λ₯Ό λλκ·Ένλ©΄ μ²μ λλ¦° κ³³μ xμ’νμμ μΌλ§λ μ΄λνλμ§ κ³μ° ν κ·Έ λ§νΌ μ΄λ―Έμ§λ₯Ό μ€ν¬λ‘€

---

## μ½λ© κ³Όμ 

### **1. λ³μ μ μΈ**

```jsx
const slider = document.querySelector('.items')
let isDown = false
```

`isDown`μ νΉμ  μ΄λ²€νΈ λ°μ μ€μλ§ μνλ ν¨μκ° μ€νλλλ‘ μ μ΄νκΈ°μν λ³μμ΄λ€.

### **2. λ§μ°μ€μ΄λ²€νΈ μ€μ **

```jsx
slider.addEventListener('mousedown', () => {
  isDown = true
  slider.classList.add('active')
})
slider.addEventListener('mouseleave', () => {
  isDown = false
  slider.classList.remove('active')
})
slider.addEventListener('mouseup', () => {
  isDown = false
  slider.classList.remove('active')
})
slider.addEventListener('mousemove', () => {
  if (!isDown) return
})
```

> π‘ μ€μ ν  λ§μ°μ€μ΄λ²€νΈλ mousedown, mouseleave, mouseup, mousemove 4κ°μ§ μ΄λ€.

μ°λ¦¬κ° κ΅¬ννκ³ μ νλ κ²μ μ΄λ―Έμ§λ₯Ό "ν΄λ¦­"νκ³  "λλκ·Έ"νμ λ μ΄λ―Έμ§κ° μμ§μ΄λ κ²μ΄λ€. λ°λΌμ λ§μ°μ€κ° λλ Έλ€κ° λΌμ§κ±°λ μ΄λ―Έμ§ λ°μΌλ‘ λκ°λ©΄ ν¨μκ° μ€νλμ§ μμμΌνλ€.

1. λ¨Όμ  λ³μ `isDown`κ°μ΄ falseλ©΄ mousemove ν¨μκ° μ€νλμ§ μλλ‘ νλ€.

```jsx
slider.addEventListener('mousemove', () => {
  if (!isDown) return
  //ν¨μκ° μλνλμ§ νμΈνκΈ° μν΄ μ½μμ μ°μ΄λ³Έλ€.
  console.log('im working!')
})
```

β μ²μ λ³μλ₯Ό μ μΈν  λ κ°μ falseλ‘ ν λΉν΄λμμΌλ―λ‘ κΈ°λ³Έμ μΌλ‘λ μ€νx

2.  λ§μ°μ€κ° λλ Έμ λ(`mousedown`) `isDown`κ°μ trueλ‘ ν λΉ,
    μ΄λ―Έμ§λ₯Ό ν΄λ¦­ν κ²μ νμνκΈ° μν΄ classλ₯Ό μΆκ°νμ¬ CSSν¨κ³Ό μ μ©

```jsx
slider.addEventListener('mousedown', () => {
  isDown = true
  slider.classList.add('active');
}
```

β λ§μ°μ€λ₯Ό μμ§μ΄λ©΄ mousemove ν¨μ μ€ν!

3. λ§μ°μ€κ° μμ§μ΄λ λμ€μ μ΄λ―Έμ§λ₯Ό λ²μ΄λ  λ(`mouseleave`) `isDown`κ°μ λ€μ falseλ‘ ν λΉ
   μ΄λ―Έμ§ λ²μλ₯Ό λ²μ΄λ κ²μ νμνκΈ° μν΄ classλ₯Ό μ κ±°νμ¬ CSSν¨κ³Ό μ­μ 

```jsx
slider.addEventListener('mouseleave', () => {
  isDown = false
  slider.classList.remove('active')
})
```

β λ§μ°μ€λ₯Ό μμ§μ¬λ mousemove ν¨μ μ€ν x!

4. λ§μ°μ€κ° λΌμ§λ©΄(`mouseup`) `isDown`κ°μ λ€μ falseλ‘ ν λΉ
   μ΄λ―Έμ§ ν΄λ¦­μ΄ λλ κ²μ νμνκΈ° μν΄ classλ₯Ό μ κ±°νμ¬ CSSν¨κ³Ό μ­μ 

```jsx
slider.addEventListener('mouseup', () => {
  isDown = false
  slider.classList.remove('active')
})
```

β λ§μ°μ€λ₯Ό μμ§μ¬λ mousemove ν¨μ μ€ν x!

### **3. λλ₯Έ κ³³μ μμΉ κ³μ°**

```jsx
slider.addEventListener('mousedown', e => {
  isDown = true
  slider.classList.add('active')
  startX = e.pageX - slider.offsetLeft
  scrollLeftt = slider.scrollLeft
  //μ½μμ μ°μ΄μ νμΈν΄λ³΄μ!
  console.table({ startX, scrollLeftt })
})
```

#### e.pageX

```jsx
startX = e.pageX - slider.offsetLeft
```

λΈλΌμ°μ  μμμ νμ¬ λ§μ°μ€ μ»€μμ μμΉλ₯Ό κ΅¬νκΈ° μν΄ event objectμ μμ±μΈ pageX, pageYλ₯Ό μ¬μ©νλ€.

e.pageXλ λ¬Έμμ μΌμͺ½μλ¨μ κΈ°μ€μΌλ‘ λ§μ°μ€ μμΉμ Xμ’ν κ°,
e.pageYλ λ¬Έμμ μΌμͺ½μλ¨μ κΈ°μ€μΌλ‘ λ§μ°μ€ μμΉμ Yμ’ν κ°μ λνλΈλ€.

> β λ§μ½ μ΄λ―Έμ§μ νμ΄μ§ μ¬μ΄μ μ¬λ°±μ΄ μλ€λ©΄??

μ°λ¦¬κ° κ΅¬νκ³ μ νλ κ²μ νμ΄μ§ λ΄μμ μ΄λλ₯Ό ν΄λ¦­νλκ° μλ</br>
μ΄λ―Έμ§μ λ΄λΆμμ μ΄λλ₯Ό ν΄λ¦­νλμ§μ΄λ€.</br>
λ§μ½ μ΄λ―Έμ§ μμμ μ΄ νμ΄μ§ μΌμͺ½λμμ λ¨μ΄μ Έ μμ κ²½μ°</br>

```
ex) μ΄λ―Έμ§ widthκ°μ΄ 100vw μλ; margin μ‘΄μ¬; μ΄λ―Έμ§ μμ λ€λ₯Έ element μΆκ°
```

e.pageX λ§μΌλ‘λ μ΄λ―Έμ§ λ΄λΆμμμ μμΉλ₯Ό νμΈν  μ μλ€.</br>

λ°λΌμ νμ΄μ§μ μ΄λ―Έμ§ μ¬μ΄μ μ¬λ°±(`offsetLeft`)μ λΉΌμ£Όμ΄ μ΄λ―Έμ§ λ΄λΆμμμ μμΉλ₯Ό κ³μ°νλ€!

#### scrollLeft

```jsx
scrollLeftt = slider.scrollLeft
```

μμκ° μ»¨νμΈ μ μΌμͺ½λμμλΆν° μΌλ§λ μ€ν¬λ‘€ λμλμ§λ₯Ό μλ €μ€λ€.

startXμ scrollLefttλ₯Ό μ€μ νμΌλ μ€ν¬λ‘€ν΄μ consoleμ μ°μ΄λ³΄μ!

![αα©α«αα©α―1](https://user-images.githubusercontent.com/87363422/156443248-51059c79-f204-4f58-9b0a-da038baf987c.png)

μ€ν¬λ‘€νκΈ° μ  03λ² μ΄λ―Έμ§λ₯Ό ν΄λ¦­νμ λμ startX, scrollLeftt κ°

![αα©α«αα©α―2](https://user-images.githubusercontent.com/87363422/156443279-2ba85905-a4ea-46d7-880d-11a02155355f.png)

μ€ν¬λ‘€νμ¬ 20λ² μ΄λ―Έμ§λ₯Ό ν΄λ¦­νμ λμ startX, scrollLeftt κ°

### **4. μ΄λ―Έμ§ μ€ν¬λ‘€**

```jsx
slider.addEventListener('mousemove', e => {
  if (!isDown) return
  //λλκ·Έ μ€ νμ€νΈλ₯Ό μ ννλ κ²μ λ°©μ§!!
  e.preventDefault()
  const x = e.pageX - slider.offsetLeft
  // λ³΄λ€ λ§€λλ½κ² μμ§μ΄λλ‘ 3μ κ³±ν΄μ€
  const walk = (x - startX) * 3
  slider.scrollLeft = scrollLeftt - walk
})
```

λλκ·Έ νμ λμ λ§μ°μ€ μμΉμμ μ²μ λ§μ°μ€λ₯Ό λλ₯Έ κ³³μ μμΉλ₯Ό λΉΌλ©΄ λ§μ°μ€κ° μΌλ§νΌ μ΄λνλμ§λ₯Ό κ΅¬ν  μ μλ€. (μ΄ λ κ·Έ κ°μ μμμ΄λ€.)

μ΄μ  μ΄λ―Έμ§μ scrollLeftκ°μ λ§μ°μ€κ° μ΄λν λ§νΌμΌλ‘ μ€μ νλ©΄
λλκ·Έν λ§νΌ μ΄λ―Έμ§ μ¬λΌμ΄λ λλ€.

> β μ΄λ κ·Έλ₯ slider.scrollLeft = - walk λ‘</br>
> μ€μ ν  κ²½μ° μ΄μ μ μ€ν¬λ‘€ κ°μ κΈ°μ΅νμ§ λͺ»νκΈ° λλ¬Έμ</br>
> λλκ·Έ ν  λλ§λ€ λ§€λ² μ»¨νμΈ  μμμ λΆν° μ€ν¬λ‘€μ νκ²λλ€.</br>
> λ°λΌμ mousedown μ΄λ²€νΈμμ μ€μ ν λ³μμΈ scrollLefttλ₯Ό λν΄μ€μ</br>
> μ΄μ  μ€ν¬λ‘€ κ°μ λΆλ¬μ€λ©΄ λκΈ°μ§μκ³  λ§€λλ½κ² λλκ·Έλλ€!

---

## μ΅μ’ μμ± μ½λ

```jsx
const slider = document.querySelector('.items')
let isDown = false
let startX
let scrollLeftt

slider.addEventListener('mousedown', e => {
  isDown = true
  slider.classList.add('active')
  startX = e.pageX - slider.offsetLeft
  scrollLeftt = slider.scrollLeft
})
slider.addEventListener('mouseleave', () => {
  isDown = false
  slider.classList.remove('active')
})
slider.addEventListener('mouseup', () => {
  isDown = false
  slider.classList.remove('active')
})
slider.addEventListener('mousemove', e => {
  if (!isDown) return
  e.preventDefault()
  const x = e.pageX - slider.offsetLeft
  const walk = (x - startX) * 3
  slider.scrollLeft = scrollLeftt - walk
})
```
