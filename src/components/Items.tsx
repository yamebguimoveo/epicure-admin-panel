import React from 'react'
import { Item } from './Item';



export const Items = (props:{items:Restaurant[]}) => {
  return (
      <div className="items">
          {props.items.map((item) => {
              return (<Item key={item._id} item={item}/>)
          })}
    </div>
  )
}