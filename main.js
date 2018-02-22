window.onload = function() {
    var frameId;
    var currentPos = 0;
    var canvas = document.getElementById('canvas');
    var startButton = document.getElementById("start");
    var stopButton = document.getElementById("stop");
    var score = document.getElementById("score");
    var ctx = canvas.getContext('2d');
    var arrRectangles = [];
    var count = 0;
    var timer = 1000;
    var width = 40;
    var height = 40;
    var intervalId;

    startButton.addEventListener("click", startAnimate, false);
    stopButton.addEventListener("click", stopAnimate, false);

    canvas.addEventListener("click", function(event) {
        var coordinates = getCursorPosition(canvas, event);

        for (var i = 0; i < arrRectangles.length; i++) {

            if (coordinates.x >= arrRectangles[i].left &&
                coordinates.x <= arrRectangles[i].left + width &&
                coordinates.y >= arrRectangles[i].top &&
                coordinates.y <= arrRectangles[i].top + height) {
                arrRectangles.splice(i, 1);
                count++;
                showScore();
            }
        }
    }, false);

    function startAnimate() {
        showScore();
        intervalId = setInterval(function() {
            arrRectangles.push(getNewRect());
        }, randomInteger(500, 3500))
        frameId = requestAnimationFrame(animate);
    }

    function stopAnimate() {
        startButton.disabled = false;
        cancelAnimationFrame(frameId);
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
        count = 0;
        arrRectangles = [];
        showScore();
        clearInterval(intervalId);
    }

    function animate() {
        startButton.disabled = true;
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
        if (arrRectangles.length > 0) {
            for (var j = 0; j < arrRectangles.length; j++) {
                if (arrRectangles[j].top >= canvas.clientHeight) {
                    arrRectangles.splice(j, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.fillStyle = arrRectangles[j].color;
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 2;
                ctx.fillRect(arrRectangles[j].left, arrRectangles[j].top, width, height);
                ctx.fill();
                arrRectangles[j].top += arrRectangles[j].speed;
            }
        }
        frameId = requestAnimationFrame(animate);
    }

    function getCursorPosition(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return { x: x, y: y };
    }

    function randomInteger(min, max) {
        var rand = (min + Math.random() * (max + 1 - min));
        rand = Math.floor(rand);
        return rand;
    }

    function randomColor() {
        var color = "#" + randomInteger(0, 9) + randomInteger(0, 9) + randomInteger(0, 9) + randomInteger(0, 9) + randomInteger(0, 9) + randomInteger(0, 9);
        return color;
    }

    function getNewRect() {
        var newRect = {};
        newRect.left = randomInteger(0, 600);
        newRect.color = randomColor();
        newRect.speed = randomInteger(1, 5);
        newRect.top = 0;
        return newRect;
    }

    function showScore() {
        score.innerHTML = count;
    }
};