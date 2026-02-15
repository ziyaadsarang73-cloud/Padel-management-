let players = [];

db.collection("players").onSnapshot(snapshot=>{
  players = snapshot.docs.map(d=>({id:d.id,...d.data()}));
  renderLeaderboard();
});

function addPlayer(){
  const name = document.getElementById('playerName').value;
  if(!name) return;
  db.collection("players").add({name, score:0, createdAt: Date.now()});
  document.getElementById('playerName').value="";
}

function renderLeaderboard(){
  const lb = document.getElementById("leaderboard");
  lb.innerHTML="";
  players.sort((a,b)=>b.score-a.score)
    .forEach(p=>{
      const row = document.createElement("div");
      row.className="leaderboard-row";
      row.innerHTML = `<span>${p.name}</span><span>${p.score}</span>`;
      lb.appendChild(row);
  });
}
