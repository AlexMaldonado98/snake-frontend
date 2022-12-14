import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GameSnake } from './components/GameSnake';
import { useEffect, useState } from 'react';
import { CreateUserForm } from './components/CreateUserForm';
import createUser from './services/createUser'
import login from './services/loginUser';
import scoreServices from './services/score'
import { Notifications } from './components/Notifications';
import { LoginUserForm } from './components/LoginUserForm';
import { Togglable } from './components/Togglable';
import jwt from 'jwt-decode';
import { BoardScore } from './components/BoardScores';

function App() {

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const util = async () => {
      const scoresInDb = await scoreServices.getScore();
      setScores(scoresInDb);
      const userCredentials = window.localStorage.getItem('loginUser');
      if (userCredentials) {
        const user = JSON.parse(userCredentials);
        scoreServices.setFormatToken(user.token);
        setUser(user);
      }
    }
    util();
  }, [])

  const handleLoginUser = async (user) => {
    try {
      const result = await login.loginUser(user);
      scoreServices.setFormatToken(result.token);
      setUser(result);
      window.localStorage.setItem('loginUser', JSON.stringify(result));
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
    window.location.reload();
  };

  const handleAddNewScore = async (score) => {
    const scoresInDB = await scoreServices.getScore();
    const { id, username } = jwt(user.token)
    let scoreOfUser = scoresInDB.find(score => (score.user.id === id));

    if (scoreOfUser) {
      if (score > scoreOfUser.score) {
        const result = await scoreServices.putScore(scoreOfUser.id, score)
        result.user = { id: result.user, username: username }
        setScores(scoresInDB.map(score => score.id === result.id ? result : score));
      }
    } else if (scoreOfUser === undefined) {
      const result = await scoreServices.create(score);
      result.user = { id: result.user, username: username }
      setScores(scoresInDB.concat(result));
    }
  };

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
                <Togglable styleButton={'toggleButton'} buttonText={'Create Account'} className='createUserContainer' >
                  <CreateUserForm handleAddUser={handleAddUser} />
                </Togglable>
              </div>
            </>
          )
          : (
            <>
              <GameSnake handleSignOut={handleSignOut} handleAddNewScore={handleAddNewScore} scores={scores} />
              <Togglable buttonText={'Scores'} classTogabble='togglable'>
                <BoardScore scores={scores} user={user} />
              </Togglable>
            </>
          )
      }
    </div>
  );
}

export default App;
