let app = document.querySelector(".app")
let submit = document.querySelector(".submit")
let category = document.querySelector(".infoText")
let text =(e)=>document.createTextNode(e)
function random(max){
  return Math.floor(Math.random() *(max))
}
let count = 0
let firstClick = true
let bigA=[]
const fetchData = async()=>{
  let data1 = await fetch("https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=5&difficulty=easy");
  let data = await data1.json()
  let chosen=[]
  let dataI = 0
  category.innerHTML=data[dataI].category
  for(let i =count;i<data.length + count;i++){
    if(dataI < data.length){
      bigA.push(data[dataI].correctAnswer)
    //
    let item =document.createElement("div");
    item.classList.add("item");
    //
    console.log("in")
    let question =document.createElement("div")
    question.classList.add("question");
    question.appendChild(text(data[dataI].question))
    //
    let answers =document.createElement("div");
    answers.classList.add("answers");
    //
    let rAnswers = data[dataI].incorrectAnswers.map(e=>e)
    rAnswers.splice(random(data[dataI].incorrectAnswers.length + 1),0 ,data[dataI].correctAnswer)
    for(let x=0;x<rAnswers.length;x++){
      let answer =document.createElement("div");
      let label = document.createElement("label");
      let input = document.createElement("input");
      input.type="radio"
      input.id=`a${i+1}-${x+1}`
      input.name=`answer${i+1}`
      input.dataset.answer= rAnswers[x]
      label.htmlFor=`a${i+1}-${x+1}`
      label.className=`a${i+1}`
      label.appendChild(text(rAnswers[x]))
      answer.appendChild(input)
      answer.appendChild(label)
      answer.classList.add("answer");
      answers.appendChild(answer);
    }
    //append
    item.appendChild(question);
    item.appendChild(answers);
    app.appendChild(item);
    console.log(dataI)
    dataI++
    }
  }
  console.log(bigA)
  submit.onclick=()=>{
    if(firstClick){
      bigA.forEach((e, i) => {
        let list = document.getElementsByName(`answer${i+1}`)
        let labels = document.querySelectorAll(`.a${i+1}`)
        list.forEach(e=>e.style.pointerEvents="none")
        labels.forEach(e=>e.style.pointerEvents="none")
        for(let y=0;y<list.length;y++){
          if(list[y].checked && list[y].dataset.answer === bigA[i]){
            labels[y].style.color="green"
            chosen.push(list[y].dataset.answer)
          }else if(list[y].checked && list[y].dataset.answer !== bigA[i]){
            labels[y].style.color="red"
            chosen.push(list[y].dataset.answer)
          }else if(!list[y].checked && list[y].dataset.answer === bigA[i]){
            labels[y].style.color="green"
          }
        }
      });
      bigA.every((e, i)=>{
        return e == chosen[i]
      })?console.log("yes"):console.log("no")
      firstClick = !firstClick
    }else{
      count+=5
      fetchData()
      firstClick = !firstClick
    }
  }
}
fetchData()