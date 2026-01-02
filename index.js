const dvdAddedEvent = new CustomEvent("dvdAdded");

addEventListener("DOMContentLoaded", () => {
    bounce_dvd(document.getElementsByClassName("dvd-logo")[0]);
});

addEventListener("dvdAdded", () => {
    for (const logo of document.getElementsByClassName("dvd-logo")) {
        bounce_dvd(logo);
    }
});

function bounce_dvd(logo) {
    if (!logo) return;

    let x = Math.random() * (window.innerWidth - logo.offsetWidth);
    let y = Math.random() * (window.innerHeight - logo.offsetHeight);

    let dx = 1.5;
    let dy = 1.5;

    function updateBounds() {
        maxX = window.innerWidth - logo.offsetWidth;
        maxY = window.innerHeight - logo.offsetHeight;
    }

    let maxX, maxY;
    updateBounds();

    window.addEventListener("resize", updateBounds);

    logo.addEventListener("mousedown", () => {
        const dvds = document.getElementById("dvds");
        const new_logo = document.createElement("img");
        new_logo.className = logo.className;
        new_logo.src = logo.src;
        new_logo.alt = logo.alt;
        dvds.append(new_logo);
        window.dispatchEvent(dvdAddedEvent);
    });

    logo.style.left = `${x}px`;
    logo.style.top = `${y}px`;
    logo.style.visibility = "visible";

    setInterval(() => {
        x += dx;
        y += dy;

        if (x <= 0 || x >= maxX) {
            dx *= -1;
            x = Math.max(0, Math.min(x, maxX));
        }

        if (y <= 0 || y >= maxY) {
            dy *= -1;
            y = Math.max(0, Math.min(y, maxY));
        }

        logo.style.left = `${x}px`;
        logo.style.top = `${y}px`;
    }, 10);
}
