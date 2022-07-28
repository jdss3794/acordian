import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Container, Item, Header, Panel } from './Accordion.styled'

// ------------------------------------------------------------------------
// 아코디언 메인(Main)
export default function Accordion({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

// ------------------------------------------------------------------------
// 아코디언 아이템(Item) (Compound Components)

const ItemContext = React.createContext()
const useItem = () => React.useContext(ItemContext)

Accordion.Item = function AccordionItem({
  index,
  expanded,
  disabled,
  children,
  ...restProps
}) {
  const { styledComponentId: id } = Item
  console.log(Item)
  return (
    <ItemContext.Provider
      value={{ id, index, expanded, disabled }}
      {...restProps}
    >
      <Item>{children}</Item>
    </ItemContext.Provider>
  )
}

// ------------------------------------------------------------------------
// 아코디언 아이템 헤더(Header) (Compound Components)

Accordion.Header = function AccordionHeader({
  onActive = null,
  children,
  ...restProps
}) {
  const { id, index, expanded, disabled } = useItem()
  const handleActivePanel = () => {
    onActive(index)
  }

  return (
    <Header
      id={id}
      expanded={expanded}
      disabled={disabled}
      onClick={handleActivePanel}
      {...restProps}
    >
      {children}
    </Header>
  )
}

// ------------------------------------------------------------------------
// 아코디언 아이템 패널(Panel) (Compound Components)

Accordion.Panel = function AccordionPanel(props) {
  const { id, expanded } = useItem()

  return (
    <AnimatePresence>
      {expanded && (
        <Panel
          id={id}
          variants={Accordion.Panel.variants}
          initial="hide"
          animate="show"
          exit="hide"
        >
          {props.children}
        </Panel>
      )}
    </AnimatePresence>
  )
}

Accordion.Panel.variants = {
  hide: {
    height: 0,
  },
  show: {
    height: 'auto',
    transition: {
      duration: 0.2,

      // 트윈 예제
      type: 'tween',
      ease: [0.04, 0.62, 0.23, 0.98],

      // 스프링 예제
      // type: 'spring',
      // stiffness: 100,
    },
  },
}
