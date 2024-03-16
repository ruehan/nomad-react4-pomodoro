import React from "react";
import styled from "styled-components";

interface SandglassProps {
	currentTime: number;
	totalTime: number; // This is 25 minutes for a full cycle, represented in seconds.
}

const SandglassContainer = styled.div`
	position: relative;
	width: 300px;
	height: 600px;
	/* width: 100%;
	height: 100vh; */
	border: 2px solid black;
	margin: 20px;
	background-color: white;
`;

const SandTop = styled.div<SandglassProps>`
	position: absolute;
	bottom: 50%;
	width: 100%;
	height: ${({ currentTime, totalTime }) => (currentTime / totalTime) * 50}%;
	background-color: #f0e68c;
	transition: height 1s linear;
`;

const SandTopBack1 = styled.div`
	position: absolute;
	bottom: 50%;
	width: 0;
	border-bottom: 300px solid tomato;
	border-left: 0px solid transparent;
	border-right: 150px solid transparent;
`;

const SandTopBack2 = styled.div`
	position: absolute;
	bottom: 50%;
	width: 0;
	left: 50%;
	border-bottom: 300px solid tomato;
	border-left: 150px solid transparent;
	border-right: 0px solid transparent;
`;

const SandBottom = styled.div<SandglassProps>`
	position: absolute;
	top: 50%;
	width: 100%;
	height: ${({ currentTime, totalTime }) => (currentTime / totalTime) * 50}%;
	background-color: white;
	transition: height 1s linear;
	z-index: 2;
`;

const SandBack = styled.div`
	position: absolute;
	top: 50%;
	width: 100%;
	height: 50%;
	background-color: #f0e68c;
`;

const SandBottomBack1 = styled.div`
	position: absolute;
	top: 50%;
	width: 0;
	border-top: 300px solid tomato;
	border-left: 0px solid transparent;
	border-right: 150px solid transparent;
	z-index: 3;
`;

const SandBottomBack2 = styled.div`
	position: absolute;
	top: 50%;
	width: 0;
	left: 50%;
	border-top: 300px solid tomato;
	border-left: 150px solid transparent;
	border-right: 0px solid transparent;
	z-index: 3;
`;

const Sandglass: React.FC<SandglassProps> = ({ currentTime, totalTime }) => {
	console.log(currentTime / totalTime);
	return (
		<SandglassContainer>
			<SandTop currentTime={currentTime} totalTime={totalTime} />
			<SandTopBack1 />
			<SandTopBack2 />
			<SandBottom currentTime={currentTime} totalTime={totalTime} />
			<SandBottomBack1 />
			<SandBottomBack2 />
			<SandBack />
		</SandglassContainer>
	);
};

export default Sandglass;
