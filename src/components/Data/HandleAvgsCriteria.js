import { FormatTime } from "./FormetTime";
export default  function handleAvgs(solves) {
    const solvesCopy = [...solves];

  // Find the index of the DNF solve, if it exists
  const dnfIndex = solvesCopy.findIndex(solve => solve.isDNF);

  // Consider the DNF as the worst solve
  const worstSolve = dnfIndex !== -1 ? solvesCopy.splice(dnfIndex, 1)[0] : null;

  // Sort the remaining solves by solveTimeInt in ascending order
  solvesCopy.sort((a, b) => a.solveTimeInt - b.solveTimeInt);

  // Remove the solve with the minimum solveTimeInt (best solve)
  solvesCopy.shift();

  // Remove the last solve only if there is no DNF
  if (!worstSolve) {
    solvesCopy.pop();
  }

  // Calculate the average of the remaining 3 solves
  console.log(solves.length-2)
  const ao3 = solvesCopy.reduce((total, solve) => total + solve.solveTimeInt, 0) /solves.length-2 ;
  // Log the ao3 and the worst solve (if applicable)
  let currsolve=0
  solvesCopy.map((solve)=>{
    currsolve+=solve.solveTimeInt
  })

  console.log("Remaining Solves:", solvesCopy);
  console.log("AO3 PB:", FormatTime(ao3));
  return FormatTime(currsolve/solvesCopy.length)
  }