import { createContext, useContext } from 'react'

export type CursorVariant = 'default' | 'hover' | 'text' | 'view'

interface CursorContextValue {
  variant: CursorVariant
  setVariant: (variant: CursorVariant) => void
}

export const CursorContext = createContext<CursorContextValue>({
  variant: 'default',
  setVariant: () => {},
})

export function useCursor() {
  return useContext(CursorContext)
}

/**
 * Spread the returned handlers onto any element to morph the custom cursor
 * while hovering it, e.g. `<a {...useCursorState('view')}>`.
 */
export function useCursorState(variant: CursorVariant) {
  const { setVariant } = useCursor()
  return {
    onMouseEnter: () => setVariant(variant),
    onMouseLeave: () => setVariant('default'),
  }
}
