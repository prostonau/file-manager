import os from 'os';

const cpus = async () => {
  const cpusData = os.cpus();
  const cpuInfo = {
    totalCPUs: cpusData.length,
    cpuDetails: []
  };

  cpusData.forEach(cpu => {
    const model = cpu.model;
    const speedMHz = cpu.speed;
    const speedGHz = (speedMHz / 1000).toFixed(2);
    cpuInfo.cpuDetails.push({ model, speedGHz });
  });

  console.log('Total CPUs:', cpuInfo.totalCPUs);
  console.log('CPU Details:');
  // cpuInfo.cpuDetails.forEach((cpu, index) => {
  //   console.log(`CPU ${index + 1}: Model - ${cpu.model}, Speed - ${cpu.speedGHz} GHz`);
  // });
  console.table(cpuInfo.cpuDetails)
}

export default cpus;