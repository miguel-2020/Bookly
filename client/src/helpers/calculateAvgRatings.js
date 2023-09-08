export default function calculateAvgRatings(data){
    let votesCount = 0;
    
    const total = data.reduce((acc,values)=>{
      votesCount += values[1]
      return acc + (values[0] * values[1])
  },0);
    
    if(votesCount && total){
      const outcome = total /votesCount
      return {average:Number(Number.parseFloat(outcome).toFixed(2)),totalRatings:total}
    }
    
    return null
   }