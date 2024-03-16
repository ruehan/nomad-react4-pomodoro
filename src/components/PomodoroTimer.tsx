import { useRecoilState } from "recoil";
import { goalState, roundState, timeState } from "../state/timerState";
import { useEffect, useState } from "react";
import Sandglass from "./Sandglass";
import { styled } from "styled-components";
import TimeCard from "./TimeCard";
import { motion } from "framer-motion";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background-color: tomato;
	display: grid;
	grid-template-columns: 3fr 1fr;
	justify-content: center;
	justify-items: center;
	align-items: center;
`;

const CardContainer = styled.div`
	width: 70%;
	height: 70%;
	/* background: white; */
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, 1fr);
	justify-items: center;
	align-items: center;
`;

const Btn = styled(motion.button)`
	width: 100px;
	height: 100px;
	/* position: fixed; */
	/* left: 46%; */
	/* bottom: 50px; */
	border-radius: 100px;
	justify-items: center;
	align-items: center;
	border: 1px solid #e74d3d;
	color: white;
	background-color: rgba(0, 0, 0, 0.15);

	svg {
		width: 50%;
	}
`;

const PomodoroTimer: React.FC = () => {
	const [time, setTime] = useRecoilState(timeState);
	const [totalTime, setTotalTime] = useState<number>(time);
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
			setTime(totalTime);
			// setTime(60);
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

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const handleSliderChange = (event) => {
		const minutes = event.target.value; // 슬라이더로부터 분 단위의 값 받아오기
		setTime(minutes * 60); // 분을 초로 변환하여 상태 업데이트
		setTotalTime(minutes * 60);
	};

	return (
		<Container>
			<CardContainer>
				<TimeCard label="Minutes" value={minutes} />
				<TimeCard label="Seconds" value={seconds} />
				<TimeCard label="Round" value={round} />
				<TimeCard label="Goal" value={goal} />
				<Btn
					onClick={toggleTimer}
					whileHover={{
						scale: 1.2,
					}}
					whileTap={{
						scale: 0.8,
					}}
				>
					{isActive ? (
						<svg
							dataSlot="icon"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								clipRule="evenodd"
								fillRule="evenodd"
								d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm5-2.25A.75.75 0 0 1 7.75 7h.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5Zm4 0a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5Z"
							/>
						</svg>
					) : (
						<svg
							dataSlot="icon"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								clipRule="evenodd"
								fillRule="evenodd"
								d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
							/>
						</svg>
					)}
				</Btn>
				<input
					type="range"
					min="1"
					max="60"
					value={time / 60}
					onChange={handleSliderChange}
				/>
			</CardContainer>
			<Sandglass currentTime={time} totalTime={totalTime} />
		</Container>
	);
};

export default PomodoroTimer;
