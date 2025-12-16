// 1. [무적 모드] 장애물에 부딪혀도 게임오버 함수가 작동하지 않게 만듭니다.
runnerInstance.gameOver = function() {};

// 2. [속도 조절] 원하시는 대로 속도를 설정합니다. (괄호를 사용하는 것이 정석입니다)
// 봇이 반응할 수 있도록 적당히 빠른 100 정도로 설정했습니다. (원하면 숫자 변경 가능)
// runnerInstance.setSpeed(9999); <-- 매우 빠름 (그러나 깨짐)
runnerInstance.setSpeed(100); 

// 3. [자동 점프 봇 로직]
var botInterval = setInterval(function() {
    
    // 게임이 멈춰있거나 끝났다면 재시작
    if (runnerInstance.crashed) {
        runnerInstance.restart();
    }

    // 장애물 감지
    var obstacles = runnerInstance.horizon.obstacles;

    if (obstacles.length > 0) {
        var obstacle = obstacles[0];
        
        // 거리 계산 (속도가 빨라져도 반응하도록 보정)
        // 속도(currentSpeed)에 비례해서 미리 점프합니다.
        var safeDistance = 80 + (runnerInstance.currentSpeed * 15); 

        // 장애물이 다가오면 점프
        if (obstacle.xPos < safeDistance && obstacle.xPos > 0) {
            runnerInstance.tRex.startJump(runnerInstance.currentSpeed);
        }
    }
}, 20);

// 참고: 중력(gravity)을 0으로 하면 점프 후 내려오지 않아 봇이 고장나므로,
// 봇 모드에서는 중력을 건드리지 않는 것이 좋습니다.


