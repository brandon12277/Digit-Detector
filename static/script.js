
      let model;let prev_id,id2;
     const canvas=document.getElementById("canvas");
     const sm=document.getElementById("canvas_small");
     const ctx=canvas.getContext("2d");
     const smBox = sm.getContext("2d");
     let start=false;
  
  
     async function init() {
      
      model= await tf.loadLayersModel("model/model.json");
      console.log("yes")
    }

    function getPixelData() {
      smBox.drawImage(ctx.canvas, 0, 0, sm.width, sm.height);
      const imgData = smBox.getImageData(0, 0, sm.width, sm.height);
    
      img=tf.browser.fromPixels(imgData,1)
      img = img.reshape([1,28, 28]);
      img=tf.cast(img,"float32")
      return img;
    }
  function predict() {
    let values = getPixelData();
    let predictions = model.predict(values);
  
    return predictions;
  }
  function animation(id,type){
    let count=0,flag=true;
    id2=setInterval(()=>{
       
          document.getElementById(id).style.width=count+"%";
          count++;
          if(count==100)clearInterval(id2)
    },20)

  }
  function updateDisplay() {
    let predictions=predict();
   let prediction=Array.from(predictions.dataSync())
    console.log(prediction)
    let id=prediction.indexOf(Math.max(...prediction))+"";
    prev_id=id;
    animation(id,"predict");
  }
  
  function erase() {
    ctx.fillStyle="white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    clearInterval(id2);
    document.getElementById(prev_id).style.width="0%";
    
    displayBox.innerText = '';
   
    
  }
     canvas.addEventListener("mousemove",(e)=>{
        if(start){
        
        ctx.strokeStyle="black";
        ctx.lineWidth=30;
        ctx.linCap="round";
        let X=e.clientX-canvas.offsetLeft;
        let Y=e.clientY-canvas.offsetTop;
        ctx.lineTo(X,Y);
        ctx.stroke();
        
        }
        
     })



     canvas.addEventListener("mousedown",(e)=>{
            start=true;
            ctx.beginPath();
        let newX=e.clientX-canvas.offsetLeft;
        let newY=e.clientY-canvas.offsetTop;
        ctx.moveTo(newX,newY)
     });
     canvas.addEventListener("mouseup",(e)=>{
            start=false;
     });