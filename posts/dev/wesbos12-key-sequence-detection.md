---
title: '[wesbos30] 12. Key Sequence Detection'
date: '2023.02.19, 02:00'
category: 'wesbos30'
excerpt: '💡 특정 키들을 순서대로 입력하면 발생하는 이스터에그를 구현해보자!'
thumbnail: '/images/wesbos12-key-sequence-detection.png'
---

> 💡 특정 키들을 순서대로 입력하면 발생하는 이스터에그를 구현해보자!

## 로직

1. 키보드 입력을 감지
2. 키를 누를 때 마다 해당 키를 배열에 담기
3. 배열의 길이가 목표 키 조합의 길이보다 커지면</br>
   ⇒ 누른 키를 배열에 담는 동시에 이미 배열에 있던 키들 중 가장 먼저 담긴 키를 제거</br>
   ⇒ 배열의 길이가 목표 키 조합의 길이와 동일하게 유지됨</br>
4. 배열과 목표 키 조합이 같아지면 이스터에그 발생!

---

## 코딩 과정

### 1. 키보드 입력 감지 핸들러 생성

```jsx
window.addEventListener('keyup', e => {
  console.log(e.key)
})
```

### 2. 배열에 누른 키 담기

```jsx
const pressedArr = []

window.addEventListener('keyup', e => {
  console.log('key:', e.key)
  pressedArr.push(e.key)
  console.log('pressed key array:', pressedArr)
})
```

![콘솔로그1](https://user-images.githubusercontent.com/87363422/156253964-3cec548d-32af-499e-9c31-3521e210d483.png)

### 3. 이스터에그 발생 조건 만들기

```jsx
const pressedArr = []
const secretCode = 'sub'

window.addEventListener('keyup', e => {
  pressed.push(e.key)
  console.log(
    '배열자르기 전',
    'codeL',
    secretCode.length,
    'arrL',
    pressed.length,
  )
  pressed.splice(0, pressed.length - secretCode.length)
  if (pressed.join('').includes(secretCode)) {
    console.log('DING DING!')
    // cornify_add()는 wesbos가 넣어둔 랜덤 유니콘 이미지 추가 함수
    cornify_add()
  }
  console.log(pressed)
  console.log('배열자른 후', 'codeL', secretCode.length, 'arrL', pressed.length)
  console.log('')
})
```

우선 목표 키 조합 `secretCode`를 미리 상수로 선언해주자.

#### array.splice(start, [deleteCount], [item1], [item2], ...)

`splice()`메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다.

`start`는 배열의 변경을 시작할 인덱스로

- 배열의 길이보다 큰 값이면 배열의 길이로 설정
- 음수인 경우에는 배열의 끝에서부터 요소를 세어나감
- 음수인 값의 절대값이 배열의 길이보다 크면 0으로 설정

`deleteCount`는 배열에서 제거할 요소의 수로

- `deleteCount`를 생략하거나 값이 `array.length - start`보다 크면 `start`부터의 모든 요소를 제거
- `deleteCount`가 0 이하라면 어떤 요소도 제거X.
  이 때는 최소한 하나의 새로운 요소를 지정해야 한다.

`item1, item2, ...`는 배열에 추가할 요소로

- 아무 요소도 지정하지 않으면 `splice()`는 요소를 제거하기만 한다.

여기서 `start`는 배열 맨 앞의 키를 제거할 것이므로 0으로 두고
`deleteCount`는 배열의 길이(arrL)가 `secretCode`의 길이(codeL)보다 커졌을 때만 맨 앞 키 1개를 제거하도록
`pressedArr.length - secretCode.length`로 둔다.

![콘솔로그2](https://user-images.githubusercontent.com/87363422/156253965-be501eab-d60e-4523-962e-898704d3b6e0.png)
(arrL이 3보다 커진 순간 배열 맨앞 키를 제거해 arrL을 3으로 유지한다.)

이 후 `array.join(’’)`으로 배열의 모든 요소를 연결해 만든 하나의 문자열이 `secretCode`를 포함하면 이스터에그가 발동한다!

![이스터에그](https://user-images.githubusercontent.com/87363422/156253944-de06aa57-3ef3-47ae-ab54-39f998780424.png)

---

## 최종 완성 코드

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
