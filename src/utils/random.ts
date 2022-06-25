
export const random = (cantidad = 10000) => {
  let output: any={}

  for (let i=0; i<cantidad; i++){
    let value = Math.floor((Math.random() * (cantidad  + 1)));
    if (!output[value])
      output[value] = 1
    else
      output[value]++
  }
  return output
} 

process.on('message', (msg) => {
  console.log('Start calculo')
  let obj
  if (msg == 'start') 
    obj = random();
  else
    obj = random(Number(msg));
  
  process?.send?.(obj);
});