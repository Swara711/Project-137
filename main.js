status1= "";
objects= [];
object_name = "";

function setup(){
    canvas= createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status1= true;
}

function draw(){
    image(video,0,0,480,380);
    if(status1 != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+ objects.length;

        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == object_name){;
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("objects").innerHTML = object_name+"Found";
                var utterthis = new SpeechSynthesisUtterance(speak_data); 
                synth.speak(utterthis);
            }
            else{
                document.getElementById("objects").innerHTML = object_name+"Not found"; 
            }
        }
    }
}

function gotResult(error,results){
    if(error){
       console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
