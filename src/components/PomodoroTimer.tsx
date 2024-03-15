import { useRecoilState } from "recoil";
import { goalState, roundState, timeState } from "../state/timerState";
import { useEffect, useState } from "react";

const PomodoroTimer: React.FC = () => {
	const [time, setTime] = useRecoilState(timeState);
	const [round, setRound] = useRecoilState(roundState);
	const [goal, setGoal] = useRecoilState(goalState);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {}, [
		isActive,
		time,
		round,
		goal,
		setTime,
		setRound,
		setGoal,
	]);

	return null;
};

export default PomodoroTimer;
