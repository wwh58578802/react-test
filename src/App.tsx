import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Route } from '@/router/router'

const App: React.FC = () => {
    return (
        <RouterProvider router={Route} />
    )
}
export default App