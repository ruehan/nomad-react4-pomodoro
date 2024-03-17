import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import GlobalStyles from "./styles/GlobalStyles.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RecoilRoot>
			<GlobalStyles />
			<App />
		</RecoilRoot>
	</React.StrictMode>
);
