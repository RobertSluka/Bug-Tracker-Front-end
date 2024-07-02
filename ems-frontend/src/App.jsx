import './App.css'
import { FooteComponent } from './components/FooteComponent'
import HeaderComponent from './components/HeaderComponent'
import ListUsersComponent from './components/ListUsersComponent'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import UserComponent from './components/UserComponent'
import LoginComponent from './components/LoginComponent'
function App() {
  

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
          <Routes>
      
          <Route path='/' element= {<ListUsersComponent/>}></Route>
        
          <Route path='/users' element= {<ListUsersComponent/>}></Route>

          <Route path='/user/register' element= {<UserComponent/>}></Route>

          <Route path='/user/update/:id' element= {<UserComponent/>}></Route>
          
          <Route path='/login' element= {<LoginComponent/>}></Route>

          </Routes>
        <FooteComponent/>
      </BrowserRouter>
    </>
  )
}

export default App