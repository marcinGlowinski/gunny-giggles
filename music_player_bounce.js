document.addEventListener("kitysLoaded", () => {
    const iframe = document.getElementById("scPlayer");
    const player = SC.Widget(iframe);
    const header = document.getElementById("header");
    const kittys = document.getElementsByClassName("kity");

    player.bind(SC.Widget.Events.PLAY, () => {
        iframe.classList.add("bounce");
        header.className = "bounce";
        Array.from(kittys).forEach(element => element.classList.add("bounce"));
    });

    const removeBounce = () => {
        iframe.classList.remove("bounce");
        header.className = "";
        Array.from(kittys).forEach(element => element.classList.remove("bounce"));
    }

    player.bind(SC.Widget.Events.PAUSE, () => removeBounce())
    player.bind(SC.Widget.Events.FINISH, () => removeBounce());
});
