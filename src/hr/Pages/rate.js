import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./../Pages/ratestyle";
const Rate = () => {
const [rate, setRate] = useState(0);
return (
	<Container style={{height:'2cm'}}>
	{[...Array(5)].map((item, index) => {
		const givenRating = index + 1;
		return (
		<label>
			<Radio
			type="radio"
			value={givenRating}
			onClick={() => {
				setRate(givenRating);
				alert(`Are you sure you want to give ${givenRating} stars ?`);
			}}
			/>
			<Rating>
			<FaStar
				color={
				givenRating < rate || givenRating === rate
					? "#e9e82a"
					: "#9a9a92"
				}
			/>
			</Rating>
		</label>
		);
	})}
	</Container>
);
};

export default Rate;
