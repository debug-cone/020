import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { logoutUserAction } from "../store/userSlice"

function ProfilePage() {
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const { user } = useSelector(state => state.userStore)

  function logoutUser() {
    dispatch(logoutUserAction())
    navigation('/register')
  }

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8 px-4 md:flex-row">
        <img 
        className="h-[200px] w-[200px] rounded-full object-cover"
        src={user.image} 
        alt={user.firstName} 
        />

        <div className="bg-gray-600 w-full rounded-3xl text-white flex flex-col items-start gap-4 p-4">
          <h2>First Name: {user.firstName}</h2>
          <h2>Last Name: {user.lastName}</h2>
          <h3>E-Mail: {user.email}</h3>
          <h3>Date of Birth: {user.birthDate}</h3>
          <h3>Gender: {user.gender}</h3>
          <button onClick={logoutUser} className="px-4 py-2 bg-blue-600 text-white rounded-md">Logout</button>
        </div>

    </div>
  )
}

export default ProfilePage