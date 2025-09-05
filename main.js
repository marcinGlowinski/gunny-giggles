class Kity {
    constructor(id, url) {
        this.id = id;
        this.url = url;
        this.startX = Math.random() > 0.5 ? 110 : -10;
        this.startY = Math.random() * 85 + 5;
        this.x = this.startX;
        this.y = this.startY;
        this.speed = Math.random() * 0.1 + 0.3;
        this.opacity = 0;
        this.moving_right = this.x <= 0;
    }

    load() {
        let kity = document.createElement("img");
        kity.id = this.id;
        kity.src = this.url;
        kity.style = `
            width: 10%;
            height: 10%;
            margin: 0;
            position: absolute;
            opacity: 0;
            top: ${this.y}%;
            left: ${this.x}%;
        `;
        document.getElementById("kittys").appendChild(kity);
    }

    startMoving(offsetMs = 0) {
        setTimeout(() => {
            this.loop();
        }, offsetMs);
    }

    loop() {
        const kity = document.getElementById(this.id);

        this.x += this.speed * (this.moving_right ? 0.1 : -0.1);
        this.opacity = Math.max(0, 1 - Math.abs(this.x - 50) / 50);

        kity.style.left = `${this.x}%`;
        kity.style.opacity = this.opacity;

        if ((this.moving_right && this.x > 120) || (!this.moving_right && this.x < -20)) {
            this.x = this.startX;
        }

        requestAnimationFrame(() => this.loop());
    }
}


window.onload = async () => {
    const cacheKey = "catImagesCache";
    let data, time;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        try {
            let json = JSON.parse(cached);
            data = json.data;
            time = json.time;
        } catch {
            data = null;
            time = Date.now();
        }
    }

    const cacheUpdateTimeLongerThanMinutes = (time, minutes) => ((Date.now() - time) / 60000) > minutes;
    
    if (!data || cacheUpdateTimeLongerThanMinutes(time, 10)) {
        const result = await fetch("https://api.thecatapi.com/v1/images/search?limit=50&api_key=live_UlaEu4QrvvrazfXbuvd9qDa6eisPKAG9ISdMDM1MHvFHirJuNLOs0jSjGlySK27B");
        data = await result.json();
        let json = { time: Date.now(), data: data };
        localStorage.setItem(cacheKey, JSON.stringify(json));
    }

    const kitys = data.map(entry => new Kity(entry.id, entry.url));
    kitys.forEach((kity, i) => {
        kity.load();
        kity.startMoving(i * 500);
    });
};
