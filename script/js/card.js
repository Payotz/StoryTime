function Card(ctx,name,description,img,xpos,ypos,width,height){
    this.true_x = xpos;
    this.true_y = ypos;
    this.true_width = width;
    this.true_height = height;
    this.trueTitleFont = "24px arial"
    this.trueDescFont = "12px arial"
    this.x = this.true_x;
    this.y = this.true_y;
    this.width = this.width;
    this.height = this.height;
    this.titleFont = this.trueTitleFont
    this.descFont = this.trueDescFont
    this.dragged = false;
    this.hoverBool = false

    this.contains = function(x,y){
      return this.true_x <= x && x <= this.true_x + this.true_width &&
             this.true_y <= y && y <= this.true_y + this.true_height;
    }
    this.draw = function(){
      var img_element = new Image(32,32)
      var xpos = this.x
      var ypos = this.y
      var widthSize = this.width
      var heightSize = this.height
      img_element.src = img
      img_element.addEventListener('load',function(){
        ctx.drawImage(img_element,xpos,ypos + heightSize * 0.20,widthSize,heightSize *0.40)
      })
      ctx.beginPath()
      ctx.rect(this.x,this.y,this.width,this.height)
      ctx.stroke()
      ctx.closePath()
      ctx.font = this.titleFont
      ctx.fillText(name,this.x + ((this.width/2) * 0.50),this.y + (this.height * 0.10))
      if(this.hoverBool){
        ctx.font = this.descFont
        fillTextMultiLine(ctx,description,this.x,this.y + (this.height * 0.80))
      }
    }
    this.hover = function(x,y){
      if(this.contains(x,y) && !this.hoverBool){
        this.x = canvas.width/2
        this.y = canvas.height/2
        this.width = 400
        this.height = 300
        this.hoverBool = true
        this.titleFont = "48px arial"
        this.descFont = "24px arial"
      }else if(this.dragged){
        this.x = x
        this.y = y
      }else if (!this.contains(x,y)){
        this.x = this.true_x
        this.y = this.true_y
        this.width = this.true_width
        this.height = this.true_height
        this.hoverBool = false
        this.titleFont = this.trueTitleFont
        this.descFont = this.trueDescFont
        this.hoverBool = false
      }
    }
  }
  
  function fillTextMultiLine(ctx,text,x,y){
    var lineHeight = ctx.measureText("M").width * 1.2
    var lines = text.split("\n");
    for(var i = 0; i < lines.length; i++){
      ctx.fillText(lines[i],x,y);
      y+= lineHeight;
    }
  }

  function windowToCanvas(cnvs,x,y){
    var bbox = cnvs.getBoundingClientRect()
    return {
      x: x - bbox.left * (canvas.width  / bbox.width),
      y: y - bbox.top  * (canvas.height / bbox.height)
    }
  }