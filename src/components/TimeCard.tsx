import { styled } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface TimeCardProps {
	label: string;
	value: number;
}

const CardContainer = styled.div`
	display: inline-flex;
	width: 200px;
	height: 200px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f0f0f0;
	border-radius: 8px;
	padding: 10px 20px;
	margin: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardLabel = styled.span`
	font-size: 28px;
	color: #666;
`;

const CardValue = styled(motion.div)`
	font-size: 64px;
	font-weight: bold;
	color: #333;
`;

const timeVariant = {
	initial: { scale: 0 },
	animate: { scale: 1.2 },
	exit: { scale: 1 },
};

const TimeCard: React.FC<TimeCardProps> = ({ label, value }) => {
	const [previousValue, setPreviousValue] = useState(value);

	useEffect(() => {
		if (value !== previousValue) {
			setPreviousValue(value);
		}
	}, [value]);

	return (
		<CardContainer>
			<CardLabel>{label}</CardLabel>
			<AnimatePresence mode="wait">
				{label == "Minutes" || label == "Seconds" ? (
					<CardValue
						key={value}
						variants={timeVariant}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
					>
						{value.toString().padStart(2, "0")}
					</CardValue>
				) : (
					<CardValue
						key={value}
						variants={timeVariant}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
					>
						{label === "Round" ? `${value} / 4` : `${value} / 12`}
					</CardValue>
				)}
			</AnimatePresence>
		</CardContainer>
	);
};

export default TimeCard;
