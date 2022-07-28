import styled from 'styled-components/macro'
import { motion } from 'framer-motion'

// ------------------------------------------------------------------------
// 컨테이너
export const Container = styled.ul.attrs(({ spaceX = 0, spaceY = 16 }) => ({
  role: 'tablist',
  margin: `${spaceY}px ${spaceX}px`,
}))`
  margin: ${({ margin }) => margin};
  padding-left: 0;
  list-style: none;
`

// ------------------------------------------------------------------------
// 아이템
export const Item = styled.li.attrs(() => ({
  role: 'none',
}))`
  margin-bottom: 10px;
`

// ------------------------------------------------------------------------
// 헤더
export const Header = styled.button.attrs(({ id, expanded, disabled }) => ({
  role: 'tab',
  id: `${id}-header`,
  'aria-controls': `${id}-panel`,
  'aria-expanded': expanded,
  'aria-disabled': disabled,
}))``

// ------------------------------------------------------------------------
// 패널
export const Panel = styled(motion.div).attrs(({ id }) => ({
  role: 'region',
  id: `${id}-panel`,
  'aria-labelledby': `${id}-header`,
}))`
  overflow: hidden;
  height: 0;
`
