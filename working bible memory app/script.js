fetch('bible.json')
.then(response => response.json())
.then(data => {
  const books = [...new Set(data.map(verse => verse["Verse Location"].split(" ")[0]))];

  // Populate the book dropdown
  const bookDropdown = document.getElementById('book');
  books.forEach(book => {
    const option = document.createElement('option');
    option.value = book;
    option.text = book;
    bookDropdown.appendChild(option);
  });
})
.catch(error => console.error("Error fetching JSON", error));

function generateCards() {
fetch('bible.json')
  .then(response => response.json())
  .then(data => {
    const selectedBook = document.getElementById('book').value;
    const selectedChapter = parseInt(document.getElementById('chapter').value, 10);

    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear existing cards

    const filteredVerses = data.filter(verse => {
      const verseBookChapter = verse["Verse Location"].split(" ");
      const verseBook = verseBookChapter[0];
      const verseChapter = parseInt(verseBookChapter[1], 10);

      return selectedBook === verseBook && selectedChapter === verseChapter;
    });

    for (let i = 0; i < filteredVerses.length; i += 5) {
      // Create front card
      const frontCardDiv = document.createElement('div');
      frontCardDiv.classList.add('card');
      frontCardDiv.classList.add('front');

      for (let j = i; j < i + 5 && j < filteredVerses.length; j++) {
        const currentVerse = filteredVerses[j];
        const firstLetters = currentVerse.Text.split(' ').map(word => word[0]).join('');

        const verseDiv = document.createElement('div');
        verseDiv.textContent = `${currentVerse["Verse Location"]}:\n${firstLetters}`;

        frontCardDiv.appendChild(verseDiv);
      }

      // Create back card
      const backCardDiv = document.createElement('div');
      backCardDiv.classList.add('card');
      backCardDiv.classList.add('back');

      for (let j = i; j < i + 5 && j < filteredVerses.length; j++) {
        const currentVerse = filteredVerses[j];

        const verseDiv = document.createElement('div');
        verseDiv.textContent = `${currentVerse["Verse Location"]}:\n${currentVerse.Text}`;

        backCardDiv.appendChild(verseDiv);
      }

      // Append both cards to the container
      container.appendChild(frontCardDiv);
      container.appendChild(backCardDiv);
    }
  })
  .catch(error => console.error("Error fetching JSON", error));
}