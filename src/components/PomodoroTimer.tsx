import { useRecoilState } from "recoil";
import { goalState, roundState, timeState } from "../state/timerState";
import { useEffect, useState } from "react";
import Sandglass from "./Sandglass";
import { styled } from "styled-components";
import TimeCard from "./TimeCard";
import { motion } from "framer-motion";

interface TimeBarProps {
	isActive: boolean;
}

const Content = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	background-color: tomato;
	color: white;
	font-size: 60px;
	position: absolute;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	background-color: tomato;
	display: grid;
	grid-template-columns: 3fr 1fr;
	justify-content: center;
	justify-items: center;
	align-items: center;
`;

const CardContainer = styled.div`
	max-width: 70%;
	/* min-width: 40%; */
	height: 70%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, 1fr);
	justify-items: center;
	align-items: center;
`;

const Btn = styled(motion.button)`
	width: 100px;
	height: 100px;
	border-radius: 100px;
	justify-items: center;
	align-items: center;
	border: 1px solid #e74d3d;
	color: white;
	background-color: rgba(0, 0, 0, 0.15);

	svg {
		width: 70%;
	}
`;

const ControlContainer = styled.div`
	width: 90%;
	height: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Label = styled.label`
	font-size: 24px;
	margin-bottom: 10px;
	color: white;
`;

const TimeBar = styled.input<TimeBarProps>`
	width: 100%;
	height: 20px;
	color: black;
	cursor: ${(props) => (!props.isActive ? "pointer" : "not-allowed")};
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
			setIsActive(false);
			if (newGoal === 12) {
				alert("완주..!");
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

	const handleSliderChange = (event: { target: { value: any } }) => {
		const minutes = event.target.value;
		setTime(minutes * 60);
		setTotalTime(minutes * 60);
	};

	return (
		<Content>
			<Title>Pomodoro</Title>
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
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
									clipRule="evenodd"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
									clipRule="evenodd"
								/>
							</svg>
						)}
					</Btn>
					<ControlContainer>
						<Label>Timer Setting</Label>
						<TimeBar
							isActive={isActive}
							type="range"
							min="1"
							max="60"
							value={totalTime / 60}
							onChange={handleSliderChange}
						/>
					</ControlContainer>
				</CardContainer>
				<Sandglass currentTime={time} totalTime={totalTime} />
			</Container>
		</Content>
	);
};

export default PomodoroTimer;
