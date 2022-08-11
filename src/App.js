import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GameSnake } from './components/GameSnake';
import { useEffect, useState } from 'react';
import { CreateUserForm } from './components/CreateUserForm';
import createUser from './services/createUser'
import login from './services/loginUser';
import { Notifications } from './components/Notifications';
import { LoginUserForm } from './components/LoginUserForm';
import { Togglable } from './components/Togglable';

function App() {

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const userCredentials = window.localStorage.getItem('loginUser');
    if(userCredentials){
      const user = JSON.parse(userCredentials);
      setUser(user);
    }
  },[])
  const handleLoginUser = async (user) => {
    try {
      const result = await login.loginUser(user);
      setUser(result);
      window.localStorage.setItem('loginUser',JSON.stringify(result));
      console.log(result);
      setMessage('login success')
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      setMessage(`[ERROR] ${error.response.data.error}`)
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };
  
  const handleAddUser = async (newUser) => {
    try {
      await createUser.createUser(newUser)
      setMessage(`CREATED USER`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.log('only-error', error.response.data.error);
      setMessage(`[ERROR] ${error.response.data.error}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleSignOut = () => {
      window.localStorage.removeItem('loginUser')
      setUser(null);
  };

  console.log('app render');

  return (
    <div className="App">
      <Notifications message={message} />
      {
        user === null
          ? (
            <>
              <div className='p-5'>
                <p>LOGIN</p>
                <Togglable initialVisibility={true} buttonText={'sign in'} styleButton={'toggleButton'}>
                  <LoginUserForm handleLoginUser={handleLoginUser} />
                </Togglable>
              </div>
              <div className='px-5'>
                <p>CREATE USER</p>
                <Togglable styleButton={'toggleButton'} buttonText={'Create Account'}className='createUserContainer' >
                  <CreateUserForm handleAddUser={handleAddUser} />
                </Togglable>
              </div>
            </>
          )
          : (
            <>
              <GameSnake handleSignOut={handleSignOut} />
            </>
          )
      }
    </div>
  );
}

export default App;
