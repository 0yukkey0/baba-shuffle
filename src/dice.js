export function spinDice(rotation, faces) {
    const dice = document.getElementById('cube');

    const resultDialog = document.getElementById('result-dialog');
    const resultText = document.getElementById('result-text');
    const closeDialogButton = document.getElementById('close-dialog');
    const rollSound = document.getElementById('roll-sound');

    const initialTransform = "rotateX(-20deg) rotateY(30deg)";

    if (!dice) {
        console.error("Dice element not found");
        return;
    }

    // サイコロをランダムに複数回転させる
    dice.style.transition = 'transform 4s ease-out'; // 回転を8秒間に設定
    const x = Math.floor(Math.random() * 3600) + 1440; // 4回転以上させる
    const y = Math.floor(Math.random() * 3600) + 1440;
    dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;

    // サイコロの回転効果音を再生
    if (rollSound) {
        rollSound.currentTime = 0;
        rollSound.volume = 0.3;
        rollSound.play();
    }
    // 4秒後に回転を確定し、最終的な位置に移動
    setTimeout(() => {
        dice.style.transition = 'none';
        dice.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

        // 結果の取得
        const faceValue = getCurrentFaceValue(rotation, faces);
        resultText.innerText = `結果は ${faceValue} です`;

        // ダイアログを表示
        resultDialog.classList.add("show");

        // 初期位置に戻す
        closeDialogButton.addEventListener("click", () => {
            resultDialog.classList.remove("show");
            dice.style.transition = 'transform 2s ease';
            dice.style.transform = initialTransform;
        });
    }, 4000);
}

// 回転角度に基づいて表示される面の値を取得
const getCurrentFaceValue = (rotation, faces) => {
    if (rotation.x === 0 && rotation.y === 0) return faces[1];
    if (rotation.x === 180 && rotation.y === 0) return faces[2];
    if (rotation.x === 0 && rotation.y === 90) return faces[3];
    if (rotation.x === 0 && rotation.y === -90) return faces[4];
    if (rotation.x === 90 && rotation.y === 0) return faces[5];
    if (rotation.x === -90 && rotation.y === 0) return faces[6];
    return "不明";
}