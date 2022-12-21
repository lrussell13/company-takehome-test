import React, { useState, useEffect } from 'react';
import AntService from './Services/ant-service';
import AntCard from './Components/AntCard/AntCard';
import StatusIcon from './Components/StatusIcon/StatusIcon';

function App() {
  const [ants, setAnts] = useState<AntArray>([]);
  const [globalStatus, setGlobalStatus] = useState<string>("pre-race");

  useEffect(() => {
    const fetchAnts = async () => {
      const ants = await AntService.getAnts();

      ants.ants.forEach((ant: Ant) => {
        ant.status = "pre-race";
      });

      setAnts(ants.ants);
    }

    fetchAnts().catch(error => console.log(error));
  }, [])

  useEffect(() => {
    if(ants.length && ants.every(ant => ant.status === "complete")) setGlobalStatus("complete");
  }, [ants])

  function onAntRace() {
    let newAnts = [...ants];

    for(let ant of newAnts){
      ant.status = "loading";
      ant.result = 0;
      let result = AntService.generateAntWinLikelihoodCalculator();
      result((likelihood: number) => processAntResultsById(likelihood, ant.id));
    }

    setGlobalStatus("loading");
    setAnts(newAnts);
  }

  function processAntResultsById(likelihood: number, id: number){ 
    let newAnts = [...ants];
    let antIndex = newAnts.findIndex((ant: Ant) => ant.id === id);
    newAnts[antIndex].result = likelihood;
    newAnts[antIndex].status = "complete";
    
    newAnts = newAnts.sort((a, b) => {
      if(!a.result) a.result = 0;
      if(!b.result) b.result = 0;

      return b.result - a.result;
    });

    setAnts(newAnts);
  }

  return (
    <div className="App my-0 mx-auto p-4 max-w-screen-lg">
      {ants.length > 0 && <button onClick={onAntRace} className="ml-1 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded disabled:opacity-50" disabled={globalStatus === "loading"}>Race Ants</button>}
      <p className="float-right capitalize">{globalStatus} <span className="ml-1 mt-4">{<StatusIcon status={globalStatus}></StatusIcon>}</span></p>
      <div className="sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-3 grid">
        {ants && ants.map((ant: Ant) => <AntCard ant={ant} key={ant.id}></AntCard>)}
      </div>
    </div>
  );
}

export default App;
