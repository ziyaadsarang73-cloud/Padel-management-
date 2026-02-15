const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.expireInvites = functions.pubsub
  .schedule("every 60 minutes")
  .onRun(async () => {
    const cutoff = Date.now() - 48*60*60*1000;
    const snaps = await db.collection("matchInvites")
      .where("createdAt","<=",cutoff)
      .get();
    const batch = db.batch();
    snaps.forEach(doc=>batch.delete(doc.ref));
    if(!snaps.empty) await batch.commit();
    return null;
});
