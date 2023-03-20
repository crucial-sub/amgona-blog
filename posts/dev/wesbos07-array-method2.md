---
title: '[wesbos30] 07. Array 메서드 활용 2'
date: '2023.02.18, 01:00'
category: 'wesbos30'
excerpt: 'Array 메서드를 배워보자 2탄'
thumbnail: '/images/wesbos07-array-method2.webp'
---

> 💡 Array 메서드를 배워보자 2탄

## 배워야 할 메서드 목록

1. array.some()
2. array.every()
3. array.find()
4. array.findIndex()

---

## 주어진 배열

```jsx
const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 },
]

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 },
]
```

### 1. some()

```jsx
const isAdult = people.some(person => ((new Date()).getFullYear() - person.year >= 19);
console.log(isAult);
```

some() 메서드는 배열 내에 어떤 요소라도 주어진 판별 함수를 만족하는지 검사한다.

### 2. every()

```jsx
const isEvery = people.every(
  person => new Date().getFullYear - people.year >= 19,
)
console.log({ isEvery })
```

every() 메서드는 배열 내에 모든 요소가 주어진 판별 함수를 만족하는지 검사한다.

### 3. find()

```jsx
const findID = comments.find(comment => comment.id === 823423)
console.log(findID)
```

배열 안에서 판별함수를 만족하는 첫 번째 요소값을 반환

### 4. findIndex()

```jsx
const index = comments.findIndex(comment => comment.id === 823423)

const newComments = [...comments.slice(0, index), ...comments.slice(index + 1)]
console.table(newComments)
```

배열 안에서 판별함수를 만족하는 첫 번째 요소의 index값을 반환
