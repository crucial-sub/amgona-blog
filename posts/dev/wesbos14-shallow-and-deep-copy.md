---
title: '[wesbos30] 14. 배열&객체의 복사와 참조'
date: '2023.02.20, 01:00'
category: 'wesbos30'
excerpt: '💡 참조(reference)와 복사(copy)의 차이점에 대해 알아보자!'
thumbnail: '/images/wesbos14-shallow-and-deep-copy.webp'
---

> 💡 참조(reference)와 복사(copy)의 차이점에 대해 알아보자!

### **1. 배열(Array)의 복사**

```jsx
const players = ['wes', 'sarah', 'ryan', 'poppy']

const team = players

console.log(players, team)
//players와 team이 똑같이 출력됨

team[3] = 'lux'
//team 뿐만 아니라 players까지 변경됨
```

team은 배열이 아니라 team이라는 변수로 players라는 배열에 접근하는 것이다. 이는 복사가 아니라 참조라고 부른다. 따라서 team과 players는 독립적이지 않으며, team으로 만든 변화들은 players에도 적용된다.

원조 배열에 영향을 미치지 않으려면 참조가 아니라 복사를 해야하며, 배열의 복사는 다음과 같은 방법을 사용할 수 있다.

```jsx
const team2 = players.slice()
const team3 = [].concat(players)
const team4 = [...players]
const team5 = Array.from(players)
```

wesbos가 가장 좋아하는 방식은 3, 4번이라고 하며 3번은 ES6의 전개구문을 활용하였다.

### **2. 객체(Object)의 복사**

```jsx
const person = {
  name: 'wes bos',
  age: 80,
}

const cap = person
```

객체에서도 마찬가지이다. `cap`은 객체가 아니라, 객체 `person`을 참조하는 것이다.

객체를 복사하는 방법은 다음과 같은 방법들이 있다.

```jsx
const cap2 = Object.assign({}, person)
//복사와 동시에 추가까지 가능
const cap3 = Object.assign({}, person, { 추가Key: 추가Value })
const cap4 = { ...person }
```

### **3. 주의할 점**

#### Object.assign에 여러 객체를 추가할 경우

Object.assign에는 여러개의 객체를 전달할 수 있다.

이때 뒷 배열의 key가 앞의 배열의 key로 이미 있다면 뒷 배열의 value로 덮어쓰기 한다.

```jsx
const person = {
  name: 'wes bos',
}

const worker = {
  name: 'some',
  age: 20,
}

const mixed = Object.assign({}, person, worker)

console.log(mixed.name) // some 출력됨
console.log(mixed.age) // 20 출력됨
```

#### Object.assign은 오직 한 레벨만 복사한다.

```jsx
const wes = {
  name: 'wes',
  age: '90',
  social: {
    twitter: 'a',
    facebook: 'b',
  },
}

const copy = Object.assign({}, wes)
```

copy를 가지고 name, age를 변경할 수 있고 이때 오리지널 객체인 wes에는 영향을 주지 않는다.

그러나 만약 copy.social.twitter = 'c'; 라고 업데이트하면 copy.social.twitter 뿐만 아니라 wes.social.twitter의 value까지 업데이트가 된다.

그 이유는 Object.assign은 2레벨인 social까지는 복사하지 않기 때문이다.

이 때에는 다음과 같이 JSON을 사용하여 한 레벨 이상을 복사할 수 있는데 wesbos는 그닥 추천하지 않는 방법이라고 한다.

```jsx
const copy2 = JSON.parse(JSON.stringify(wes))
```
