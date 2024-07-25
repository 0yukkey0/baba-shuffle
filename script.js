const GAS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// サイコロの回転関数
function spinDice() {
    const dice = document.getElementById('dice');
    const rotations = [
        {x: 0, y: 0},         // front
        {x: 180, y: 0},       // back
        {x: 90, y: 0},        // top
        {x: -90, y: 0},       // bottom
        {x: 0, y: 90},        // right
        {x: 0, y: -90}        // left
    ];
    const randomIndex = Math.floor(Math.random() * rotations.length);
    const finalRotation = rotations[randomIndex];

    // サイコロを複数回転させる
    dice.style.transition = 'transform 4s ease-out'; // 回転スピードを4秒に
    const x = Math.floor(Math.random() * 3600) + 1440; // 4回転以上させる
    const y = Math.floor(Math.random() * 3600) + 1440; // 4回転以上させる
    dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`; // ランダムな回転を設定

    setTimeout(() => {
        dice.style.transition = 'none'; // アニメーションをリセット
        dice.style.transform = `rotateX(${finalRotation.x}deg) rotateY(${finalRotation.y}deg)`; // ランダムな面を表示

        // GASを通じて他のクライアントに回転情報を送信
        fetch(GAS_URL, {
            method: 'POST',
            body: JSON.stringify(finalRotation),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }, 4000); // 4秒後に最終的な回転を設定
}

// ルーレットページの読み込み時に回転を確認
if (document.getElementById('dice')) {
    const checkForRotation = () => {
        fetch(GAS_URL + '?action=get')
            .then(response => response.json())
            .then(rotation => {
                if (rotation.x !== undefined && rotation.y !== undefined) {
                    const dice = document.getElementById('dice');
                    dice.style.transition = 'transform 4s ease-out';
                    dice.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
                }
            });
    };

    setInterval(checkForRotation, 5000); // 5秒ごとに回転情報をチェック
}

// シャッフルボタンのクリックイベント
if (document.getElementById('shuffle-button')) {
    document.getElementById('shuffle-button').addEventListener('click', function() {
        spinDice();
    });
}
