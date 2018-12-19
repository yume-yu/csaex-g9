window.onload = loadPage;

function loadPage(){
  document.getElementById("ok").onclick=clickOK;
}

function clickOK(){
    var textID0 = text0;
    var textID1 = text1;
    var textID2 = text2;

    if(document.getElementById(textID0).value==""){
      create_account_error();
    }else if(document.getElementById(textID1).value==""){
      create_account_error();
    }else if(document.getElementById(textID2).value==""){
      create_account_error();
    }
    else{
      create_account_accept();
    }
  }


function create_account_error(){
  alert("正しく入力されてません。");
}

function create_account_accept(){
  alert("アカウントが登録されました。");
}

function error_alert(){
  alert("ERROR");
}

function logout_alert(){
  alert("ログアウトしました。");
}
function registration_complete(){
  alert("登録しました");
}
