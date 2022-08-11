import { useState } from "react";

export const CreateUserForm = ({handleAddUser}) => {
   const [username,setUsername] = useState('');
   const [password,setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        const newUser = {
            username,
            password
        }
        handleAddUser(newUser);
        setUsername('');
        setPassword('');
    };


   return(
        <form onSubmit={handleSubmit} className='d-flex flex-column flex-end align-items-end'>
            <div>username:
                <input
                    type='text'
                    name='username'
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>password:
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit" >Create User</button>
        </form>
   );
};