import React, { useState, useEffect } from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory";
import style from "./report.module.scss";
import UserService from "../../services/UserService";

function Report(props) {
	const [reportValues, setReportValues] = useState([]);

	useEffect(async () => {
		let data = await UserService.getVacations();
		data = await data
			.filter((item) => item.followers.length)
			.map((item) => {
				return {
					destination: item.destination,
					followers: item.followers.length,
				};
			});
		setReportValues(data);
	}, []);

	return (
		<div className={style.chartWrapper}>
			<h3 className={style.title}>Report</h3>
			{!reportValues.length && (
				<h4 className={style.subtitle}>
					No vacations are being followed...
				</h4>
			)}
			{reportValues.length > 0 && (
				<VictoryChart domainPadding={10} theme={VictoryTheme.material}>
					<VictoryAxis
						tickValues={reportValues.map((item) => item.followers)}
						tickFormat={reportValues.map(
							(item) => item.destination
						)}
						style={{
							tickLabels: { fontSize: 8, padding: 10, angle: -45}
						}}
					/>
					<VictoryAxis
						dependentAxis
						style={{
							tickLabels: { fontSize: 8, padding: 3 },
						}}
					/>
					<VictoryBar
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 }
						}}
						barWidth={10}
						data={reportValues}
						x="destination"
						y="followers"
					/>
				</VictoryChart>
			)}
		</div>
	);
}

export default Report;
