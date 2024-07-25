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
    }, 4000); // 4秒後に最終的な回転を設定
    // ローカルストレージをクリア
    localStorage.removeItem('spin');
}

// ルーレットページの読み込み時に回転を確認
if (document.getElementById('dice')) {
    window.addEventListener('storage', function(event) {
        if (event.key === 'spin' && event.newValue === 'true') {
            spinDice();
        }
    });

    // 初回ロード時にローカルストレージをチェック
    if (localStorage.getItem('spin') === 'true') {
        spinDice();
    }
}

// シャッフルボタンのクリックイベント
if (document.getElementById('shuffle-button')) {
    document.getElementById('shuffle-button').addEventListener('click', function() {
        // ルーレットページにスピン命令を送信
        localStorage.setItem('spin', 'true');
    });
}
