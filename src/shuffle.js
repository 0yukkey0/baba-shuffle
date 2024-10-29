document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = "baba-shuffle" + urlParams.get('room');
    const relay = RelayServer("achex", sessionId);
    const channel = await relay.subscribe(sessionId);
    document.getElementById('shuffle-button').addEventListener('click', function () {
        const rotation = getRotation();
        channel.send(JSON.stringify(rotation));
    });
});

const getRotation = () => {
    const rotations = [{x: 0, y: 0}, {x: 180, y: 0}, {x: 90, y: 0}, {x: -90, y: 0}, {x: 0, y: 90}, {x: 0, y: -90}];
    return rotations[Math.floor(Math.random() * rotations.length)];
}
