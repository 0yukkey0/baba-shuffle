import {spinDice} from './dice.js';

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = "baba-shuffle" + urlParams.get('room')
    const playerCountSelect = document.getElementById("player-count");
    const relay = RelayServer("achex", sessionId);
    const channel = await relay.subscribe(sessionId);

    // プレイヤー数に応じてサイコロ面の表示を変更
    playerCountSelect.addEventListener("change", () => {
        const playerCount = playerCountSelect.value;
        updateDiceFaces(playerCount);
    });
    channel.onmessage = function (event) {
        try {
            const rotation = JSON.parse(event.data);
            if (rotation.x !== undefined && rotation.y !== undefined) {
                // warning.mp3の再生
                const warningSound = new Audio('./warning.mp3'); // warning.mp3のパスを指定
                warningSound.currentTime = 0;
                warningSound.play();

                warningSound.addEventListener('ended', () => {
                    spinDice(rotation); // 共通関数でサイコロの回転
                });
            }
        } catch (e) {
            console.error('Invalid JSON:', e);
        }
    };

    function updateDiceFaces(playerCount) {
        const dice = document.getElementById("dice");
        dice.innerHTML = ""; // 古い面を削除
        if (playerCount === "5") {
            dice.innerHTML = `
                <div class="face front">右1</div>
                <div class="face back">左1</div>
                <div class="face right">右2</div>
                <div class="face left">左2</div>
                <div class="face top">右3</div>
                <div class="face bottom">☓</div>
            `;
        } else {
            dice.innerHTML = `
                <div class="face front">右1</div>
                <div class="face back">左1</div>
                <div class="face right">対面</div>
                <div class="face left">☓</div>
                <div class="face top">右1</div>
                <div class="face bottom">左1</div>
            `;
        }
    }

    // 初期化時のサイコロ面の表示
    updateDiceFaces(playerCountSelect.value);
});
