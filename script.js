
const notes = [];
const notesList = document.getElementById('notes-list');
const noteTitleInput = document.getElementById('note-title');
const noteInput = document.getElementById('note-input');
const addNoteButton = document.getElementById('add-note');
const searchInput = document.getElementById('search-input');

function renderNotes(filteredNotes = notes) {
    notesList.innerHTML = '';
    filteredNotes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.className = 'note-item';

        const noteTitle = document.createElement('strong');
        noteTitle.textContent = note.title;
        noteTitle.style.marginBottom = '5px';

        const noteText = document.createElement('span');
        noteText.textContent = note.text;

        const actions = document.createElement('div');
        actions.className = 'note-actions';

        const starButton = document.createElement('button');
        starButton.className = 'star';
        starButton.innerHTML = note.starred ? '⭐' : '☆';
        starButton.onclick = () => toggleStar(index);

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editNote(index);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(index);

        actions.appendChild(starButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        noteItem.appendChild(noteTitle);
        noteItem.appendChild(noteText);
        noteItem.appendChild(actions);
        notesList.appendChild(noteItem);
    });
}

function addNote() {
    const title = noteTitleInput.value.trim();
    const text = noteInput.value.trim();
    if (title && text) {
        notes.push({ title, text, starred: false });
        noteTitleInput.value = '';
        noteInput.value = '';
        renderNotes();
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

function editNote(index) {
    const newTitle = prompt('Edit your note title:', notes[index].title);
    const newText = prompt('Edit your note text:', notes[index].text);
    if (newTitle !== null && newText !== null) {
        notes[index].title = newTitle.trim();
        notes[index].text = newText.trim();
        renderNotes();
    }
}

function toggleStar(index) {
    notes[index].starred = !notes[index].starred;
    renderNotes();
}

function searchNotes() {
    const query = searchInput.value.trim().toLowerCase();
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.text.toLowerCase().includes(query)
    );
    renderNotes(filteredNotes);
}

addNoteButton.addEventListener('click', addNote);
noteTitleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNote();
});
noteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNote();
});
searchInput.addEventListener('input', searchNotes);

renderNotes();