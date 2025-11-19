document.getElementById("startBtn").addEventListener("click", function(){
    const file = document.getElementById("fileInput").files[0];

    if(!file){
        alert("Please upload an image first!");
        return;
    }

    alert("Design Generated Successfully! (Dummy Demo)");
});
<script src="script.js"></script>
