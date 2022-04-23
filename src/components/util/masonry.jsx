import React, { useState, useEffect, useMemo } from 'react'
import useMeasure from 'react-use-measure'
import { useTransition, a } from '@react-spring/web'
import shuffle from 'lodash.shuffle'

import useMedia from './useMedia'
import data from './data'

import styles from './styles.module.css'


const mockData = [
  { css: 'https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg', height: 150 },
  { css: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg', height: 300 },
  { css: 'https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg', height: 300 },
  { css: 'https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg', height: 300 },
  { css: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg', height: 300 },
  { css: 'https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg', height: 300 },
  { css: 'https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg', height: 200 },
  { css: 'https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg', height: 300 },
  { css: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg', height: 200 },
  { css: 'https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg', height: 400 },
  { css: 'https://images.pexels.com/photos/2736834/pexels-photo-2736834.jpeg', height: 200 },
  { css: 'https://images.pexels.com/photos/249074/pexels-photo-249074.jpeg', height: 150 },
  { css: 'https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg', height: 400 },
  { css: 'https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg', height: 200 },
]


export default ({data=mockData,children}) => {
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [5, 4, 3], 2)
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure()
  // Hook3: Hold items
  const [items, set] = useState(data)
  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    const t = setInterval(() => set(shuffle), 2000)
    return () => clearInterval(t)
  }, [])
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
    let gridItems = items.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column // x = container width / number of columns * column index,
      const y = (heights[column] += child.height / 2) - child.height / 2 // y = it's just the height of the current column
      return { ...child, x, y, width: width / columns, height: child.height / 2 }
    })
    return [heights, gridItems]
  }, [columns, items, width])
  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item: { css; height }) => item.css,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  })
  // Render the grid
  return (
    <div ref={ref} className={styles.list} style={{ height: Math.max(...heights) }}>
      {transitions((style, item) => (
        <a.div style={style}>
          <div style={{ backgroundImage: `url(${item.css}?auto=compress&dpr=2&h=500&w=500)` }} />
        </a.div>
      ))}
    </div>
  )
}
 
