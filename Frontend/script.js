const loginForm = document.getElementById("newLogin");
const signupForm = document.getElementById("newSignup");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector(".signup-link a");
const loginText = document.querySelector(".titleText .login");
const signupText = document.querySelector(".titleText .signup");
const invalidspan = document.getElementById("invalid-text");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};

loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};

signupLink.onclick = () => {
  signupBtn.click();
  return false;
};


// CONNECTION
let url='http://localhost:4500'
document.getElementById('register_btn').addEventListener('click',()=>{
    const name=document.getElementById('sign-up-username').value
    const email=document.getElementById('sign-up-email').value
    const pass=document.getElementById('sign-up-password').value
    fetch(`${url}/users/register`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            name, email,pass
        })
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.msg==='user has been registered')
        {
            // localStorage.setItem('name',data.name)
            invalidspan.innerHTML=`${data.msg}`;
            invalidspan.style.color = "green"
        }
    })
    .catch(err=>console.log(err))
})

// SIGNUP
document.getElementById('login-button').addEventListener('click',()=>{
    const email=document.getElementById('login-email').value
    const pass=document.getElementById('login-pass').value
    fetch(`${url}/users/login`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({email,
        pass})
    })
    .then(res=>res.json())
    .then(data=>{
        console.log("HELLO")
        console.log(data)
        if(data.msg==='Login Successfull!')
        {
            console.log(data.user.email);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem('token',data.token);
            localStorage.setItem('name',data.user.name);
            
            window.location.href= './dashboard.html';
        }
    })
    .catch(err=>console.log(err))
})