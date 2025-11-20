document.getElementById("startBtn").addEventListener("click", async function () {

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload an image first!");
        return;
    }

    let imgURL = URL.createObjectURL(file);

    // Show preview
    let img = document.getElementById("preview");
    img.src = imgURL;
    img.style.display = "block";

    let loadedImg = new Image();
    loadedImg.src = imgURL;

    loadedImg.onload = async function () {

        // AUTODESIGN CANVAS
        let designCanvas = document.getElementById("designCanvas");
        let ctx = designCanvas.getContext("2d");

        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 400, 400);

        ctx.drawImage(loadedImg, 50, 50, 300, 300);

        ctx.fillStyle = "white";
        ctx.font = "22px Arial";
        ctx.fillText("Autodesign Layout", 90, 380);

        // LOAD AI MODEL
        const model = await cocoSsd.load({base: 'lite_mobilenet_v2'});

        let detectCanvas = document.getElementById("detectCanvas");
        let detectCtx = detectCanvas.getContext("2d");
        detectCanvas.width = loadedImg.width;
        detectCanvas.height = loadedImg.height;

        detectCtx.drawImage(loadedImg, 0, 0);

        

   
const predictions = await model.detect(loadedImg);

predictions.forEach(p => {
    detectCtx.strokeStyle = "lime";
    detectCtx.lineWidth = 3;
    detectCtx.strokeRect(p.bbox[0], p.bbox[1], p.bbox[2], p.bbox[3]);

    detectCtx.fillStyle = "lime";
    detectCtx.font = "16px Arial";
    detectCtx.fillText(p.class, p.bbox[0], p.bbox[1] - 5);
        });
    };
});
