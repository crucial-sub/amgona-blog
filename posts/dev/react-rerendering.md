---
title: '[React] 리렌더링 파헤치기'
date: '2024.03.01'
category: 'React'
excerpt: 'React에서 리렌더링이 발생하는 조건에 대해 알아보자!'
thumbnail: '/images/react-rerendering.webp'
---

> React에 관해 공부를 해본 사람이라면 익히 알다시피… <br/>
> 효율적인 **컴포넌트 렌더링 및 리렌더링**은 React의 핵심 기능 중 하나이다.<br/>
> React가 `가상 DOM` 등을 활용해 복잡한 렌더링 프로세스를 대신 처리해주는 덕분에, 우리 개발자들은 UI를 설계하는 데 집중할 수 있다.

React가 알아서 다 해준다는 거지? 하고 넘어갈 수도 있겠지만<br/>
초기 렌더링 이후 수시로 발생하는 리렌더링의 조건을 이해하고 이를 효율적으로 관리하는 것은 앱 성능 최적화에 도움이 될 여지가 충분히 있다.<br/>

## 리렌더링은 언제 발생하는가?

React 리렌더링의 핵심 동작 원리를 한 줄로 요약하면 다음과 같이 나타낼 수 있다.

> React의 모든 리렌더링은 state 변경에서 시작되며, 부모 컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링된다.

코드 예시를 통해 살펴보자

```jsx
// App 컴포넌트
function App() {
  console.log('App 리렌더링 발생')
  return (
    <div>
      <Counter />
    </div>
  )
}

// Counter 컴포넌트
function Counter() {
  console.log('Counter 리렌더링 발생')
  const [count, setCount] = useState(0)

  return (
    <main>
      <CountNumber count={count} />
      <button onClick={() => setCount(prev => prev + 1)}>카운트 증가</button>
    </main>
  )
}

// CountNumber 컴포넌트
function CountNumber({ count }) {
  console.log('CountNumber 리렌더링 발생')
  return <p>{`Count: ${count}`}</p>
}
```

이 예시에서는 3개의 컴포넌트를 확인할 수 있다.

1. 최상단의 `APP`
2. `count`라는 state를 가진 `Counter`
3. `Counter`로부터 `count`를 props로 전달받는 자식 컴포넌트 `CountNumber`

그리고 각 컴포넌트에서는 `console.log()`를 통해 렌더링이 되었는지 확인할 수 있다.

### 초기 렌더링

초기 렌더링 시에는 `App` 컴포넌트가 우선 렌더링되고 그 내부에 있는 모든 컴포넌트들도 재귀적으로 렌더링된다.

![initial-rendering](https://github.com/crucial-sub/odot/assets/87363422/7dd3039e-b9b8-437d-b3bb-156d8f2c733b)

콘솔을 확인해보면 3개의 컴포넌트에서 모두 렌더링 발생 콘솔이 찍힌걸 확인할 수 있다.

### `count` state 변경

앞서 말했듯이 React의 모든 리렌더링은 state 변경에서 시작된다.
그렇다면 버튼을 눌러서 `count`가 변할때마다 과연 3개의 컴포넌트 중 어떤 것들이 리렌더링 될까?

![re-rendering](https://github.com/crucial-sub/odot/assets/87363422/b79dc60b-3755-4d74-be8a-5f1a772880a7)

우선은 `count`와 연결된 `Counter` 컴포넌트가 리렌더링된다.<br/>
그리고 `CountNumber` 컴포넌트는 `Counter` 컴포넌트에 의해 렌더링되기 떄문에 `CountNumber` 컴포넌트 역시 리렌더링된다.

- **그렇다면 `App`은 왜 리렌더링 되지 않았을까??**
- React에서 리렌더링의 요점은 변경해야 할 사항을 파악하는 것이다.
- React는 가상 DOM(Virtual DOM)을 활용하여 변경된 부분만을 업데이트하고, 이전 가상 DOM과 비교하여 실제 DOM에 변경 사항을 반영한다.
- 이로써 전체 페이지를 다시 그리는 것이 아니라 변경된 부분만 업데이트하여 성능을 최적화하는 것이 가능하다.
- 즉! 상태가 변했다해서 전체 앱이 리렌더링될 필요없이 상태를 가지고 있는 컴포넌트와 해당 컴포넌트의 하위 컴포넌트만 리렌더링 되는 것이다.

---

## props가 렌더링을 유발한다?

- 흔히들 props가 변했기 때문에 컴포넌트가 리렌더링 된다고도 말한다.
- 물론 결과만 놓고 보면 props 값이 변할 때 해당 props를 전달받은 컴포넌트가 리렌더링되는 것처럼 보인다.
- 과연 정말 props 때문에 컴포넌트가 리렌더링 되는것일까?
- 위 코드 예시에서 `Counter` 컴포넌트에 props를 전달해주지 않는 `NoPropsChild`컴포넌트를 추가해준 후 살펴보자.

```jsx
// Counter 컴포넌트
function Counter() {
  console.log('Counter 리렌더링 발생')
  const [count, setCount] = useState(0)

  return (
    <main>
      <CountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
      <NoPropsChild />
    </main>
  )
}

// NoPropsChild 컴포넌트
function NoPropsChild() {
  console.log('NoPropsChild 리렌더링 발생')
  return (
    <div>
      <p>i have no props</p>
    </div>
  )
}
...
```

이제 `Counter`에는 `CountNumber`와 `NoPropsChild` 두 개의 자식 컴포넌트가 있다.

위에서 분명 React는 변경된 부분만을 업데이트 한다고 했으니...<br/>
`count` state에 의존하지 않으며 props로 어떤 것도 전달받지 않는 `NoPropsChild`는 <br/>
`count`가 변경되더라도 리렌더링될 필요가 없어보인다.

자... 그럼 버튼을 눌러서 `count`를 변경시켜보면?

![no-props](https://github.com/crucial-sub/odot/assets/87363422/42851368-a384-4528-b36d-ff25f61a8307)

예상과 다르게 `NoPropsChild` 또한 리렌더링 됨을 확인할 수 있다.

왜 굳이 아무 변화도 없는 `NoPropsChild` 컴포넌트까지 리렌더링 되는것일까?

이것은 React가 `NoPropsChild`가 count 상태 변수에 직간접적으로 의존하는지 여부를 100% 확실하게 아는 것이 어렵기 때문이다.

### 순수함수

> ❓순수함수❓ <br/>
> 동일한 props가 제공될 때 항상 동일한 UI를 생성하는 함수(컴포넌트) <br/>
> 어떤 외부 상태에 의존하지도 않고 변경시키지도 않는, 즉 부수 효과(Side Effect)가 없는 함수

이상적으로 React의 컴포넌트는 항상 "순수함수"처럼 작동하기를 지향한다.

하지만 현실적으로 우리의 컴포넌트들은 대부분 순수하지 않은 것들이 많다.
예를 들어 다음과 같은 코드를 보자.

```jsx
function WhatTimeIsItNow(props) {
  const now = new Date()
  return <p>It is {now.toString()}</p>
}
```

`WhatTimeIsItNow` 컴포넌트는 현재 시간에 의존하기 때문에 props 동일 여부에 관계없이 렌더링될 때마다 다른 UI를 표시하게 된다!

React는 이러한 순수하지 않은 컴포넌트들이 마지막 렌더링 이후로 동일한 UI를 제공할지 확신하지 못한다.</br>
사용자가 바라보고 있는 UI가 앱 상태와 “동기화” 상태를 유지하도록 하는 것은 React의 최우선 목표다.</br>
그렇기에 React에서는 사용자에게 오래된 UI를 보여주는 위험을 배제하기 위해...</br>
지나치게 많은 렌더링이 발생할 가능성을 감수하더라도 안전하게(혹은 과감하게) 모든 자식 컴포넌트들을 리렌더링하는 것을 선택한다!

- 이제 **props가 렌더링을 유발한다?** 라는 명제에 대해 다시 얘기해보자.

엄밀히 말하면 props는 리렌더링과 직접적인 상관관계에 있지 않다. </br>
`CountNumber` 컴포넌트는 전달받은 props가 변경되었기 때문에 리렌더링 되는 것이 아니다.

- `count` state가 변함으로써 `Counter`가 리렌더링될 때 `CountNumber`를 포함한 모든 자식 컴포넌트 또한 리렌더링된 것일 뿐...
- React가 props 값의 변경을 직접 주시하고 있는 것이 아니다.

  > - 💡 더 정확히 말하면 props는 **불변(Immutable)** 하다.
  > - props는 부모 컴포넌트가 렌더링될 때 가져오는 것이기 때문에
  > - 이를 건내주는 부모 컴포넌트의 리렌더링 없이는 변경이 불가능하다.
  > - 즉!!!! props의 변경은 애초에 **부모 컴포넌트의 리렌더링**을 전제로 하는 것이다.

## 마무리

- 처음에 글을 시작할 때 리렌더링 조건을 이해하고 이를 효율적으로 관리하는 것은 앱 성능 최적화에 도움이 된다고 소개했다.
- 지금껏 React에서 리렌더링이 왜, 언제 발생하는 지에 대해 알아보았으니...
- 다음 글에서 `React.memo`, `useCallback`, `useMemo`와 같은 메모이제이션 기법을 활용하여 리렌더링을 최적화하는 방법에 대해 알아보도록 하자 !

---

## 참조한 자료

[Why React Re-Renders](https://www.joshwcomeau.com/react/why-react-re-renders/)
