window.addEventListener("DOMContentLoaded", () => {
    const iframe = document.getElementById("scPlayer");
    const player = SC.Widget(iframe);

    player.bind(SC.Widget.Events.PLAY, () => {
        iframe.classList.add("bounce");
    });

    player.bind(SC.Widget.Events.PAUSE, () => {
        iframe.classList.remove("bounce");
    });

    player.bind(SC.Widget.Events.FINISH, () => {
        iframe.classList.remove("bounce");
    });
});
