import { useMemo, useState, type ReactNode } from 'react'
import { CursorContext, type CursorVariant } from '../hooks/useCursorState'

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default')
  const value = useMemo(() => ({ variant, setVariant }), [variant])
  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
}
