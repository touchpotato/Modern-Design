const track = document.getElementById("image-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercent = track.dataset.percentage;
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercent = parseFloat(track.dataset.prevPercent) + percentage;

    
    track.dataset.percentage = nextPercent;
    
    track.animate({
        transform: `translate(${nextPercent}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for(const image of track.getElementsByClassName("img")) {
        image.animate({
            objectPosition: `${nextPercent + 100}% 50%`
        }, { duration: 1200, fill: "forwards" });
    }
}