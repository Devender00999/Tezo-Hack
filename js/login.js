var email = document.getElementById("lemail");
var pass = document.getElementById("lpassword");
var submit = document.getElementById("lsubmit");

fetch(
    "https://spreadsheets.google.com/feeds/list/15sBi87S9-tz42qaZsmOWfX2h1yhctL59kiFpqcEFuvk/1/public/full?alt=json"
)
.then((res) => res.json())
.then((data) => {
    var totalAccounts = data["feed"]["entry"].length;
    var Account = data["feed"]["entry"];
    submit.addEventListener("click", () => {
        let flag1 = -1, flag2 = -1;
        for(let i = 0; i < totalAccounts; i++){
            if(email.value === Account[i]["gsx$email"]["$t"]){
                flag1 = 1;
                if(pass.value === Account[i]["gsx$password"]["$t"]){
                    flag2 = 1;
                    sessionStorage.setItem('name',Account[i]["gsx$name"]["$t"]);
                    sessionStorage.setItem("isLogined",1);
                    window.location.href = "./listener/";
                }
            }
        }
        if(flag1 == -1 || flag2 == -1){
            alert("Email or Password not found");
        }   
    })
})