const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){ //for creating dropdowns
    for(currCode in countryList){ //for fetching currency code from countrylist
        let newoption =document.createElement("option");//creating a option ,Eg: <option value="USD">USD</option>
        newoption.innerText=currCode;
        newoption.value=currCode;
        if(select.name ==="from" && currCode==="USD"){
            newoption.selected="selected";  //If page gets refreshed it should show USD in from,and INR in to.
        }
        if(select.name ==="to" && currCode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updatFlag(evt.target);
        console.log(evt.target);
        
    });
}

const updatFlag=(element)=>{
    console.log(element);
    let currCode=element.value;
    console.log(currCode);
    let countryCode=countryList[currCode];
    console.log(countryList[currCode]);
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();//stopping default submit changes.(cuz we are going to handle it)
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    console.log(amtval);
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    
    console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let responce=await fetch(URL);
    // console.log(responce);
    let data=await responce.json();
    // console.log(data);
    let rate=data[toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalAmt=amtval*rate;
    msg.innerText=`${amtval} ${fromCurr.value}=${finalAmt} ${toCurr.value} `



});