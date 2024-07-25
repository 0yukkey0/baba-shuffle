

document.addEventListener("DOMContentLoaded", function () {
    function spinDice() {
        const rotations = [
            { x: 0, y: 0 },         // front
            { x: 180, y: 0 },       // back
            { x: 90, y: 0 },        // top
            { x: -90, y: 0 },       // bottom
            { x: 0, y: 90 },        // right
            { x: 0, y: -90 }        // left
        ];
        const randomIndex = Math.floor(Math.random() * rotations.length);
        const finalRotation = rotations[randomIndex];

        return JSON.stringify(finalRotation)
    }





    document.getElementById('shuffle-button').addEventListener('click', async function () {

        var relay = RelayServer("achex", "baba-shuffle-web-app-test");
        var channel = await relay.subscribe("babatest");
    
        channel.send(spinDice());

    });


});
