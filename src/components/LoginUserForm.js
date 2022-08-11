import { useState } from "react";

export const LoginUserForm = ({handleLoginUser}) => {
   const [userData, setUserData] = useState({username:'',password:''});
   const handleChangeForm = ({target}) => {
       const {name,value} = target;
       setUserData({...userData,[name]: value})
   };

   const handleSubmit = (event) => {
       event.preventDefault();
       handleLoginUser(userData);
       setUserData({username:'',password:''})
   };

   return(
      <form onSubmit={handleSubmit} className='d-flex flex-column flex-end align-items-end' >
            <div>username:
                <input
                    type='text'
                    name='username'
                    value={userData.username}
                    onChange={handleChangeForm}
                />
            </div>
            <div>password:
                <input
                    type='password'
                    name='password'
                    value={userData.password}
                    onChange={handleChangeForm}
                />
            </div>
            <button type="submit" >login</button>
        </form>
   );
};