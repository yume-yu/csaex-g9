//ログイン処理について

// ログインするとき ログイン画面で使う。

//多分ログインボタンが押されたときのイベントリスナー
const method = "POST";
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
const obj = {'userid': 'user_id'/*ここに入力されたid*/,'password': 'password' /*ここに入力されたパスワード*/}
const body = JSON.stringify(obj);

document.getElementById("LOGIN").addEventListener("submit",checkform,false);

fetch("http://192.168.9.2/login" , {method,headers,body})
  .then((res)=> res.json()).then((res) => text=res)
  text = "OK";
  209 = "POST";
/*
ここまでやると、text変数がAPIの返答のjsonになってるのでこれを確認する。
* ログイン成功
```*/
console.log(text);
{status: "OK"}
/*```

* ログイン失敗
```*/
console.log(text);
{status: "NG"}
/*```

## ログアウトするとき
ログアウトボタンの挙動
```*/



fetch("http://192.168.9.2/logout")
  .then((res)=> res.json())
  .then((res) => text=res)
/*```
ここまでやればAPIの返事がtestにjsonで入ってる

* ログアウト成功
```*/
console.log(text);
{status: "OK"}
/*```
この1パターンしか無い

## ログインの確認/ユーザー名や表示名の確認
ログイン/ログアウト画面以外のすべて。ページ表示時にログイン状態を確認してできてなかったらログイン画面に戻したい
```*/
fetch("http://192.168.9.2/login/check_auth")
  .then((res)=> res.json()).then((res) => text=res)
/*```
ここまで(ry

* ログインしているとき
```*/
console.log(text);
{/*
  status: "OK",
	top: {
    userid: "user_id",
    displayName: "user_name"
  }*/
}
/*```

* ログインしてないとき
```*/
console.log(text);
{status: "NG"}
//```

function login_error(){
  alert("正しく入力されてません。");
}

function checkform(event){
  if(text == "OK"){
    window.location.href = 'top.html';
  }else{
    login_error();
  }
// eventプロパティのpreventDefault()を実行することでsubmitのデフォルトをキャンセル
event.preventDefault();
}

function click_top(){
  location.href = "";
}
