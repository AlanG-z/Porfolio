import { useEffect, useRef, useState } from 'react'

const canObserve = typeof IntersectionObserver === 'function'

function Reveal({ children, className = '', delay = '', as: Tag = 'div', ...props }) {
  const [visible, setVisible] = useState(!canObserve)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !canObserve) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const classes = ['reveal', visible && 'visible', delay, className].filter(Boolean).join(' ')

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  )
}

export default Reveal