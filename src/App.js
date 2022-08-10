import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GameSnake } from './components/GameSnake';
import { useState } from 'react';
import { CreateUserForm } from './components/CreateUserForm';
import createUser from './services/createUser'
import login from './services/loginUser';
import { Notifications } from './components/Notifications';
import { LoginUserForm } from './components/LoginUserForm';

function App() {

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

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

  const handleLoginUser = async (user) => {
    try {
      const result = await login.loginUser(user);
      setUser(result);
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

  return (
    <div className="App">
      <Notifications message={message} />
      {
        user === null
          ? (
            <>
              <LoginUserForm handleLoginUser={handleLoginUser} />
              <CreateUserForm handleAddUser={handleAddUser} />
            </>
          )
          : (
            <>
              <GameSnake />
              .
            </>
          )
      }
    </div>
  );
}

export default App;
