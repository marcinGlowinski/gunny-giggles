document.addEventListener("kitysLoaded", () => {
    const iframe = document.getElementById("scPlayer");
    const player = SC.Widget(iframe);
    const header = document.getElementById("header");
    const kittys = document.getElementsByClassName("kity");

    if (!kittys.length) {
        console.log("Could not find elements with class name kity");
        return;
    }

    player.bind(SC.Widget.Events.PLAY, () => {
        iframe.classList.add("bounce");
        header.className = "bounce";
        Array.from(kittys).forEach(element => element.classList.add("bounce"));
    });

    player.bind(SC.Widget.Events.PAUSE, () => {
        iframe.classList.remove("bounce");
        header.className = "";
        Array.from(kittys).forEach(element => element.classList.remove("bounce"));
    });

    player.bind(SC.Widget.Events.FINISH, () => {
        iframe.classList.remove("bounce");
        header.className = "";
        Array.from(kittys).forEach(element => element.classList.remove("bounce"));
    });
});
