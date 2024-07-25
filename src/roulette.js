document.addEventListener("DOMContentLoaded", async function () {
    var relay = RelayServer("achex", "baba-shuffle-web-app-test");
    var channel = await relay.subscribe("babatest");
    channel.onmessage = getMessage;

    function getMessage(event) {
        console.log('onmessage', event)
        if (event.data instanceof Blob) {
            const reader = new FileReader();
            reader.onload = function () {
                try {
                    const rotation = JSON.parse(reader.result);
                    if (rotation.x !== undefined && rotation.y !== undefined) {
                        spinDice(rotation);
                    }
                } catch (e) {
                    console.error('Invalid JSON:', e);
                }
            };
            reader.readAsText(event.data);
        } else {
            try {
                const rotation = JSON.parse(event.data);
                if (rotation.x !== undefined && rotation.y !== undefined) {
                    spinDice(rotation);
                }
            } catch (e) {
                // console.error('Invalid JSON:', e);
            }
        }
    }
})

function spinDice(rotation) {
    const dice = document.getElementById('dice');

    // サイコロを複数回転させる
    dice.style.transition = 'transform 4s ease-out'; // 回転スピードを4秒に
    const x = Math.floor(Math.random() * 3600) + 1440; // 4回転以上させる
    const y = Math.floor(Math.random() * 3600) + 1440; // 4回転以上させる
    dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`; // ランダムな回転を設定

    setTimeout(() => {
        dice.style.transition = 'none'; // アニメーションをリセット
        dice.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`; // ランダムな面を表示
    }, 4000); // 4秒後に最終的な回転を設定
}