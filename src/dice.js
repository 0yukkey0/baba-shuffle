export function spinDice(rotation) {
    const dice = document.getElementById('dice');

    if (!dice) {
        console.error("Dice element not found");
        return;
    }

    const rollSound = document.getElementById('roll-sound');

    // サイコロをランダムに複数回転させる
    dice.style.transition = 'transform 4s ease-out'; // 回転を8秒間に設定
    const x = Math.floor(Math.random() * 3600) + 1440; // 4回転以上させる
    const y = Math.floor(Math.random() * 3600) + 1440;
    dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;

    // サイコロの回転効果音を再生
    if (rollSound) {
        rollSound.currentTime = 0;
        rollSound.play();
    }
    // 8秒後に回転を確定し、最終的な位置に移動
    setTimeout(() => {
        dice.style.transition = 'none'; // アニメーションをリセット
        dice.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`; // 確定位置に設定
    }, 4000);
}
