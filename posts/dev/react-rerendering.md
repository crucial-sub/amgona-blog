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
초기 렌더링 이후 수시로 발생하는 리렌더링을 효율적으로 관리하는 것은 앱 성능 최적화에 도움이 될 여지가 충분히 있다.<br/>
리렌더링이 발생하는 원인에 대해 정확하게 파악하고 있으면 `useCallback`, `useMemo`, `React.memo`와 같은 메모이제이션 기법을 적재적소에 활용할 수 있게 된다.

## 리렌더링은 언제 발생하는가?

React 리렌더링의 핵심 동작 원리를 한 줄로 요약하면 다음과 같이 나타낼 수 있다.

> React의 모든 리렌더링은 state 변경에서 시작되며, 부모 컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링된다.

코드 예시를 통해 살펴보자

```jsx
export default function App() {
  console.log('App 리렌더링 발생')
  return (
    <div>
      <Counter />
    </div>
  )
}

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

![initial-rendering](https://github.com/crucial-sub/RnM-navigator/assets/87363422/60ab09ed-895a-429c-8d35-a588cb23c57e)

콘솔을 확인해보면 3개의 컴포넌트에서 모두 렌더링 발생 콘솔이 찍힌걸 확인할 수 있다.

### `count` state 변경

앞서 말했듯이 React의 모든 리렌더링은 state 변경에서 시작된다.
그렇다면 버튼을 눌러서 `count`가 변할때마다 과연 3개의 컴포넌트 중 어떤 것들이 리렌더링 될까?

![re-rendering](https://github.com/crucial-sub/RnM-navigator/assets/87363422/3185a905-1530-458b-bfb5-8d32753d8857)

우선은 `count`와 연결된 `Counter` 컴포넌트가 리렌더링된다.<br/>
그리고 `CountNumber`는 `Counter`에 의해 렌더링되기 떄문에 `CountNumber` 컴포넌트 역시 리렌더링된다.

- **그렇다면 `App`은 왜 리렌더링 되지 않았을까??**
- React에서 리렌더링의 요점은 변경해야 할 사항을 파악하는 것이다.
- React는 가상 DOM(Virtual DOM)을 활용하여 변경된 부분만을 업데이트하고, 이전 가상 DOM과 비교하여 실제 DOM에 변경 사항을 반영한다.
- 이로써 전체 페이지를 다시 그리는 것이 아니라 변경된 부분만 업데이트하여 성능을 최적화하는 것이다.

## props가 렌더링을 유발한다?

- 흔히들 props 값의 변경 또한 리렌더링의 요인이라고 여긴다.
- 물론 결과만 놓고 보면 props 값이 변할 때 해당 props를 전달받은 컴포넌트가 리렌더링되긴 한다.
- 하지만 이는 부모 컴포넌트에서 리렌더링이 발생할 때 자식 컴포넌트에게 넘겨주는 props가 변경되고 자식 컴포넌트 또한 리렌더링이 발생한 것일 뿐, React가 props 값의 변경을 주시하고 있는 것은 아니다.

위 코드 예시에서 `Counter` 컴포넌트에 props를 전달해주지 않는 NoPropsChild

```jsx
function Counter() {
  console.log('Counter 리렌더링 발생')
  const [count, setCount] = useState(0)

  return (
    <main>
      <CountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
    </main>
    <NoPropsChild222 />
  )
}


function NoPropsChild222() {
  console.log('NoPropsChild222 리렌더링 발생')
  return (
    <div>
      <p>i have no props222</p>
    </div>
  )
}
```
