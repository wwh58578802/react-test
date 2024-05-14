import { createHashRouter } from 'react-router-dom'
import Miners from '@/pages/miners/miners'

export const Route = createHashRouter([
    {
        path: '/',
        element: <Miners />
    },
])