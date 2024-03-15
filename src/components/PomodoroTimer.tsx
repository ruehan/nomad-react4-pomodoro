import { useRecoilState } from "recoil";
import { goalState, roundState, timeState } from "../state/timerState";
import { useEffect, useState } from "react";

const PomodoroTimer: React.FC = () => {
	const [time, setTime] = useRecoilState(timeState);
	const [round, setRound] = useRecoilState(roundState);
	const [goal, setGoal] = useRecoilState(goalState);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let interval: number | null = null;

		if (isActive && time > 0) {
			interval = window.setInterval(() => {
				setTime((time) => time - 1);
			}, 1000);
		} else if (time === 0) {
			const newRound = round === 4 ? 1 : round + 1;
			const newGoal = round === 4 ? goal + 1 : goal;

			setRound(newRound);
			setGoal(newGoal);
			// setTime(25 * 60);
			setTime(10);
			setIsActive(false);
			if (newGoal === 12) {
				alert("Congratulations! You've completed 12 goals.");
			}

			if (interval !== null) window.clearInterval(interval);
		}

		return () => {
			if (interval !== null) window.clearInterval(interval);
		};
	}, [isActive, time, round, goal, setTime, setRound, setGoal]);

	const toggleTimer = () => {
		setIsActive(!isActive);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};
	return (
		<div>
			<h2>Pomodoro Timer</h2>
			<div>Time: {formatTime(time)}</div>
			<div>Round: {round}/4</div>
			<div>Goal: {goal}/12</div>
			<button onClick={toggleTimer}>{isActive ? "Stop" : "Start"}</button>
		</div>
	);
};

export default PomodoroTimer;
