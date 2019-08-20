/**
 * Created by пользователь on 19.08.2019.
 */

// var ele = document.forms[0];
// if(ele.addEventListener){
//     ele.addEventListener("submit", callback, false);  //Modern browsers
// }else if(ele.attachEvent){
//     ele.attachEvent('onsubmit', callback);            //Old IE
// }

var xhr = new XMLHttpRequest();
var flag=0;
function callback() {
    var form=document.forms[0];
    var email=form.elements.email.value;
    var password=form.elements.password.value;

    var url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.onreadystatechange = function () {
    //     //if (xhr.readyState === 4 && xhr.status === 200) {
    //         var json = JSON.parse(xhr.responseText);
    //         alert(json.name + ", " + json.photoUrl);
    //     //}
    // };
    var data = JSON.stringify({"email": email, "password": password});
    xhr.send(data);
    xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //успешно
            var resp = JSON.parse(xhr.responseText);
            var name=resp.name;
            var photo=resp.photoUrl;
            //alert(name+" "+ photo);
            //очистка формы
            form.innerHTML='';
            //
            var logout=document.createElement('input');
            logout.setAttribute("value","Logout");
            logout.setAttribute("type","submit");
            logout.className="Rectangle-7";
            form.prepend(logout);
            //имя пользователя
            var div=document.createElement('div');
            div.className="Helena-Joseph";
            div.innerHTML=name;
            form.prepend(div);
            //отображение аватара
            var img=document.createElement('img');
            img.className="Oval-2";
            img.setAttribute('src',photo);

            form.prepend(img);
        }
        else if (xhr.readyState === 4 && xhr.status === 400){
            resp = JSON.parse(xhr.responseText);
            //alert(resp.error);
            form.elements.email.className="Rectangle-4-i";
            //error message
            if(!flag) {
                var err = document.createElement('div');
                err.className = "Error";
                err.innerHTML = resp.error;
                form.elements.password.after(err);
                flag = 1;
            }
        }
    };

}

