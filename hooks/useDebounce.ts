



import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

//   default debounced is the value we give. 

// here we set our delay which is .5 seconds of nontyping. I dont think we need to change it tho

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)

// this results in no overflow. we dont want that to accidentally happen.

    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce