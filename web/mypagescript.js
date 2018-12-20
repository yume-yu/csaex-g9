function add_item(title,price,descript){
  let newItem = document.createElement('div');
  newItem.setAttribute("class","col-lg-4 col-md-6 mb-4");
  let newCard = document.createElement('div');
  newCard.setAttribute("class","card h-100");
  let itemLink = document.createElement('a');
  itemLink.setAttribute("href","trade.html");
  let itemImage = document.createElement('img');
  itemImage.setAttribute("class","card-img-top");
  itemImage.setAttribute("src","http://placehold.it/700x400");
  itemLink.appendChild(itemImage);
  newCard.appendChild(itemLink);
  let itemCard = document.createElement('div');
  itemCard.setAttribute("class","card-body");
  let cardTitle = document.createElement('h4');
  cardTitle.setAttribute("class","card-title");
  let titleLink = document.createElement('a');
  titleLink.setAttribute("href","trade.html");
  titleLink.textContent = title;
  cardTitle.appendChild(titleLink);
  itemCard.appendChild(cardTitle);
  let cardPrice = document.createElement('h5');
  cardPrice.textContent = "¥"+price;
  itemCard.appendChild(cardPrice);
  let cardDescript = document.createElement('p');
  cardDescript.textContent = descript;
  itemCard.appendChild(cardDescript);
  let hr = document.createElement('hr');
  itemCard.appendChild(hr);
  let deleteBtn = document.createElement('a');
  deleteBtn.setAttribute("class","btn btn-success");
  deleteBtn.setAttribute("href","#");
  deleteBtn.style.marginRight = "10px";
  deleteBtn.textContent = "削除";
  itemCard.appendChild(deleteBtn);
  let tradeBtn = document.createElement('a');
  tradeBtn.setAttribute("class","btn btn-success");
  tradeBtn.setAttribute("href","#");
  tradeBtn.style.marginRight = "10px";
  tradeBtn.textContent = "取引";
  itemCard.appendChild(tradeBtn);
  newCard.appendChild(itemCard);
  newItem.appendChild(newCard);
  return newItem;
}

//ページ読み込み時に全商品を取得して並べる
document.addEventListener("DOMContentLoaded", function(){
  fetch(APIURL+"/check_auth").then((res)=> res.json()).then((res) => {
    if(res["status"] == "OK"){
      document.getElementById("yourname").textContent = "Hi! "+res["info"]["displayName"];
      obj = {"userid":res["info"]["userid"].slice(0,8)};
      body = JSON.stringify(obj);
      fetch(APIURL+"/search" , {method,headers,body}).then((res)=> res.json()).then((res) => {
        if(res["status"] == "OK"){
          let fragment = document.createDocumentFragment();
          for(item of res["items"]){
            if(item.active == 1){
              fragment.appendChild(add_item(item.name,item.price,item.description));
            }
          }
          document.getElementById("itemsrow").appendChild(fragment);
        }
      })
    }
  });
});
