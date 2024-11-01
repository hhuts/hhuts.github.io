!function(A, i) {
    "object" == typeof exports && "object" == typeof module ? module.exports = i() :
    "function" == typeof define && define.amd ? define([], i) :
    "object" == typeof exports ? exports.initRunner = i() : A.initRunner = i()
}(this, function() {
    return function(A) {
        function i(s) {
            if (t[s]) return t[s].exports;
            var e = t[s] = { exports: {}, id: s, loaded: !1 };
            return A[s].call(e.exports, e, e.exports, i), e.loaded = !0, e.exports
        }
        var t = {};
        return i.m = A, i.c = t, i.p = "", i(0)
    }([function(A, i, t) {
        document.body.insertAdjacentHTML("beforeend", t(3)), t(5);
        const s = t(6);
        A.exports = function(A, i) {
            var t = "string" == typeof A ? document.querySelector(A) : A;
            return t.classList.add("interstitial-wrapper"), new s(t, i)
        }
    }, /* 其他模块代码 */]);

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
});
