---
title: '[wesbos30] 25. 이벤트 캡쳐와 버블링'
date: '2023.02.21, 02:00'
category: 'wesbos30'
excerpt: '스크롤을 내려도 페이지 밖으로 사라지지않고 상단에 고정되어 있는 네비게이션 바를 구현해보자!'
thumbnail: '/images/wesbos25-capturing-and-bubbling.webp'
---

> 💡 어떤 요소에서 이벤트가 발생했을 때 이벤트 전파 방향에 따라 구분되는 버블링과 캡쳐링에 대해 알아보자

---

## 1. 버블링

```html
<div class="one">
  <div class="two">
    <div class="three"></div>
  </div>
</div>
```

```jsx
const divs = document.querySelectorAll('div');

function logText() {
	consoloe.log(this.classList.value);
}
// 모든 div 각각에 click 이벤트 핸들러를 할당해준다!
divs.forEach(div => div.addEventListener('click', logText);
```

![버블링1](https://user-images.githubusercontent.com/87363422/156437391-9a33818d-b5de-42dd-b723-5da91b9deece.png)

### 버블링의 원리

한 요소에 이벤트가 발생하면 이 요소에 할당된 핸들러가 동작하고 이어서 부모 요소의 핸들러가 동작한다. 가장 최상단의 조상 요소를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작한다.

![버블링2](https://user-images.githubusercontent.com/87363422/156437396-1a99d21d-8b59-4dd7-94a0-a6e5b76e815d.png)

위의 HTML과 JavaScript 코드대로 작성 후

가장 안쪽의 `<div>`를 클릭하면 순서대로 다음과 같은 일이 벌어진다.

1. 가장 안쪽 `<div>`에 할당된 이벤트 핸들러가 동작한다.
   ⇒ class 이름 'three'가 console에 찍힌다.
2. 바깥의 `<div>`에 할당된 이벤트 핸들러가 동작한다.
   ⇒ class 이름 'two'가 console에 찍힌다.
3. 그 바깥의 `<div>`의 할당된 이벤트 핸들러가 동작한다.
   ⇒ class 이름 'one'이 console에 찍힌다.
4. `Document`에 도달할 때까지 각 요소에 할당된 이벤트 핸들러가 동작한다.

![버블링 콘솔](https://user-images.githubusercontent.com/87363422/156437384-64191d95-a506-445f-8aa4-200064dad5ed.png)

이러한 동작 방식 때문에 가장 안쪽의 `<div>`요소를 클릭하면
console에 three → two → one 순서로 찍히는 것을 확인할 수 있다.

## 2. 캡쳐링

```jsx
const divs = document.querySelectorAll('div');

function logText() {
	consoloe.log(this.classList.value);
}

divs.forEach(div => div.addEventListener('click', logText, {
	capture: true; //default는 capture: false로 설정되어있다. capture를 생략하고 true만 써도 캡쳐링 단계에서 동작한다.
});
```

![캡쳐링1](https://user-images.githubusercontent.com/87363422/156437409-39a59512-5f11-43e1-8285-f792f97cf08d.png)

캡쳐링은 이벤트가 최상위 조상에서 시작해 아래로 전파된다.

![캡쳐링 콘솔](https://user-images.githubusercontent.com/87363422/156437404-16bd0f30-6556-4a06-abf4-23ae6c158845.png)

가장 안쪽의 `<div>`를 클릭해도 가장 바깥의 `<div>`부터 이벤트 핸들러가 동작하는 것을 확인할 수 있다.

## 3. 이벤트 흐름 3단계

> 🔃 위에서 알아본 버블링과 캡쳐링을 토대로 전체적인 이벤트 흐름을 파악해보자

표준 DOM 이벤트에서 정의한 이벤트 흐름에는 3가지 단계가 있다.

1. Capture Phase : 이벤트가 하위 요소로 전파되는 단계
2. Target Phase : 이벤트가 실제 타깃 요소에 전달되는 단계
3. Bubbling Phase : 이벤트가 상위 요소로 전파되는 단계

`<table>` 안의 `<td>`를 클릭했을 때 이벤트 흐름 3단계를 아래 그림으로 확인해보자.

![이벤트 흐름 단계](https://user-images.githubusercontent.com/87363422/156437400-c14779a6-fa35-473f-9279-77ce667cbe17.png)

1. Capture Phase : `<td>`를 클릭하면 이벤트가 최상위 조상에서부터 아래로 전파
2. Target Phase : 이벤트가 타깃 요소 `<td>`에 도착해 실행
3. Bubbling Phase : 다시 위로 전파

⇒ 이런 과정을 통해 요소에 할당된 이벤트 핸들러가 호출된다.

> 💡 이 때 캡쳐링 단계를 이용해야 하는 경우는 흔치 않기 때문에</br>
> addEventListener(event, handler)를 통해 할당된 핸들러는</br>
> 기본적으로는 타깃 단계나 버블링 단계에서만 동작한다!</br>
> 캡처링 단계에서 이벤트를 잡아내려면 addEventListener의 capture 옵션을 true로 설정해야 한다.</br></br>
> 캡처링 단계는 거의 쓰이지 않고</br>
> 주로 버블링 단계의 이벤트만 다뤄지는데에는 논리적 배경이 있다.</br>
> 현실에서 사고가 발생하면 지역 경찰이 먼저 사고를 조사한다.</br>
> 그 지역에 대해 가장 잘 아는 기관은 지역 경찰이기 때문이다.</br>
> 추가 조사가 필요하다면 그 이후에 상위 기관이 사건을 넘겨받는다.</br></br>
> 이벤트 핸들러도 이와 같은 논리로 만들어졌다.</br>
> 특정 요소에 할당된 핸들러는 그 요소에 대한 자세한 사항과</br>
> 무슨 일을 해야 할지 가장 잘 알고 있다.
>
> `<td>`에 할당된 핸들러는 `<td>`에 대한 모든 것을 알고 있기 때문에</br>`<td>`를 다루는데 가장 적합하고, 따라서 `<td>`를 다룰 기회를</br>
> 이 요소에 할당된 핸들러에게 가장 먼저 주는 것이다.

## 4. 버블링 금지시키기

```jsx
const divs = document.querySelectorAll('div');

function logText(e) {
	e.stopPropagation();
	consoloe.log(this.classList.value);
};

divs.forEach(div => div.addEventListener('click', logText);
```

이벤트 버블링은 타깃 이벤트에서 시작해서 `<html>`요소를 거쳐 `document` 객체를 만날 때까지 각 노드에서 모두 발생하며 각각의 핸들러들이 동작한다.

이 때 `e.stopPropagation()`메서드를 사용하면 버블링을 중단시켜서
타깃의 핸들러만 작동시킨다.

> 다만 버블링은 유용한 기능이므로 꼭 필요한 경우를 제외하곤 버블링을 막지 않는것이 좋다.

---

## 번외) event.target vs this

이벤트가 발생한 가장 안쪽의 요소는 타깃 요소라고 불리고 `event.target`을 통해 접근할 수 있다.

- `event.target`은 실제 이벤트가 시작된 '타깃' 요소로서 버블링이 진행되어도 변하지않는다.
- `this`는 '현재' 요소로서 현재 실행 중인 핸들러가 할당된 요소를 참조한다.

```jsx
function logText(e) {
  //현재 실행 중인 핸들러가 할당된 요소의 클래스 이름
  const thisClass = this.classList.value
  //타깃 요소의 클래스 이름
  const targetClass = e.target.classList.value
  console.log({ targetClass, thisClass })
}

divs.forEach(div => div.addEventListener('click', logText))
```

`event.target`과 `this`가 어떤 요소를 나타내는지 눈으로 확인해보기 위해 가장 안쪽의 `<div>`를 클릭하여 직접 콘솔에 찍어보자

![이벤트타겟this](https://user-images.githubusercontent.com/87363422/156437401-e92a05b5-bc83-466a-b41b-7d484d6728e2.png)

버블링이 일어나기 때문에 3개의 `<div>`가 가장 안쪽부터 순서대로 핸들러가 동작한다.

`event.target`은 어느 요소의 핸들러가 실행중인지와 관계없이 타깃 요소인 가장 안쪽 `<div>`만 나타내지만

`this`는 현재 핸들러가 실행중인 `<div>`를 나타냄을 확인 가능하다.
