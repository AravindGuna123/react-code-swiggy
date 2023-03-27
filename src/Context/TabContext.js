import React from 'react'

const TabContext = React.createContext({
  activeTab: 'Home',
  changeTab: () => {},
})

export default TabContext
