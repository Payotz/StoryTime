var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var card_list = {}
var request = new XMLHttpRequest()
request.open('GET','rsc/cards.json',true)

request.onload = function(){
  if (request.status >= 200 && request.status < 400){
    var margin = 0
    var card_data = JSON.parse(request.responseText)
    for (var key in card_data["Story_Card"]){
      console.log(card_data["Story_Card"])
      var dummy = card_data["Story_Card"][key]
      card_list[key] = new Card(ctx,dummy["name"],dummy["description"],dummy["img_path"],canvas.width * 0.10 + margin,canvas.height * 0.75,50,100)
      margin += 100
    }
  }else{
    console.log("Error! Reached server but no response!")
  }
}
request.onerror = function(){
  console.log("Error. Could not find file")
}
request.send()

card_list[999] = new Card(ctx,"Sample location","Sample location","img",canvas.width /2 , 100, 50,100)
canvas.onmousemove = function(event){
  var loc = windowToCanvas(canvas,event.clientX,event.clientY)
  var number = 0
  ctx.clearRect(0,0,canvas.width,canvas.height)
  card_list[number].hover(loc.x,loc.y)
  ctx.beginPath()
  card_list[number].draw()
  ctx.rect(canvas.width /2 ,100,50,100)
  ctx.stroke()
  ctx.endPath()
}

canvas.onmousedown = function(event){
  var loc = windowToCanvas(canvas,event.clientX,event.clientY)
  if(card_list[0].contains(loc.x,loc.y)){
    card_list[0].dragged = true;
  }
}

canvas.onmouseup = function(event){
  var loc = windowToCanvas(canvas,event.clientX,event.clientY)
  if(card_list[0].dragged){
    if(canvas.width/2 <= loc.x && loc.x <= canvas.width/2 + 50 &&
      100 <= loc.y && loc.y <= 100 + 100){
        card_list[0].x = canvas.width/2
        card_list[0].y = 100
        card_list[0].width = 50
        card_list[0].height = 100
        card_list[0].set = true
      }
  }
  card_list[0].dragged = false;
  
}