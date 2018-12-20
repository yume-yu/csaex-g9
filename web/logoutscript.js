document.querySelector('a[href="login.html"]').addEventListener("click",function(){
  fetch(APIURL+"/logout")
});
