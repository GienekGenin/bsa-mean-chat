const randomReqHandler = require('./randomBot');

module.exports = function noteBotRes(msg) {
  let savePatt = /@bot Save note title:/;
  let showNotePatt = /@bot Show note /;
  let showNoteListPatt = /@bot Show note list/;
  let deleteNotePatt = /@bot Delete note: /;
  if (savePatt.test(msg)) {
    return saveNote(msg);
  } else if (showNoteListPatt.test(msg)) {
    return showNoteList();
  } else if (showNotePatt.test(msg)) {
    return showNote(msg);
  } else if (deleteNotePatt.test(msg)) {
    return deleteNote(msg);
  }
  return randomReqHandler();
};

notes = [];

function saveNote(msg) {
  let title, body;
  let pattTitle = /(title: )(.+)( body:)/;
  let pattBody = /( body: )(.+)/;
  if (pattTitle.exec(msg) === null || pattBody.exec(msg) === null) {
    return 'Incorrect save request';
  }
  title = pattTitle.exec(msg)[2];
  body = pattBody.exec(msg)[2];
  notes.push({title, body});
  return `Saved as title: ${title}, body: ${body}`;
}

function showNote(msg) {
  let patt = /(note )(.+)/;
  if (patt.exec(msg) === null) {
    return 'Incorrect show request';
  }
  let title = patt.exec(msg)[2];
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].title === title) {
      return `${notes[i].title}: ${notes[i].body}`
    }
  }
}

function showNoteList() {
  let noteList = '';
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].title) {
      noteList += `${i + 1}) ${notes[i].title}; `
    }
  }
  if (noteList === '') {
    return 'Note list is empty';
  }
  return noteList;
}

function deleteNote(msg) {
  let patt = /(@bot Delete note: )(.+)/;
  if (patt.exec(msg) === null) {
    return 'Incorrect delete request';
  }
  let title = patt.exec(msg)[2];
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].title === title) {
      notes.splice(i, 1);
    }
  }
  return 'Note was deleted';
}
