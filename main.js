leftWristScore = 0;
rightWristScore=0;

rightWristY=0;
rightWristX=0;

leftWristY=0;
leftWristX = 0;

function preload()

{
Song1= loadSound("music.mp3");

Song2 = loadSound("music2.mp3");


}
function setup(){
    video = createCapture(VIDEO);
    video.size(400,400);
    video.position(10,50);

    canvas = createCanvas(800,400);
    canvas.position(430,130);

    poseNet = ml5.poseNet(video,modelDone);
    poseNet.on('pose',gotposes);
}

function draw(){

    background("#5196e3");

    color("#FF0000");
    stroke("#FF0000");
    circle(leftWristX, leftWristY, 20);

    IsPlaying1 = Song1.isPlaying()

    if(leftWristScore < 0.2)
    {
        color("#FF0000");
        stroke("#FF0000");
        circle(leftWristX, leftWristY, 20);

        Song2.stop();
    }
    if(IsPlaying1 == "false")
    {
        Song1.play();
    }

    if(rightWristScore < 0.2)
    {
        color("#FF0000");
        stroke("#FF0000");
        circle(rightWristY, rightWristY, 20);

        Song1.stop();
    }
    if(IsPlaying1 == "false")
    {
        Song2.play();
    }
    

}

function modelDone(){
    console.log("PoseNet Is Initialized And Loaded");
}

function gotposes(results,error){

    leftWrist = results[0].pose.keypoints[9].score;
    if(error){
        console.error(error);
    }
    if(results.length > 0){
        console.log(results);

        console.log("rightWrist_x = "+results[0].pose.rightWrist.x + " rightWrist_y = "+results[0].pose.rightWrist.y);
        console.log("leftWrist_x = "+results[0].pose.leftWrist.x + " leftWrist_y = "+results[0].pose.leftWrist.y);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y
        leftWristScore = results[0].pose.keypoints[9].score;
    }
}