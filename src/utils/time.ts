// 시간 계산

// 입력받은 시간을 통해 px 로 변경
export const timeToMinutes = ( 
    time: string
) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute; // ex) 9,0 => 9*60+0 = 540
}


// 블록 높이 계산 
const HOUR_HEIGHT = 80; // 80px -> 지정해놓은 1시간 한칸의 높이 

export const calculateBlockHeight = (
    startTime: string,
    endTime: string
) => {
    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);

    return(
        (end - start) / 60
    ) * HOUR_HEIGHT;
};


// 블록 시작 위치 계산
export const calculateBlockTop = (
    startTime: string
) => {
    const start = timeToMinutes(startTime);
    const baseTime = 8 * 60; // 08:00 기준

    return(
        (start - baseTime) / 60
    ) * HOUR_HEIGHT;
};

