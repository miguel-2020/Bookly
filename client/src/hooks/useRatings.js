import { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import calculateAvgRatings from "../helpers/calculateAvgRatings";


export default function useRatings(votes){
    const [rating, setRating] = useState({average:null,totalRatings:null});
    const [stars, setStars] = useState([]);

  useEffect(() => {
    const { average, totalRatings } = calculateAvgRatings(votes);
    setRating({
        ...rating,
      average,
      totalRatings,
  });
    let counter = 0;
    let temp = [];
    if (!Number.isInteger(average)) {
      let number = Math.trunc(average);

      while (counter < number) {
        temp.push('★');
        counter++;
      }
    } else {
      while (counter <= average) {
        temp.push('★');
        counter++;
      }
    }

    setStars(temp);
  }, []);

  return [rating.average,stars,rating.totalRatings]
}

useRatings.propTypes ={
    votes:PropTypes.arrayOf(PropTypes.number)
}