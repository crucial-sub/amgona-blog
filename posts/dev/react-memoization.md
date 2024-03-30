---
title: '[React] 리렌더링 최적화 방법'
date: '2024.03.08'
category: 'React'
excerpt: '리렌더링 최적화 방법에 대해 알아보자!'
thumbnail: '/images/react-memoization.webp'
---

> React 개발에 있어서 컴포넌트의 불필요한 리렌더링을 최소화하여 애플리케이션의 성능을 개선하는 것은 중요한 과제 중 하나다.</br>
> 리액트가 제공하는 다양한 최적화 기법 중에서 `React.memo`, `useMemo`, `useCallback`는 컴포넌트의 렌더링을 효율적으로 관리하고 성능을 향상시키는 데 큰 도움을 준다.</br>
> 이번 글에서는 이 세 가지 메모이제이션(Memoization) 기술에 대해 자세히 알아보고, 각각이 어떻게 작동하여 React 앱의 성능을 최적화하는지에 대해 살펴보자.

## React.memo

[리렌더링 파헤치기](http://localhost:3000/post/dev/react-rerendering)글에서 React의 리렌더링에 대해 다음과 같이 한 줄로 요약한 바 있다.

> React의 모든 리렌더링은 state 변경에서 시작되며, 부모 컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링된다.

여기서 자식 컴포넌트의 경우, props가 변화하지 않았다면(혹은 props가 없다면) 해당 컴포넌트 UI가 변경되지 않는 경우가 분명히 존재한다.</br>
하지만 React는 자식 컴포넌트가 순수 함수인지 아닌지를 확신하지 못하기에 그냥 안전하게 자식 컴포넌트 또한 리렌더링하여 UI를 동기화한다.</br>

그렇다면..</br>
React에게 자식 컴포넌트가 순수 함수라고 인식시켜주면 굳이 불필요한 리렌더링을 할 필요가 없는 것 아닐까?

React에서는 이를 위해 `React.memo`라는 고차 컴포넌트(HOC)를 제공한다.

> 고차 컴포넌트는 [1급 객체](http://localhost:3000/post/dev/javascript-first-class-object) 글에서 소개한 고차 함수(함수를 전달인자로 받을 수 있고, 결과값으로 함수를 반환할 수 있는 함수)의 연장선으로, 말 그대로 컴포넌트를 인자로 받고 컴포넌트를 리턴하는 컴포넌트이다.

다음과 같이 컴포넌트를 `React.memo()`로 맵핑해주면 이제 리액트는 해당 컴포넌트를 순수 컴포넌트라 여기고 props가 변경되지 않는 한 리렌더링을 하지않는다.</br>

```jsx
function MyComponent(props) {
  /* 컴포넌트 구현 */
}

export default React.memo(MyComponent)
```

컴포넌트가 `React.memo()`로 래핑 될 때, React는 컴퍼넌트를 렌더링하고 결과를 메모이징(Memoizing)한다.
그리고 추후 리렌더링이 발생하면 이전 props와 새 props를 얕은 비교를 통해 비교 후, 동일하다면 앞서 메모이징한 결과를 재사용한다.

### React.memo 활용

그렇다면 정확히 `React.memo`를 언제 사용하면 좋을까?

`React.memo`를 사용하기 가장 적합한 상황은 컴포넌트가 동일한 props로 자주 렌더링 될거라 예상될 때이다.

다음의 코드 예시를 살펴보자.

```jsx
// PostHeaderWithRealtimeViews 컴포넌트
function PostHeaderWithRealtimeViews({ title, writeTime, category, views }) {
  return (
    <div>
      <PostInfo title={title} writeTime={writeTime} category={category} />
      조회 수 : {views}
    </div>
  )
}

// PostInfo 컴포넌트
function PostInfo({ title, writeTime, category }) {
  return (
    <div>
      <div>제목 : {title}</div>
      <div>작성 시간 : {writeTime}</div>
      <div>카테고리 : {category}</div>
    </div>
  )
}
```

이 예시에서는 2개의 컴포넌트를 확인할 수 있다.

1. 부모로부터 블로그포스트 정보와 실시간 조회수를 props로 전달받는 `PostHeaderWithRealtimeViews`
2. `PostHeaderWithRealtimeViews`로부터 블로그포스트 정보를 props로 전달받는 `PostInfo`

이 때 `title`, `writeTime`, `category`와 같은 블로그포스트 정보 관련 props들은 일반적으로 자주 변경되지 않을 것이라고 쉽게 예상되지만 실시간 조회수를 나타내는 `views`는 그렇지 않다.

실시간으로 서버에서 데이터를 가져와 `PostHeaderWithRealtimeViews` 컴포넌트에 전달하는 `views`가 업데이트 되는 로직이라면,</br>
블로그포스트 조회 수가 늘어날 때마다 `PostHeaderWithRealtimeViews`가 리렌더링되고, `PostInfo`는 제목, 카테고리 등이 이전과 동일하더라도 불구하고 자식 컴포넌트이기 때문에 리렌더링 될것이다.

이러한 경우가 바로 `React.memo`를 적용하기에 좋은 케이스다.

```jsx
// 보통 컴포넌트를 export하는 곳에서 React.memo를 적용한다.
function PostInfo({ title, writeTime, category }) {
  return (
    <div>
      <div>제목 : {title}</div>
      <div>작성 시간 : {writeTime}</div>
      <div>카테고리 : {category}</div>
    </div>
  )
}

export default React.memo(PostInfo)
```

`PostInfo`를 `React.memo`로 맵핑한다면 이제 React는 조회 수가 아무리 바뀌어도 블로그포스트 제목, 카테고리 등이 변하지 않는 한 `PostInfo`를 리렌더링하지 않을 것이다.

---

## useMemo

- `useMemo`는 React에서 렌더링 최적화를 위해 제공하는 Hook으로, **렌더링 사이에 계산된 값을 기억**한다는 것이 기본 의의이다.
- 이 기본 의의를 토대로 주어진 렌더에서 수행할 작업량을 줄이는 것이 `useMemo`의 주 사용 목적이다.

`useMemo`를 사용한 최적화 방법을 코드 예시를 통해 살펴보자

### useMemo를 이용한 최적화

```jsx
function PostList({ posts, date }) {
  ...
  const filterPosts = (arr, d) => {
    // 배열을 필터링하는 복잡한 로직
    return filterdArr
  }
  const visiblePosts = filterPosts(posts, date)
  ...
}
```

- 이 예시에서는 `filterPosts` 함수를 이용하여 `visiblePosts` 변수에 필터링된 배열을 할당한다.
- 이 로직들은 `PostList`가 리렌더링 될 때마다 몇 번이고 다시 반복될 것이다.
- 대부분의 경우 계산이 매우 빠르게 처리되기 때문에 큰 문제가 되지 않는다.
- 하지만 큰 배열을 필터링하거나, 변환하거나, 혹은 고비용의 계산을 수행하는 경우라면...
- 이는 앱 성능 저하로 이어질 가능성이 충분히 존재하기 때문에, 이전 계산과 비교해 그 결과값이 변경되지 않는 경우에 한해서는 다시 계산하는 것을 건너뛰고 싶을 수 있다.
- 이때가 바로 `useMemo`를 사용하기 적절한 경우이다.

```jsx
function PostList({ posts, date }) {
  ...
  const filterPosts = (arr, d) => {
    // 배열을 필터링하는 복잡한 로직
    return filterdArr
  }
  const visiblePosts = useMemo(() => filterPosts(posts, date), [posts, date])
  ...
}
```

`useMemo`는 두 개의 인수를 사용한다.

1. 인자를 받지 않고(`() => `), memo할 값을 계산하여 반환하는 콜백 함수
2. 컴포넌트 내에서 계산에 사용되는 모든 값을 포함하는 의존성 배열(비워둘 경우 초기 렌더링 시에만 계산)

컴포넌트 초기 렌더링 시, `useMemo`를 통해 얻는 값은 콜백 함수를 호출한 결과값이다.</br>
이 후 리렌더링이 발생할 시 이전 렌더링에서 전달한 의존성과 현재의 의존성을 비교 후, 의존성이 변경되지 않았다면 `useMemo`는 이전에 계산했던 값을 반환하고, 그렇지 않다면 다시 계산 후 새 값을 반환한다.

- 즉, 간단히 말해서 `useMemo`를 사용하면 의존성이 변경되기 전까지 **계산 결과를 캐싱**한다.

---

## useCallback

`useCallback`은 `useMemo`와 마찬가지로 React 최적화를 위한 Hook이며 내용 또한 거의 유사하지만

- `useMemo`는 **호출한 함수의 결과를 캐시**
- `useCallback`은 **함수 자체를 캐시**한다는 점에서 차이가 있다.
- 즉, `useMemo`의 함수용 버전 느낌이랄까?

```jsx
// 이 표현식과
useCallback(function callbackFunc() {}, [])

// 이 표현식은 근본적으로는 같다.
useMemo(() => {
  return function callbackFunc() {}
}, [])
```

`useMemo`가 복잡한 계산의 결과값을 메모이징하는데 주로 쓰인다면,</br>
`useCallback`은 특정 함수를 렌더링할 때마다 새로 만들지 않고 재사용하는 것이 주 목적이다.</br>

`useCallback`이 어떻게 최적화 수단으로 사용되는지 코드 예시를 통해 알아보자.

### useCallback 활용하기

```jsx
// App 컴포넌트
function App() {
  const [text, setText] = useState('')
  const [items, setItems] = useState([])

  const handleChangeText = e => {
    console.log(e.target.value)
    setText(e.target.value)
  }
  const handleAddItem = e => {
    e.preventDefault()
    const newItem = {
      id: Math.random(),
      text,
    }
    const newItems = [...items, newItem]
    setItems(newItems)
    setText('')
  }

  const handleRemove = id => {
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)
  }

  return (
    <div>
      <input value={text} onChange={handleChangeText} />
      <button onClick={handleAddItem}>리스트 추가</button>
      <List items={items} handleRemove={handleRemove} />
    </div>
  )
}

// List 컴포넌트
function List({ items, handleRemove }) {
  console.log('리스트 렌더링')
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <p>{item.text}</p>
          <button onClick={() => handleRemove(item.id)}>제거</button>
        </li>
      ))}
    </ul>
  )
}

export default React.memo(List)
```

- 이 예시에서는 `App`과 `List` 두 개의 컴포넌트가 있다.
- `App`에서는 input에 입력한 `text` state를 `handleSubmit`을 통해 `items` state에 추가
- `List`에서는 `items`와 `handleRemove`를 props로 받으며, `handleRemove`를 통해 item 제거 가능

이 때 `React.memo`에서 다뤘듯이, input에 text를 입력할 때마다 `text` state가 변하여 `List` 또한 강제로 리렌더링이 발생하는 문제가 있다.</br>
그렇기에 `List`을 `React.memo`로 감싸주었고, 이제 props가 바뀌지 않는 이상 `List`은 리렌더링이 발생하지 않을 것이다.

하지만 `items`에 변경을 주지 않고 text만 입력 후 콘솔을 확인해보면?

![useCallback-rerender](https://github.com/crucial-sub/odot/assets/87363422/975b565f-db6b-44e6-bf80-7c2b238fc3a9)

- 이런...
- `React.memo`로 감싸주었음에도, text를 입력할 때마다 불필요한 리렌더링이 계속 발생하였다!

> ❓ 왜 `React.memo`가 제대로 작동하지 않은 것일까?

- 여기서 우리가 알아야 두어야 할 중요한 사실은...
- **컴포넌트 내부에 정의된 함수들은 기본적으로 컴포넌트가 렌더링될 때마다 재생성**된다는 것이다.
- 이는 함수뿐만 아니라 배열, 객체와 같은 **참조 타입 데이터**에 모두 적용되는 말로,
- React에서 컴포넌트가 리렌더링되면, 그 내부에 정의된 참조 타입 데이터들은 새로운 메모리 주소에 할당되고, 이전 렌더링에서 생성된 데이터와는 다른 **새로운 참조값**을 가지게 된다.

JavaScript에서 참조 타입 데이터는 그 내용이 동일하더라도 참조값이 다르면 서로 다른 것으로 판단하기 때문에,</br>
겉으로 보기엔 `ListForm`이 전달받는 `handleSubmit` props가 전혀 변한 것이 없는 것처럼 보여도...</br>
`React.memo`는 새로 생성된 props를 이전과 다르다 판단하여 리렌더링을 막지 않는 것이다.

바로 이 지점에서 `useCallback`이 유용하게 쓰인다.

- `useCallback`의 중요한 특징은 메모이징을 하면서 **참조를 보존**한다는 것이다.
- 즉, 리렌더링 사이에 동일한 함수가 되도록 보장해준다!(의존성이 변하지 않는 한)

```jsx
// App 컴포넌트
...
  const handleRemove = useCallback(
    (id) => {
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
    },
    [items]
  );
...
```

이렇게 `useCallback`을 적용하면 이제 의존성 배열에 있는 `items`가 변하지 않는 한(리스트 추가 버튼을 누르거나, 제거 버튼을 누르거나) `handleRemove`의 참조값은 변하지 않으므로 불필요한 리렌더링이 발생하지 않는다.

### `useCallback` 추가 사용법

`useCallback`은 컴포넌트에 함수를 props로 전달하는 경우 외에도 `useEffect`과 함께 사용할 때도 유용하게 작용한다.

```jsx
...
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await fetch("https://example.com/data");
    const data = await response.json();
    setData(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
...
```

- 예를 들어 위 코드와 같이 `useEffect`과 `useCallback`을 같이 사용하면 데이터를 불러오는 로직의 최적화가 가능해진다.
- 초기 렌더링 시 `fetchData` 함수가 생성되면서 `fetchData`를 의존성 배열에 둔 `useEffect`가 실행되고, `fetchData`가 실행되면서 데이터를 불러온다.
- 이후 리렌더링이 발생하더라도 `fetchData` 함수는 재생성되지 않으며, `fetchData` 함수가 변경된 경우에만 `useEffect`가 실행되어 데이터를 다시 불러오도록 최적화할 수 있는 것이다.

## 유의사항

- `React.memo`, `useMemo`, `useCallback` 모두 적절하게 사용하면 앱 성능 최적화를 이끌어 낼 수 있는 유용한 수단이다.
- 하지만 그렇다고 해서 모든 상황에 이러한 최적화 수단을 적용할 필요는 전혀 없다.
- 사실 React는 자체적으로 최적화가 이미 잘 이루어져있으며 리렌더링은 종종 우리가 생각하는 것만큼 느리거나 비용이 많이 들지 않는다.
- 오히려 메모이제이션 자체에도 비용이 발생하며, 무분별하게 사용할 경우 그 과정에서 코드 복잡성이 증가하고 버그나 성능 저하를 초래할 수 있는 상황이 생길 수 도 있다.
- 따라서 확실한 성능 개선이 예상되는 곳에서만 해당 최적화 수단을 적용하도록 하자!!
