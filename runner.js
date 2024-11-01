// 提交分数
function submitScore(score) {
    const data = {
        username: prompt("请输入您的用户名："),
        score: score
    };

    fetch('http://localhost:3000/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('分数提交成功:', data);
        loadLeaderboard();
    })
    .catch(error => console.error('提交分数失败:', error));
}

// 加载排行榜
function loadLeaderboard() {
    fetch('http://localhost:3000/api/scores')
        .then(response => response.json())
        .then(scores => {
            const scoreList = document.getElementById('scoreList');
            scoreList.innerHTML = '';

            scores.forEach(score => {
                const li = document.createElement('li');
                li.textContent = `${score.username}: ${score.score} 分`;
                scoreList.appendChild(li);
            });
        })
        .catch(error => console.error('获取排行榜失败:', error));
}

// 示例调用
document.addEventListener("DOMContentLoaded", function() {
    loadLeaderboard();
    // 初始化其他游戏逻辑
});
