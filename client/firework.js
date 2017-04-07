var outerColor = "CC66FF";
var innerColor = "CC66FF";
var angle = 90+180;
var timer = 3000;
var height = 100;

var rocket;

const setOuterColor = (e) => {
    console.log("outter Set: " + e);
    outerColor = e;
    minUpdate();
};
const setInnerColor = (e) => {
    console.log("inner Set: " + e);
    innerColor = e;
    minUpdate();
};
const setAngle = (e) =>{
    angle = e;
    angle = +angle + 180;
    console.log("Angle: " + e + " angle+180: " + angle);
    minUpdate();
}
const setTimer = (e) =>{
    timer = e;
    minUpdate();
}
const setHeight = (e) =>{
    height = e;
    height *= -1;
    height += 500;
    minUpdate();
}
const minUpdate = () => {
    //clear canvas
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    
    //outter
    ctx2.fillStyle = "#" + outerColor;
    ctx2.beginPath();
    ctx2.arc(50,50,45,0,2*Math.PI);
    ctx2.stroke();
    ctx2.fill();
    
    //inner
    ctx2.fillStyle = "#" + innerColor;
    ctx2.beginPath();
    ctx2.arc(50,50,20,0,2*Math.PI);
    ctx2.stroke();
    ctx2.fill();
    
    //angle line
    ctx2.save();
    ctx2.moveTo(50,50);
    ctx2.lineTo(50 + 50 * Math.cos(Math.PI * angle / 180.0), 50 + 50 * Math.sin(Math.PI * angle / 180.0));
    ctx2.stroke();
    ctx2.restore();
    
    rocket = {
        out : outerColor,
        in : innerColor,
        ang : angle,
        x : 0,
        y : 450,
        time : timer,
        velY: 2.5,
        ht: height,
        id: 0
    };
    
    currentRocket = rocket;
};