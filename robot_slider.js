let block_1 = document.querySelectorAll('.t603')[0];

let images = block_1.querySelectorAll('.t603__tile');
console.log(images)

function view(v) {
    images.forEach((img) => {
        img.style.position = 'absolute';
        img.style.opacity = '0';
    })
    for (let j = 0; j < 4; j++) {
        images[v + j].style.position = 'absolute';
        images[v + j].style.opacity = '1';
    }

    if(v == 24) {
        cycle()
    }
}


function cycle() {
    for (let i = 0; i < 28; i+=4) {
        if(i < 28) {
            setTimeout(view, i * 1000, i);
        }
    }
}

cycle();