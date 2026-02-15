// Optional: logic to send invites
// Every match should have createdAt
db.collection("matches").onSnapshot(snapshot=>{
  const container = document.getElementById("matches");
  container.innerHTML="";
  snapshot.docs.forEach(doc=>{
    const m = doc.data();
    const div = document.createElement("div");
    div.className="match";
    div.innerHTML = m.players.map(p=>p.name).join(" vs ");
    container.appendChild(div);
  });
});
