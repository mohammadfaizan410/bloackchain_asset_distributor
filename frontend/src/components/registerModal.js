import React from "react";


export default function RegisterModal([openAction, closeAction, accountAddress]) {
    const [registerDetails, setRegisterDetails] = React.useState({
        username : '',
        email : '',
        password : '',
    });
    const [loading, setLoading] = React.useState(false);
    function postRegisterDetails(){
        setLoading(true);
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerDetails),
        })
        .then(response => {
            response.json()
        })
        .then(data => {
            console.log('Success:', data);
            setLoading(false);
            closeAction();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };    
    return(
           <div className="register-modal-wrapper">
                <form>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={(e)=>setRegisterDetails({...registerDetails, username: e.target.value})}/>
                    <label>Email:</label>
                    <input type="text" name="email" onChange={(e)=>setRegisterDetails({...registerDetails, email: e.target.value})}/>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={(e)=>setRegisterDetails({...registerDetails, password: e.target.value})}/>
                    <button type="button" onClick={()=>postRegisterDetails()}>Register</button>
                </form>
           </div>
        );
};