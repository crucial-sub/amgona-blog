---
title: '[wesbos30] 27. Click And Drag'
date: '2023.02.22, 01:00'
category: 'wesbos30'
excerpt: '💡 마우스를 클릭 후 드래그하면 이미지가 좌우로 부드럽게 슬라이드하는 기능을 구현해보자!'
thumbnail: '/images/wesbos27-click-and-drag.png'
---

> 💡 마우스를 클릭 후 드래그하면 이미지가 좌우로 부드럽게 슬라이드하는 기능을 구현해보자!

## 로직

1. 마우스 이벤트에 제한을 걸기위한 변수(`isDown`) 선언
2. 위의 변수를 이용하여 여러 마우스이벤트 중에서 마우스가 눌려있는 중에만 mousemove 함수가 실행되도록 설정 (`mousedown`, `mouseleave`, `mouseup`, `mousemove`)
3. 마우스가 눌린 순간 눌린 곳의 x좌표와 얼마나 스크롤 돼있는지 계산 (`e.pageX`, `offsetLeft`, `scrollLeft`)
4. 마우스를 드래그하면 처음 눌린 곳의 x좌표에서 얼마나 이동하는지 계산 후 그 만큼 이미지를 스크롤

---

## 코딩 과정

### **1. 변수 선언**

```jsx
const slider = document.querySelector('.items')
let isDown = false
```

`isDown`은 특정 이벤트 발생 중에만 원하는 함수가 실행되도록 제어하기위한 변수이다.

### **2. 마우스이벤트 설정**

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

> 💡 설정할 마우스이벤트는 mousedown, mouseleave, mouseup, mousemove 4가지 이다.

우리가 구현하고자 하는 것은 이미지를 "클릭"하고 "드래그"했을 때 이미지가 움직이는 것이다. 따라서 마우스가 눌렸다가 떼지거나 이미지 밖으로 나가면 함수가 실행되지 않아야한다.

1. 먼저 변수 `isDown`값이 false면 mousemove 함수가 실행되지 않도록 한다.

```jsx
slider.addEventListener('mousemove', () => {
  if (!isDown) return
  //함수가 작동하는지 확인하기 위해 콘솔을 찍어본다.
  console.log('im working!')
})
```

⇒ 처음 변수를 선언할 때 값을 false로 할당해놓았으므로 기본적으로는 실행x

2.  마우스가 눌렸을 때(`mousedown`) `isDown`값을 true로 할당,
    이미지를 클릭한 것을 표시하기 위해 class를 추가하여 CSS효과 적용

```jsx
slider.addEventListener('mousedown', () => {
  isDown = true
  slider.classList.add('active');
}
```

⇒ 마우스를 움직이면 mousemove 함수 실행!

3. 마우스가 움직이는 도중에 이미지를 벗어날 때(`mouseleave`) `isDown`값을 다시 false로 할당
   이미지 범위를 벗어난 것을 표시하기 위해 class를 제거하여 CSS효과 삭제

```jsx
slider.addEventListener('mouseleave', () => {
  isDown = false
  slider.classList.remove('active')
})
```

⇒ 마우스를 움직여도 mousemove 함수 실행 x!

4. 마우스가 떼지면(`mouseup`) `isDown`값을 다시 false로 할당
   이미지 클릭이 끝난 것을 표시하기 위해 class를 제거하여 CSS효과 삭제

```jsx
slider.addEventListener('mouseup', () => {
  isDown = false
  slider.classList.remove('active')
})
```

⇒ 마우스를 움직여도 mousemove 함수 실행 x!

### **3. 누른 곳의 위치 계산**

```jsx
slider.addEventListener('mousedown', e => {
  isDown = true
  slider.classList.add('active')
  startX = e.pageX - slider.offsetLeft
  scrollLeftt = slider.scrollLeft
  //콘솔을 찍어서 확인해보자!
  console.table({ startX, scrollLeftt })
})
```

#### e.pageX

```jsx
startX = e.pageX - slider.offsetLeft
```

브라우저 상에서 현재 마우스 커서의 위치를 구하기 위해 event object의 속성인 pageX, pageY를 사용한다.

e.pageX는 문서의 왼쪽상단을 기준으로 마우스 위치의 X좌표 값,
e.pageY는 문서의 왼쪽상단을 기준으로 마우스 위치의 Y좌표 값을 나타낸다.

> ❓ 만약 이미지와 페이지 사이에 여백이 있다면??

우리가 구하고자 하는 것은 페이지 내에서 어디를 클릭했냐가 아닌</br>
이미지의 내부에서 어디를 클릭했는지이다.</br>
만약 이미지 시작점이 페이지 왼쪽끝에서 떨어져 있을 경우</br>

```
ex) 이미지 width값이 100vw 아래; margin 존재; 이미지 옆에 다른 element 추가
```

e.pageX 만으로는 이미지 내부에서의 위치를 확인할 수 없다.</br>

따라서 페이지와 이미지 사이의 여백(`offsetLeft`)을 빼주어 이미지 내부에서의 위치를 계산한다!

#### scrollLeft

```jsx
scrollLeftt = slider.scrollLeft
```

요소가 컨텐츠의 왼쪽끝에서부터 얼마나 스크롤 되있는지를 알려준다.

startX와 scrollLeftt를 설정했으니 스크롤해서 console에 찍어보자!

![콘솔1](https://user-images.githubusercontent.com/87363422/156443248-51059c79-f204-4f58-9b0a-da038baf987c.png)

스크롤하기 전 03번 이미지를 클릭했을 때의 startX, scrollLeftt 값

![콘솔2](https://user-images.githubusercontent.com/87363422/156443279-2ba85905-a4ea-46d7-880d-11a02155355f.png)

스크롤하여 20번 이미지를 클릭했을 때의 startX, scrollLeftt 값

### **4. 이미지 스크롤**

```jsx
slider.addEventListener('mousemove', e => {
  if (!isDown) return
  //드래그 중 텍스트를 선택하는 것을 방지!!
  e.preventDefault()
  const x = e.pageX - slider.offsetLeft
  // 보다 매끄럽게 움직이도록 3을 곱해줌
  const walk = (x - startX) * 3
  slider.scrollLeft = scrollLeftt - walk
})
```

드래그 했을 때의 마우스 위치에서 처음 마우스를 누른 곳의 위치를 빼면 마우스가 얼만큼 이동했는지를 구할 수 있다. (이 때 그 값은 음수이다.)

이제 이미지의 scrollLeft값을 마우스가 이동한 만큼으로 설정하면
드래그한 만큼 이미지 슬라이드 된다.

> ❗ 이때 그냥 slider.scrollLeft = - walk 로</br>
> 설정할 경우 이전의 스크롤 값을 기억하지 못하기 때문에</br>
> 드래그 할 때마다 매번 컨텐츠 시작점부터 스크롤을 하게된다.</br>
> 따라서 mousedown 이벤트에서 설정한 변수인 scrollLeftt를 더해줘서</br>
> 이전 스크롤 값을 불러오면 끊기지않고 매끄럽게 드래그된다!

---

## 최종 완성 코드

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
