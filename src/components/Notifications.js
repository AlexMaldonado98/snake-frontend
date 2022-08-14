export const Notifications = ({message}) => {
   if(message === null){
    return null
   }

   if(message.includes('[ERROR]')){
        return <p className="error-notification border border-danger text-danger" >{message.slice(7,message.length)}</p>
    }else{
        return <p className="success-notification border border-success text-success position-absolute" >{message}</p>
    }
   
};