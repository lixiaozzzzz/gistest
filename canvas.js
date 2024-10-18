const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
// ctx.fillRect(20, 70, 200, 100);
// ctx.fillStyle = "red";

// ctx.lineWidth = 12;
// ctx.moveTo(10, 10);
// ctx.lineTo(20, 70);
// ctx.strokeStyle = "#dd3030";
// ctx.stroke();

ctx.beginPath();
ctx.arc(120, 150, 100, (Math.PI / 180) * 120, 2 * Math.PI, false);
ctx.strokeStyle = "#dd3030";
ctx.stroke();
