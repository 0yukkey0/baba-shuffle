import {spinDice} from './dice.js';

document.addEventListener("DOMContentLoaded", async function () {
    const cube = document.getElementById("cube");
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = "baba-shuffle" + urlParams.get('room')
    const relay = RelayServer("achex", sessionId);
    const channel = await relay.subscribe(sessionId);
    const playerCountSelect = document.getElementById("player-count");

    // 各プレイヤー数に対応したサイコロの面の内容
    const fourPlayerFaces = {
        1: "右1",
        2: "左1",
        3: "対面",
        4: "✗",
        5: "右1",
        6: "左1"
    };

    const fivePlayerFaces = {
        1: "右1",
        2: "左2",
        3: "右2",
        4: "左1",
        5: "✗",
        6: "右3"
    };

    // 現在の面の値を保持
    let currentFaces = {...fourPlayerFaces}; // 初期状態は4人用

    // サイコロの面の内容を更新
    const updateFaces = (faces) => {
        document.querySelector(".face-1 .text").innerText = faces[1];
        document.querySelector(".face-2 .text").innerText = faces[2];
        document.querySelector(".face-3 .text").innerText = faces[3];
        document.querySelector(".face-4 .text").innerText = faces[4];
        document.querySelector(".face-5 .text").innerText = faces[5];
        document.querySelector(".face-6 .text").innerText = faces[6];
        currentFaces = faces; // 現在の面の値を更新
    }

    // 人数選択イベントを設定
    playerCountSelect.addEventListener("change", () => {
        const playerCount = playerCountSelect.value;
        if (playerCount === "4") {
            updateFaces(fourPlayerFaces);
        } else if (playerCount === "5") {
            updateFaces(fivePlayerFaces);
        }
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
                    spinDice(rotation, currentFaces); // 共通関数でサイコロの回転
                });
            }
        } catch (e) {
            console.error('Invalid JSON:', e);
        }
    };
});
