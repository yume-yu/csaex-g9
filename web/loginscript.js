const APIURL = "http://localhost/api"
const method = "POST";
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};
let loginform = document.getElementsByName("loginform")[0];

function login(event){
  userid = loginform.userid.value;
  password = loginform.password.value;
  obj = {"userid":userid,"password":password};
  body = JSON.stringify(obj);
  try{
    fetch(APIURL+"/login" , {method,headers,body}).then((res)=> res.json()).then((res) => {
      if(res["status"] == "OK"){
        window.location.href = '/index.html';
      }else{
        loginform.password.value = "";
        alert("id/パスワードが違います");
      }
    })
  }catch(e){
    console.log(e);
  }
}

//submitが止められない
//loginform.addEventListener("submit",login());
