//左帯にユーザー名表示
document.addEventListener("DOMContentLoaded", function(){
  fetch(APIURL+"/check_auth").then((res)=> res.json()).then((res) => {
    if(res["status"] == "OK"){
      document.getElementById("yourname").textContent = "Hi! "+res["info"]["displayName"];
    }
  });
});

let add_product = document.getElementsByName("add_product")[0];
add_product.addEventListener("submit",function(event){
  productname = add_product.productname.value;
  price = add_product.price.value;
  description = add_product.description.value;
  fetch(APIURL+"/check_auth").then((res)=> res.json()).then((res) => {
    if(res["status"] == "OK"){
      obj = {"name":productname,"price":price,"descript":description,"owner":res["info"]["userid"].slice(0,8)};
      body = JSON.stringify(obj);
      fetch(APIURL+"/insert" , {method,headers,body}).then((res)=> res.json()).then((res) => {
        window.location.href = 'index.html';
      });
    }
  });
  event.preventDefault();
});
