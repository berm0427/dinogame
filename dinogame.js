// Runner 인스턴스 가져오기
const runner = Runner.instance_;

// 봇 로직 실행
const botInterval = setInterval(() => {
    // 1. 게임이 끝났다면 자동 재시작 (기존 코드 기능 반영)
    if (runner.crashed) {
        runner.restart();
    }

    // 2. 현재 화면에 장애물이 있는지 확인
    const obstacles = runner.horizon.obstacles;

    if (obstacles.length > 0) {
        const obstacle = obstacles[0];
        
        // 3. 거리 계산 (속도가 빨라질수록 미리 점프해야 함)
        // 기본 반응 거리 + 현재 속도 보정값
        const safeDistance = 80 + (runner.currentSpeed * 15); 

        // 4. 장애물이 안전 거리 내로 들어오면 점프
        // xPos는 장애물의 현재 위치
        if (obstacle.xPos < safeDistance && obstacle.xPos > 0) {
            // keydown 이벤트 대신 내부 함수를 직접 호출하여 더 빠르고 정확함
            runner.tRex.startJump(runner.currentSpeed);
        }
    }
}, 20); // 0.02초마다 감지
