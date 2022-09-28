import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List
const WrappedListItem = ({ index, isSelected, onClickHandler, text }) => {

  console.log(`💢${index} got re-rendered`)

  return (
    <li
      style={{backgroundColor: isSelected ? 'green' : 'red'}}
      
      // Wrong --> Correction (onClickHandle(index) --> () => onClickHandler(index))
      onClick={onClickHandler.bind(this, index)} 
    >
     { text }
    </li>
  )
}


// Props Check for WrappedListItem
WrappedListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}


// Memoization of the Wrapped List Item
const SingleListItem = memo(WrappedListItem, (prev, next) => {
  const isSameHandler = prev.onClickHandler === next.onClickHandler

  return isSameHandler
})

const WrappedListComponent = ({ items }) => {

  // Wrong --> Correction ([setSelectedIndex, selectedIndex] --> [selectedIndex, setSelectedIndex])
  const [ selectedIndex, setSelectedIndex ] = useState()

  // Handle Click
  const handleClick = (index) => {
    setSelectedIndex(index)
  }


  // Setting the intital selection value
  useEffect( () => {
    setSelectedIndex(null)
  }, []) //Needed to add the dependency array other wise it will set active to null upon every update

  // Click Handler Function


  console.log(`😅😄 Re Rendering ul 😅😄`)

  // Component
  return (
    <ul style={{ textAlign: 'left' }}>
      { 
        // Mapping through the list items
        items.map((item, index) =>
          <SingleListItem
            key={index} //Key Assignment to fix the warning
            onClickHandler={handleClick.bind(this,index)}
            text={item.text}
            index={index}
            isSelected={selectedIndex === index ? true : false}
          />
        )
      }
    </ul>
  )

}

// Prop Check Wrapped List Component
WrappedListComponent.propTypes = {
  // Wrong --> Correct (array --> arrayOf)
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired
  }))
}

// Default Props
WrappedListComponent.defaultProps = {
  items: null
}

// Memoization of the Wrapped List Component
const List = memo(WrappedListComponent)

export default List
