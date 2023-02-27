---
title: '[wesbos30] 09. 개발자 도구 활용'
date: '2023.02.18, 02:00'
category: 'wesbos30'
excerpt: '크롬 개발자 도구의 기능 중에서 개발자에게 유용한 여러 console 메서드에 대해 알아보자!'
thumbnail: '/images/wesbos09-development-tools.png'
---

> 💡 크롬 개발자 도구의 기능 중에서 개발자에게 유용한 여러 console 메서드에 대해 알아보자!

---

### Regular

```jsx
console.log('hello')
// hello
```

### Interpolated(문자열 보간)

두 번째 인수가 %s 자리에 들어간다.

```jsx
console.log('Hello I am a %s string', '💩')
console.log(`Hello I am a ${'💩'} string`)

// 둘 다 Hello I am a 💩 string!
```

### Styled

콘솔에 CSS 스타일을 적용시킬 수 있다.

```jsx
console.log(
  '%c I am some great text',
  'font-size:50px; background:red; text-shadow: 10px 10px 0 blue',
)
```

![styled](https://user-images.githubusercontent.com/87363422/156248562-934bb5e1-80e2-4905-bffd-b82b33d0a64f.png)

### warning

```jsx
console.warn('OH NOOO')
```

![warn](https://user-images.githubusercontent.com/87363422/156248566-bfcf69bf-adf7-4f99-bf21-df84e0933c06.png)

### error

```jsx
console.error('Shit!')
```

![error](https://user-images.githubusercontent.com/87363422/156248560-5a122ef6-88cb-452d-9aef-21479cee420a.png)

### Testing

주어진 가정이 거짓인 경우 콘솔에 오류 메시지를 출력한다. (참일 경우 아무것도 하지 않는다.)

```jsx
console.assert(1 === 2, "That's Wrong!")
```

![assert](https://user-images.githubusercontent.com/87363422/156248556-6463b0fa-665c-49e2-9c2b-61fc204d0597.png)

### Cleaning

콘솔창 클리어

```jsx
console.clear()
```

### Grouping Together

```jsx
const dogs = [
  { name: 'Snickers', age: 2 },
  { name: 'hugo', age: 8 },
]

dogs.forEach(dog => {
  console.groupCollapsed(`${dog.name}`)
  console.log(`This is ${dog.name}`)
  console.log(`${dog.name} is ${dog.age} years old`)
  console.log(`${dog.name} is ${dog.age * 7} dog years old`)
  console.groupEnd(`${dog.name}`)
})
```

![group](https://user-images.githubusercontent.com/87363422/156248561-55ef0e21-db9f-4f89-a952-0d12c56f09c6.png)

### count

```jsx
console.count('Park')
console.count('Park')
console.count('Jungsub')
console.count('Jungsub')
console.count('Park')
console.count('Jungsub')
console.count('Jungsub')
console.count('Park')
console.count('Jungsub')
console.count('Jungsub')
```

![count](https://user-images.githubusercontent.com/87363422/156248557-37152c43-8b72-4539-ad8d-472fe7dc73c1.png)

### time

특정 작업의 소요시간을 측정할 때 사용한다.
console.time(’타이머 이름’) 메서드를 호출하면 타이머가 시작되고,
console.timeEnd(’타이머 이름’) 메서드를 호출하면 타이머를 멈추고 지난 시간을 출력한다.

```jsx
console.time('answer time')
alert('first')
console.timeLog('answer time')
alert('second')
console.timeEnd('answer time')
```

console.time(’answer time’) 메서드를 호출하면 answer time 타이머를 시작시킨 후, 첫 번쨰 경고 상자 띄움

- **⇒ 첫 번째 경고 상자를 닫으면**

console.timeLog("answer time")가 사용자가 첫 번째 경고 상자를 닫는데 걸린 시간을 기록한 후 출력

- **⇒ 두 번째 경고 상자를 닫으면**

console.timeEnd("answer time")가 answer time 타이머를 종료시킨 후, 총 걸린 시간을 출력

![time](https://user-images.githubusercontent.com/87363422/156248564-58c2e99c-217c-430e-b7a8-2107c57de4e9.png)
