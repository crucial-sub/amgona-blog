---
title: '[wesbos30] 13. 스크롤 시 이미지 슬라이드'
date: '2023.02.19, 03:00'
category: 'wesbos30'
excerpt: '💡 화면을 스크롤하면 이미지가 슬라이드 인하며 나타나는 기능을 구현해보자!'
thumbnail: '/images/wesbos13-image-slide.webm'
---

> 💡 화면을 스크롤하면 이미지가 슬라이드 인하며 나타나는 기능을 구현해보자!

## 로직

1. 화면 스크롤 인식
2. 얼마나 스크롤해야 이미지가 슬라이드 인-아웃 될지 기준점 설정

---

## 코딩 과정

### **1. 스크롤 인식하는 핸들러**

```jsx
function debounce(func, wait = 20, immediate = true) {
  var timeout
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

function checkSlide(e) {
  console.log(window.scrollY)
}

window.addEventListener('scroll', debounce(checkSlide))
```

스크롤을 인식하기 위해서는 `window`에 이벤트핸들러를 할당해주면 된다.

이 때 window에 `checkSlide` 핸들러를 바로 할당해주고
핸들러에서 `console.log(window.scrollY)`를 출력해보면...

![콘솔1](https://user-images.githubusercontent.com/87363422/156255983-5366e4c7-931e-4ff2-8fcd-fdfed9e29658.png)
핸들러를 바로 할당해주면 매 스크롤마다 핸들러가 너무 많이 실행되므로

WesBos가 자체적으로 작성해둔 debounce 함수를 이용해 실행 빈도를 낮춘다.

### 2. 이미지 슬라이드 인-아웃 기준점 정하기

스크롤을 내리든 올리든 이미지 슬라이드 인-아웃 기능이 유연하게 작동하게 하기위해
기준점을 뷰포트 최하단과 뷰포트 최상단 두 가지로 나누어서 계산하도록 하자!

1.  **뷰포트 최하단 기준 계산**

    ```jsx
    const sliderImages = document.querySelectorAll('.slide-in')

    function checkSlide() {
      sliderImages.forEach(sliderImage => {
        const imageHalf = window.scrollY + window.innerHeight
        const isViewBottomPast =
          imageHalf > sliderImage.offsetTop + sliderImage.height / 2
        if (isViewBottomPast) {
          sliderImage.classList.add('active')
        } else {
          sliderImage.classList.remove('active')
        }
      })
    }
    ```

    ![기준점계산](https://user-images.githubusercontent.com/87363422/156255943-05eb4b71-69a3-48a8-9a6e-29778b91d41b.png)

    위 그림을 통해 살펴보면

    `window.innerHeight`는 윈도우 창틀을 포함하지않는 현재 뷰포트의 높이이며

    `window.scrollY`는 `document`가 수직으로 얼마나 스크롤 됐는지를 픽셀 단위로 반환하는 값이다.

    ⇒ 따라서 두 값을 더하면 현재 뷰포트 최하단의 절대위치를 알 수 있다.

    이미지가 슬라이딩 인-아웃 하는 기준점을 이미지의 절반을 지날 때로 정하면

    - **뷰포트 최하단 절대위치**: `window.innerHeight` + `window.scrollY`
    - **이미지 절반의 절대위치**: `image.offsetTop` + `image.height / 2`

    뷰포트 최하단 절대위치가 더 크면 이미지가 보이고 작으면 이미지가 안보이도록 하면 된다.

2.  **뷰포트 최상단 기준 계산**

    이미지가 슬라이딩 인-아웃 하는 기준점을 이미지 최하단을 지날 때로 정하면

    - **뷰포트 최상단 절대위치**: `window.scrollY`
    - **이미지 최하단 절대위치**: `image.offsetTop` + `image.height`

    뷰포트 최상단 절대위치가 더 크면 이미지가 보이고 작으면 이미지가 안보이도록 한다.

    ```jsx
    function checkSlide() {
      sliderImages.forEach(sliderImage => {
        // 뷰포트 최상단 기준
        const imageHalf = window.scrollY + window.innerHeight
        const isViewBottomPast =
          imageHalf > sliderImage.offsetTop + sliderImage.height / 2
        // 뷰포트 최하단 기준
        const imageBottom = sliderImage.offsetTop + sliderImage.height
        const isViewTopPast = window.scrollY < imageBottom
        if (isViewBottomPast && isViewTopPast) {
          sliderImage.classList.add('active')
        } else {
          sliderImage.classList.remove('active')
        }
      })
    }
    ```

---

## 최종 완성 코드

```jsx
function debounce(func, wait = 20, immediate = true) {
  var timeout
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

const sliderImages = document.querySelectorAll('.slide-in')

function checkSlide() {
  sliderImages.forEach(sliderImage => {
    // 뷰포트 최상단 기준
    const imageHalf = window.scrollY + window.innerHeight
    const isViewBottomPast =
      imageHalf > sliderImage.offsetTop + sliderImage.height / 2
    // 뷰포트 최하단 기준
    const imageBottom = sliderImage.offsetTop + sliderImage.height
    const isViewTopPast = window.scrollY < imageBottom
    if (isViewBottomPast && isViewTopPast) {
      sliderImage.classList.add('active')
    } else {
      sliderImage.classList.remove('active')
    }
  })
}

window.addEventListener('scroll', debounce(checkSlide))
```
