---
title: '[wesbos30] 22. Following Highlight'
date: '2023.02.20, 03:00'
category: 'wesbos30'
excerpt: 'Following Highlight'
thumbnail: '/images/wesbos22-following-highlight.gif'
---

> π‘ λ©λ΄λ°μμ λ΄κ° μ νν λ©λ΄λ₯Ό νμν  λ</br>`hover`λ `classList.add` & `classList.remove`λ₯Ό ν΅ν΄ ν΄λΉ μμ μμ²΄μ CSS κ°μ μ μ©νλ λ°©μμ΄ μλ,</br>`getBoundingClientRect()`λ©μλλ₯Ό ν΅ν΄ ν΄λΉ μμμ μμΉμ ν¬κΈ°λ₯Ό κ΅¬ν ν, λ°λ‘ λ§λ€μ΄λμ λ°°κ²½μ΄ μ΄λ₯Ό λ°λΌλ€λλλ‘ νλ λ°©μμ΄λ€.

## λ‘μ§

1. λ―Έλ¦¬ HTML λ΄μ λ°°κ²½ μ­ν μ `<span>`νκ·Έ μμ± (`createElement`, `append`)
2. λͺ¨λ  `<a>`νκ·Έμ λ§μ°μ€ μ΄λ²€νΈλ‘ ν¨μ νΈμΆνλλ‘ μ€μ  (`mouseenter`)
3. μ΄λ²€νΈκ° λ°μν `<a>`νκ·Έμ λ·°ν¬νΈ κΈ°μ€ μμΉλ₯Ό κ΅¬ν¨ (`getBoundingClientRect()`)
4. μ€ν¬λ‘€λ‘ μΈν μμΉ λ³νκ°μ μλ κ³μ°νλλ‘ μμ  (`window.scrollX`, `window.scrollY`)
5. ν΄λΉ μμΉκ°μ κ·Έλλ‘ `<span>`νκ·Έμ μ μ©νμ¬ ν΄λΉ `<a>`νκ·Έμ λ°°κ²½ μ­ν μ νλλ‘ ν¨

---

## μ½λ© κ³Όμ 

### **1. λ°°κ²½ μ­ν μ νλ `<span>`νκ·Έ μμ±**

```jsx
const highlight = document.createElement('span')
//λ°°κ²½ μ­ν μ ν  μ μλλ‘ CSSκ° μ μ©λΌμλ classλ₯Ό μΆκ°
highlight.classList.add('highlight')
//μ΄λ²€νΈκ° λ°μνκΈ°μ μ μ°μ  bodyμμ λ£μ΄λ 
document.body.append(highlight)
```

#### createElement()

```jsx
const highlight = document.createElement('span')
```

HTML λ¬Έμμμ document.createElement() λ©μλλ μ§μ ν tagNameμ HTML μμλ₯Ό μμ±νλ€.

> π‘ μ΄λ λ¨μν μμλ₯Ό μμ±νμ λΏ, HTML document λ΄μ λ¬΄μμΈκ°μ append νκΈ°μ μλ κ΅¬νλμ§ μλλ€.

#### append()

```jsx
document.body.append(highlight)
```

Element.append() λ©μλλ λΆλͺ¨ μμμ μμ μμλ₯Ό μΆκ°νλ€.

μ΄λ λ¬Έμμ΄ λν μΆκ° κ°λ₯νλ©° μ¬λ¬ κ°μ μμ μμλ₯Ό νλ²μ μΆκ°ν  μλ μλ€.

> π‘ κΈ°λ³Έ widthκ°κ³Ό heightκ°μ μ€μ  μν΄μ€¬μΌλ―λ‘ λ§μ°μ€ μ΄λ²€νΈκ° μΌμ΄λκΈ°μ μλ νλ©΄μ νμ β

### **2. λͺ¨λ  `<a>`νκ·Έμ μ΄λ²€νΈλ¦¬μ€λ μ€μ **

```jsx
const triggers = document.querySelectorAll('a')
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
```

#### mouseenterμ mouseover λΉκ΅

λ λ€ κ³΅ν΅μ μΌλ‘ ν΄λΉ μμμ λ§μ°μ€κ° μ¬λΌκ°λ κ²μ κ°μ§νλ€.

λμ μ°¨μ΄μ μ

- **mouseenter** : μμ μμμ μμ­μ λ€μ΄κ°λ©΄ κ°μ§ x

β ν΄λΉ μμμμ μμ μμμ μμ­μΌλ‘ λ§μ°μ€κ° μμ§μ¬λ λ°λ‘ μ΄λ²€νΈ λ°μνμ§ μμ

- **mouseover** : μμ μμμ μμ­κΉμ§ κ°μ§ o

β λ§μ°μ€κ° ν΄λΉ μμμ μμ μμμ μμ­ κ²½κ³λ₯Ό λλλ€λλ§λ€ μ΄λ²€νΈ λ°μν¨

### **3. μ΄λ²€νΈκ° λ°μν `<a>`νκ·Έμ λ·°ν¬νΈ κΈ°μ€ μμΉ κ΅¬νκΈ°**

```jsx
function highlightLink() {
  const linkCoords = this.getBoundingClientRect()

  //κ΅¬ν λ·°ν¬νΈ κΈ°μ€ μμΉκ°μ 'highlight' spanμ μ μ©
  highlight.style.width = `${linkCoords.width}px`
  highlight.style.height = `${linkCoords.height}px`
  highlight.style.transform = `translate(${linkCoords.left}px, ${linkCoords.top}px)`
}
```

#### getBoundingClientRect()

```jsx
const linkCoords = this.getBoundingClientRect()
```

DOMRectλ₯Ό λ·°ν¬νΈ κΈ°μ€μΌλ‘ λ°νν΄μ£Όλ λ©μλμ΄λ€.

![αα²αα©αα³](https://user-images.githubusercontent.com/87363422/156433934-09a1f878-ff34-4157-886c-7f2e70957ce5.png)

![αα©α«αα©α―](https://user-images.githubusercontent.com/87363422/156433974-daf4a612-baaa-498f-9c04-221fcb40ef66.png)

> β DOMRect λ?</br>
> μμμ κ°μ’ μ’νκ°μ΄ λ€μ΄μλ κ°μ²΄μ΄λ©°,</br>
> μμλ₯Ό κ°μΈλ μ¬κ°ν ννλ‘ μ¬μ΄μ¦μ μμΉ μ λ³΄λ₯Ό λνλΈλ€.</br>
> μ΄ μ¬κ°νμ μμμ contexts, padding, borderλ₯Ό ν¬ν¨νλ€.

### **4. μ€ν¬λ‘€λ‘ μΈν μμΉ λ³ν κ³μ°**

![αα³αα³αα©α―](https://user-images.githubusercontent.com/87363422/156433946-307efefb-4ed0-4a43-8c35-af0c642f69e0.png)

getBoundingClientRect()λ₯Ό ν΅ν΄ κ΅¬ν κ°μ λ·°ν¬νΈλ₯Ό κΈ°μ€μΌλ‘ νλ μμμ μλμ’ν

β νλ©΄μ μ€ν¬λ‘€ ν  κ²½μ° μμμ μμΉκ°μ΄ λ¬λΌμ§λ€.

'highlight' spanμ κ²½μ° λ·°ν¬νΈ κΈ°μ€μΌλ‘ μ΄λνλκ² μλλΌ μ€ν¬λ‘€μ ν¬ν¨ν λ§¨ μ, λ§¨ μΌμͺ½ λΆλΆμ κΈ°μ€μΌλ‘ μ΄λ

β μ€ν¬λ‘€ ν μνμμ μ΄λν  κ²½μ° μ€ν¬λ‘€ ν λ§νΌ μμμ μμΉκ° μ΄κΈλκ² λλ€.

λ°λΌμ!

λ·°ν¬νΈ κΈ°μ€ μμΉκ°μ window.scrollX, window.scrollYλ‘ μ€ν¬λ‘€ν X, Y κ°μ κ°μ Έμμ λν΄μ£Όμ΄μΌ μ νν μμμ μμΉλ‘ 'highlight' spanμ΄ μ΄λνλ€.

```jsx
function highlightLink() {
  const linkCoords = this.getBoundingClientRect()
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    //λ·°ν¬νΈ κ°μ μ€ν¬λ‘€λ κΈΈμ΄λ₯Ό λν΄μ€λ€.
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX,
  }

  highlight.style.width = `${coords.width}px`
  highlight.style.height = `${coords.height}px`
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`
}
```

---

## μ΅μ’ μμ± μ½λ

```jsx
const triggers = document.querySelectorAll('a')
const highlight = document.createElement('span')
highlight.classList.add('highlight')
document.body.append(highlight)

function highlightLink() {
  const linkCoords = this.getBoundingClientRect()
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX,
  }
  highlight.style.width = `${coords.width}px`
  highlight.style.height = `${coords.height}px`
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
```
