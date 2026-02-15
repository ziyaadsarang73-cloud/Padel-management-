function generateMatches(){
  const shuffled = [...players].sort(()=>0.5 - Math.random());
  const matches = [];
  for(let i=0;i+3<shuffled.length;i+=4){
    matches.push({
      players:[shuffled[i],shuffled[i+1],shuffled[i+2],shuffled[i+3]],
      createdAt:Date.now()
    });
  }
  matches.forEach(m=>db.collection("matches").add(m));
}
