module.exports = function noteBotRes(msg) {
  let savePatt = /@bot Save note title:/;
  let showPatt = /@bot Show note /;
  if (savePatt.test(msg)) {
    return saveNote(msg);
  } else if (showPatt.test(msg)) {
    return showNote(msg);
  }
};

notes = [];

function saveNote(msg) {
  let title, body;
  let pattTitle = /(title: )(.+)( body:)/;
  let pattBody = /( body: )(.+)/;
  title = pattTitle.exec(msg)[2];
  body = pattBody.exec(msg)[2];
  notes.push({title, body});
  return `Saved as title: ${title}, body: ${body}`;
}

function showNote(msg) {
  let patt = /(note )(.+)/;
  let title = patt.exec(msg)[2];
  for (let i = 0; i < notes.length; i++) {
    if(notes[i].title = title){
      return `${notes[i].title}: ${notes[i].body}`
    }
  }
}
