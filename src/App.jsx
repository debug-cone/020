// outlet
import { Outlet } from 'react-router-dom'

//redux 
import { useDispatch } from 'react-redux'

//react
import { useEffect } from 'react'

// store
import { restoreUserAction } from './store/userSlice'

// navbar
import NavbarComponent from './components/NavbarComponent'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    dispatch(restoreUserAction(user))
  }, [])

  return (
    <div className="container mx-auto pt-5">
      <NavbarComponent />
      <Outlet />
    </div>
  )
}

export default App
