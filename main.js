nose_x = 0;
nose_y = 0;
difference = 0;
leftWrist_x = 0;
rightWrist_x = 0;

function preload()
{

}

function setup()
{
    video = createCapture(VIDEO);
    video.size(500,500);

    canvas = createCanvas(300,300);
    canvas.position(560,150);

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        nose_x = results[0].pose.nose.x;
        nose_y = results[0].pose.nose.y;
        console.log("nose_x= " + nose_x + "nose_y= " + nose_y);
        leftWrist_x = results[0].pose.leftWrist.x;
        rightWrist_x = results[0].pose.rightWrist.x;
        difference = floor(leftWrist_x - rightWrist_x);
        console.log("leftWrist_x= " + leftWrist_x + "rightWrist_x= " + rightWrist_x);
    }
}

function draw()
{
    background('#0400ff');

    fill('#2fff00');
    stroke('#ffffff');
    square(nose_x,nose_y,difference);
    document.getElementById("px").innerHTML = "The result is = " + difference;
}