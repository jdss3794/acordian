import React from 'react'
import Accordion from './components/Accordion/Accordion'
import './styles.css'

// 아코디언 컴포넌트에 사용 될 데이터
const accordionData = [
  {
    // JSX를 반환하는 함수를 설정하면, 실행했을 때 동적으로 코드를 구현할 수 있습니다.
    header: () => '헤더 1',
    panel: () => (
      <div>
        <p>패널 1</p>
      </div>
    ),
  },
  {
    header: () => <span>헤더2</span>,
    panel: () => (
      <div>
        <p>패널 2</p>
        <p>패널 2 설명 내용</p>
      </div>
    ),
  },
  {
    header: () => <span>헤더3</span>,
    panel: () => (
      <div>
        <p>패널 3</p>
        <p>패널 3 설명 내용이 입력됩니다.</p>
      </div>
    ),
  },
]

// 앱 컴포넌트
export default function App() {
  // 아코디언 컴포넌트 상태
  // 1개의 배열(리스트), 1개의 활성 인덱스 상태를 개별 관리 하지 않고,
  // useReducer()와 리듀서 함수를 활용할 수도 있습니다. 또는 Redux를 사용해
  // 상태를 관리하는 것 또한 선택 가능한 방법입니다.
  const [accordionList] = React.useState(accordionData)
  const [accordionIndex, setAccordionIndex] = React.useState(null)

  // 아코디언 아이템 헤더 컴포넌트의 onActive prop에 전달할 함수로
  // 활성 인덱스 상태를 업데이트 하는 로직을 포함합니다. 하위 컴포넌트에
  // 전달할 함수이므로 참조 동일성(성능 향상)에 따라 useCallback() 훅을
  // 사용해 전달해야 성능 저하를 막을 수 있습니다.
  const activeAccordion = React.useCallback(
    (index) => setAccordionIndex(index),
    // 종속성 배열은 빈 값으로 설정
    []
  )

  return (
    <div className="App">
      {/* 아코디언 컴포넌트 */}
      <Accordion spaceY={100} currentIndex={accordionIndex}>
        {accordionList.map((item, index) => {
          const isActive = accordionIndex === index
          return (
            // 아코디언 아이템 컴포넌트
            <Accordion.Item
              key={`accordionItem-${index}`}
              index={index}
              expanded={isActive}
              disabled={isActive}
            >
              {/* 아코디언 아이템 헤더 컴포넌트, onActive 속성에 활성 인덱스 업데이트 함수를 전달 */}
              <Accordion.Header onActive={activeAccordion}>
                {item.header()}
              </Accordion.Header>
              {/* 아코디언 아이템 패널 컴포넌트 */}
              <Accordion.Panel>{item.panel()}</Accordion.Panel>
            </Accordion.Item>
          )
        })}
      </Accordion>
    </div>
  )
}
