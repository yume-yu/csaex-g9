const APIURL = "http://localhost/api"
const method = "POST";
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

fetch(APIURL+"/check_auth").then((res)=> res.json()).then((res) => {
  if(res["status"] == "NG"){
    window.location.href = '/login.html';
  }
});
