---
title: '[ReactNative] FlatList 활용하기(feat. 최적화)'
date: '2024.02.22'
category: 'React-Native'
excerpt: 'FlatList와 그 최적화 방법에 대해 알아보자!'
thumbnail: '/images/reactnative-flatlist.webp'
---

> React Native를 공부하면서 Todo 앱을 개발하던 중 ScrollView 외에 FlatList라는 유용한 list 컴포넌트에 대해 알게 되어 그 특징과 최적화 방법을 정리하고자 한다!

## **FlatList란? (feat. ScrollView)**

`FlatList`는 기본적으로 `ScrollView` 기반으로 만들어진 RN 컴포넌트이다.

우리가 RN 개발을 하면서 `ScrollView`를 사용하는 목적은 보통 List에 담긴 데이터가 화면을 벗어나게 될 때 사용자가 스크롤을 통해 벗어난 부분을 볼 수 있게 하기 위함이다.

![scroll-list](https://github.com/crucial-sub/odot/assets/87363422/1bd22486-c0bd-4239-b3e6-d66b232d6c6d)

`ScrollView`는 말 그대로 단순히 스크롤을 생성해주는 컴포넌트이기 때문에 데이터가 많지 않을 때는 간단하게 사용하기 좋은 컴포넌트이다.

> ❓ 하지만 만약 수백, 수천 개의 데이터가 담긴 list를 렌더링해야 한다면 어떻게 될까??

`ScrollView`안에 담긴 아이템들은 스크린에 보이지만 않을 뿐, 한번에 전체 영역이 모두 렌더링 된다.

즉 현재 스크린에 표시될 아이템은 고작 몇 개밖에 안 되더라도 수천 개의 데이터가 초기에 렌더링 된다는 것인데…

굳이 이런 비효율을 감수해야할 필요가 있을까?

- **바로 이런 의문에 기반에서 만들어진 것이 `FlatList`이다!**

`FlatList`는 `LazyLoading`, `Recycling`같은 기능들을 통해 비효율적인 렌더링을 방지하여 사용자가 원하는 데이터를 긴 로딩이나 버벅임 없이 보여주게 된다.

### LazyLoading

`LazyLoading`은 실제로 필요할 때까지 리소스의 로딩을 뒤로 미루는 방식을 말한다.

즉, 각 데이터를 미리 렌더링 하지 않고 화면에 보이는 시점에 렌더링함으로써 로딩 퍼포먼스를 최적화하는 기술이다.

### Recycling

화면에서 벗어났을 때, 아이템 컴포넌트를 아예 메모리에서 해제하는 것이 아닌, 언마운트 후 컴포넌트를 재활용하는 방식이다.

## **FlatList의 기본적인 사용법**

다음 코드 예시를 통해 FlatList의 기본적인 사용법을 알아보자

```tsx
...

type ItemType = {
  id: string;
  title: string;
};

const DATA = Array.from({length: 150}, (_, index) => ({
  id: String(index),
  title: `Item ${index}`,
}));

const FlatListExample = () => {
    const renderItem = ({item}: {item: ItemType}) => (
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
    );
    const keyExtractor = (item: ItemType) => `flat-list-item-${item.id}`

    return (
        <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        />
    );
};

...
```

`FlatList`를 사용할 때 기본적으로 알아야할 props는 세가지가 있다.

### data

data는 말그대로 렌더링 하고자 하는 데이터를 담는 props이다.

### renderItem

data props로 받은 데이터를 어떻게 렌더링할 것인지 정의하는 함수이다.

### keyExtractor

React에서 list를 `map()`할 때 데이터 추적을 위해 key를 설정해주었듯이 item에 각각 고유의 키를 부여하는 함수이다.

위의 두개와 달리 필수 props는 아니지만 기본적으로 설정해두면 좋은 props이다.

## **FlatList 최적화**

`FlatList`의 기본적인 사용법을 알아보았으니 이제 최적화하는 방법 또한 알아보자.

> `FlatList` 자체가 `ScrollView`의 비효율적인 부분들을 해소해 주기 위해 만들어졌다보니, 대부분의 기본적인 설정들이 `FlatList` 내에 세팅되어 있다.
> 하지만 개발자가 직접 원하는 방향으로 `FlatList`의 성능을 최적화하는 것 또한 가능하다!

### initialNumToRender

- **-** 초기에 몇개의 아이템을 렌더링할 지 정하는 props로, 초기 렌더링 성능을 향상시킬 수 있다.
- **-** default 값은 10(`number`)
- **-** 아이템 높이와 화면에서 `FlatList` 영역의 높이를 고려해 빈 곳이 발생하지 않도록 너무 낮게 설정하지 않도록 주의해야한다.

### getItemLayout

```tsx
...

const ITEM_HEIGHT = 60;

const FlatListExample = () => {

    ...

    const getItemLayout =  (data: any, index: number) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    });

    return (
        <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        />
    );
};

...
```

- **-** 모든 아이템의 높이 또는 너비가 동일한 정적인 항목일 경우, `getItemLayout` props를 통해 `FlatList`에게 미리 각 항목의 위치와 크기를 알려줄 수 있다.
- **-** 해당 props를 정의해 주면 아이템의 레이아웃 크기가 매번 계산되지 않아도 되므로 성능 개선에 효과적이다.

### windowSize

> 💡 뷰포트? 윈도우? </br>
> 뷰포트는 픽셀로 렌더링되는 콘텐츠가 보이는 영역,</br>
> 윈도우는 아이템이 마운트될 영역으로, 일반적으로 뷰포트보다 훨씬 크다.

- **-** 윈도우 크기를 지정하여 `FlatList` 영역 외부에서 렌더링 되는 최대 항목수를 결정해준다.
- **-** default 값은 21(`number`)이며, 이 props에 전달된 숫자는 1이 뷰포트 높이와 동일한 측정단위이다.
  즉, 기본값 21은 현재 뷰포트 하나를 기준으로 위아래에 각각 10개의 뷰포트를 추가로 렌더링한다는 뜻이다.
- **-** 이 값이 클수록 스크롤 성능이 향상될 수 있지만 더 많은 메모리를 소비하게 되고,
  값이 작을수록 마운트되는 아이템의 수가 적어지므로 메모리가 절약되지만 스크롤 할 때 빈 아이템 또는 로딩 뷰를 보게될 수 도 있다.
- **-** 따라서 최적의 숫자를 찾아서 잘 설정해보자ㅎㅎ… (보통의 경우 기본으로 설정된 21만큼 큰 값까진 필요 x)

### maxToRenderPerBatch

- **-** 스크롤 시 렌더링할 항목의 수(렌더링 대기열에 추가할 항목의 수)를 결정한다.
- **-** default 값은 10(`number`)
- **-** 이 값이 클 수록 스크롤 시 빈 영역이 보일 가능성이 적어지겠지만 너무 클 경우 JS 실행시간이 길어져 `press`같은 다른 이벤트의 처리가 차단되어 반응성이 저하될 수 있다.

### 인라인 화살표 함수 지양하기 & useCallback 사용

위에서 설명한 props들을 인라인 화살표 함수로 작성할 경우 컴포넌트가 렌더링 될 때마다 새로운 함수가 생성되기 때문에 불필요한 렌더링이 발생한다.

```tsx
...

const FlatListExample = () => {

  ...
  const renderItem = React.useCallback(
    // renderItem 로직
    , []);
  const keyExtractor = React.useCallback(
    // keyExtractor 로직
    , []);
  const getItemLayout = React.useCallback(
    // getItemLayout 로직
    , []);

  return (
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
      />
  );
};

...
```

따라서 `renderItem`, `keyExtractor`, `getItemLayout`과 같은 props들을 입력할 때는 `useCallback`을 활용하여 꼭 필요할 때만 업데이트 되도록 하는 것이 좋다!!
