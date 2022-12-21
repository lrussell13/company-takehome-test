const AntService = {
    async getAnts(){
      return fetch('Assets/ants.json').then((res) => res.json());
    },
    generateAntWinLikelihoodCalculator() {
      const delay = 3000 + Math.random() * 3000;
      const likelihoodOfAntWinning = Math.random();
    
      return (callback: Function) => {
        setTimeout(() => {
          callback(likelihoodOfAntWinning);
        }, delay);
      };
    }
};

export default AntService;