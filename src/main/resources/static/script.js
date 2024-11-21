document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');
    const form = document.getElementById('book-form');
    const updateForm = document.getElementById('update-form');
    const updateId = document.getElementById('update-id');
    const updateTitle = document.getElementById('update-title');
    const updateAuthor = document.getElementById('update-author');
    const updateGenre = document.getElementById('update-genre');

    // Fetch and Display Books
    const fetchBooks = async () => {
        const response = await fetch('/api/books');
        const books = await response.json();
        bookList.innerHTML = books.map(book => `
            <li>
                <strong>${book.title}</strong> by ${book.author} - Genre: ${book.genre}
                <button onclick="editBook(${book.id}, '${book.title}', '${book.author}', '${book.genre}')">Edit</button>
                <button onclick="deleteBook(${book.id})">Delete</button>
            </li>
        `).join('');
    };

    // Add a New Book
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;

        const newBook = { title, author, genre };
        await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        form.reset();
        fetchBooks(); // Refresh the list after adding
    });

    // Delete a Book
    window.deleteBook = async (id) => {
        await fetch(`/api/books/${id}`, {
            method: 'DELETE'
        });
        fetchBooks(); // Refresh the list after deletion
    };

    // Edit a Book
    window.editBook = (id, title, author, genre) => {
        updateId.value = id;
        updateTitle.value = title;
        updateAuthor.value = author;
        updateGenre.value = genre;
        updateForm.style.display = 'block'; // Show the update form
    };

    // Update a Book
    document.getElementById('update-button').addEventListener('click', async () => {
        const id = updateId.value;
        const updatedBook = {
            title: updateTitle.value,
            author: updateAuthor.value,
            genre: updateGenre.value
        };

        await fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        updateForm.style.display = 'none'; // Hide the update form
        fetchBooks(); // Refresh the list after updating
    });

    // Initial Fetch of Books
    fetchBooks();
});