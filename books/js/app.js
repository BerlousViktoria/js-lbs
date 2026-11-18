import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://emasqjkkwnvfflfmzvca.supabase.co";
const supabaseKey = "sb_publishable_hDRoqkR5g-Mu-VY10BWwpg_zQQdmXqB";
const db = createClient(supabaseUrl, supabaseKey);

const status = document.querySelector("#status");
const list = document.querySelector("#books-list");

async function loadBooks() {
  status.textContent = "Завантаження книг...";
  list.replaceChildren();
  const { data, error } = await db
    .from("books")
    .select("id, title, author")
    .order("id", { ascending: true });
  if (error) {
    console.error("Помилка завантаження:", error);
    status.textContent =
      "Не вдалося завантажити книги. Перевірте консоль браузера.";
    return;
  }
  for (const book of data) {
    const item = document.createElement("li");
    item.textContent = `${book.title} – ${book.author}`;
    list.append(item);
  }
  status.textContent = `Знайдено книг: ${data.length}`;
}

const bookForm = document.querySelector('#book-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

bookForm.addEventListener('submit', async(event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if(
    title.length === 0 ||
    title.length > 150 || 
    author.length === 0 ||
    author.length > 150
  ) {
    status.textContent = 'Перевірте назву книгу та автора.';
    return;
  }

  const submitButton = bookForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  status.textContent = 'Додавання книги...';

  try{
    const {error} = await db
      .from('books')
      .insert({title, author});

      if(error){
        console.error('Помилка додавання: ', error);
        status.textContent = 'Не вдалося додати книгу.';
        return;
      }

      bookForm.reset();

      await loadBooks();
  } catch(error){
    console.error('Помилка запиту:', error);
    status.textContent = 'Не вдалося виконати запит.';
  } finally{
    submitButton.disabled = false;
  }
});

  
loadBooks();
  
