---
title: '[wesbos30] 17. Sort Without Articles'
date: '2023.02.20, 02:00'
category: 'wesbos30'
excerpt: 'π‘ μ£Όμ΄μ§ λ°°μ΄μ κ΄μ¬(A, An, The)λ₯Ό μ μΈν μνλ²³ μμΌλ‘ μ λ ¬ν΄λ³΄μ!'
thumbnail: '/images/wesbos17-sort-without-articles.webp'
---

> π‘ μ£Όμ΄μ§ λ°°μ΄μ κ΄μ¬(A, An, The)λ₯Ό μ μΈν μνλ²³ μμΌλ‘ μ λ ¬ν΄λ³΄μ!

## λ‘μ§

1. κ΄μ¬λ₯Ό μ κ±°νμ±λ‘ λ°νν΄μ£Όλ ν¨μ μμ±
2. κ΄μ¬λ₯Ό μ κ±°ν μμλ€μ `sort()`λ‘ μνλ²³ μμΌλ‘ μ λ ¬
3. μ λ ¬λ μμλ€μ νλ©΄μ λνλ΄κΈ°

---

## μ½λ© κ³Όμ 

### **1. κ΄μ¬ μ κ±° ν¨μ μμ±**

```jsx
function strip(bandName) {
  return bandName.replace(/^(a |the |an )/i, '').trim()
}
```

replace() λ©μλλ‘ κ΄μ¬λ₯Ό κ³΅λ°±μΌλ‘ λ°κΎΌ λ€ trim()λ©μλλ‘ μ’μ° κ³΅λ°±μ μ κ±°νλ€.

### **2. sort()λ‘ μ λ ¬**

```jsx
const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog',
]

const sortedBands = bands.sort((a, b) => (strip(a) > strip(b) ? 1 : -1))
```

strip()μΌλ‘ κ΄μ¬λ₯Ό μ κ±°ν μ±λ‘ λ°νλ μμλ€μ sort() λ©μλλ‘ μνλ²³ μμΌλ‘ μ λ ¬νλ€.

### **3. νλ©΄μ λνλ΄κΈ°**

```jsx
document.querySelector('#bands').innerHTML = sortedBands
  .map(band => `<li>${band}</li>`)
  .join('')
```

μ λ ¬λ μμλ€μ κ°κ° `<li>`λ‘ λ§€ννμ¬ νλ©΄μ λνλΈλ€

## μ΅μ’ μμ± μ½λ

```jsx
const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog',
]

function strip(bandName) {
  return bandName.replace(/^(a |the |an )/i, '').trim()
}

const sortedBands = bands.sort((a, b) => (strip(a) > strip(b) ? 1 : -1))

document.querySelector('#bands').innerHTML = sortedBands
  .map(band => `<li>${band}</li>`)
  .join('')
```
