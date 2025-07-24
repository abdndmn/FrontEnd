import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(null);

  const [newBook, setNewBook] = useState({
    name: "",
    publicationYear: "",
    stock: "",
    authorId: "",
    publisherId: "",
    categoryId: "",
  });

  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showPublisherModal, setShowPublisherModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [newAuthor, setNewAuthor] = useState({ name: "", birthDate: "", country: "" });
  const [newPublisher, setNewPublisher] = useState({ name: "", establishmentYear: "", address: "" });
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  const baseURL = "http://localhost:8080/api/v1/books";

  useEffect(() => {
    axios.get(baseURL).then((res) => setBooks(res.data));
    axios.get("http://localhost:8080/api/v1/authors").then((res) => setAuthors(res.data));
    axios.get("http://localhost:8080/api/v1/publishers").then((res) => setPublishers(res.data));
    axios.get("http://localhost:8080/api/v1/categories").then((res) => setCategories(res.data));
  }, [update]);

  const handleAddBook = () => {
    if (!newBook.name || !newBook.categoryId) {
      toast.warn("Kitap adı ve kategori zorunludur.");
      return;
    }

    const payload = {
      name: newBook.name,
      publicationYear: parseInt(newBook.publicationYear),
      stock: parseInt(newBook.stock),
      author: { id: parseInt(newBook.authorId) },
      publisher: { id: parseInt(newBook.publisherId) },
      categories: [{ id: parseInt(newBook.categoryId) }],
    };

    axios
      .post(baseURL, payload)
      .then(() => {
        toast.success("Kitap eklendi!");
        resetForm();
        setFormVisible(false);
        setUpdate((prev) => !prev);
      })
      .catch(() => toast.error("Ekleme başarısız."));
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormVisible(true);
    setNewBook({
      name: book.name,
      publicationYear: book.publicationYear,
      stock: book.stock,
      authorId: book.author?.id || "",
      publisherId: book.publisher?.id || "",
      categoryId: book.categories?.[0]?.id.toString() || "",
    });
  };

  const handleUpdate = () => {
    const payload = {
      id: editingBook.id,
      name: newBook.name,
      publicationYear: parseInt(newBook.publicationYear),
      stock: parseInt(newBook.stock),
      author: { id: parseInt(newBook.authorId) },
      publisher: { id: parseInt(newBook.publisherId) },
      categories: [{ id: parseInt(newBook.categoryId) }],
    };

    axios
      .put(`${baseURL}/${editingBook.id}`, payload)
      .then(() => {
        toast.success("Kitap güncellendi!");
        resetForm();
        setEditingBook(null);
        setFormVisible(false);
        setUpdate((prev) => !prev);
      })
      .catch(() => toast.error("Güncelleme başarısız."));
  };

  const handleDelete = (id) => setShowDeleteWarning(id);

  const confirmDelete = (id) => {
    axios
      .delete(`${baseURL}/${id}`)
      .then(() => {
        toast.success("Kitap silindi!");
        setUpdate((prev) => !prev);
        setShowDeleteWarning(null);
      })
      .catch(() => toast.error("Silme işlemi başarısız."));
  };

  const handleSaveAuthor = () => {
    axios.post("http://localhost:8080/api/v1/authors", newAuthor).then(() => {
      toast.success("Yazar eklendi!");
      setNewAuthor({ name: "", birthDate: "", country: "" });
      setShowAuthorModal(false);
      setUpdate((prev) => !prev);
    }).catch(() => toast.error("Yazar eklenemedi."));
  };

  const handleSavePublisher = () => {
    axios.post("http://localhost:8080/api/v1/publishers", newPublisher).then(() => {
      toast.success("Yayınevi eklendi!");
      setNewPublisher({ name: "", establishmentYear: "", address: "" });
      setShowPublisherModal(false);
      setUpdate((prev) => !prev);
    }).catch(() => toast.error("Yayınevi eklenemedi."));
  };

  const handleSaveCategory = () => {
    axios.post("http://localhost:8080/api/v1/categories", newCategory).then(() => {
      toast.success("Kategori eklendi!");
      setNewCategory({ name: "", description: "" });
      setShowCategoryModal(false);
      setUpdate((prev) => !prev);
    }).catch(() => toast.error("Kategori eklenemedi."));
  };

  const resetForm = () => {
    setNewBook({
      name: "",
      publicationYear: "",
      stock: "",
      authorId: "",
      publisherId: "",
      categoryId: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kitaplar</h2>

      <div className="mb-3 text-end">
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            resetForm();
            setEditingBook(null);
            setFormVisible(!formVisible);
          }}
        >
          {formVisible ? "Formu Gizle" : "Yeni Kitap Ekle"}
        </button>
      </div>

      {formVisible && (
        <div className="row g-2 mb-4">
          <div className="col-md-4">
            <input className="form-control" placeholder="Kitap Adı" value={newBook.name} onChange={(e) => setNewBook({ ...newBook, name: e.target.value })} />
          </div>
          <div className="col-md-4">
            <input className="form-control" placeholder="Yayın Yılı" type="number" value={newBook.publicationYear} onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })} />
          </div>
          <div className="col-md-4">
            <input className="form-control" placeholder="Stok" type="number" value={newBook.stock} onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })} />
          </div>

          <div className="col-md-6">
            <div className="d-flex gap-2">
              <select className="form-select" value={newBook.authorId} onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}>
                <option value="">Yazar Seç</option>
                {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
              <button className="btn btn-outline-success" onClick={() => setShowAuthorModal(true)}>+</button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex gap-2">
              <select className="form-select" value={newBook.publisherId} onChange={(e) => setNewBook({ ...newBook, publisherId: e.target.value })}>
                <option value="">Yayınevi Seç</option>
                {publishers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <button className="btn btn-outline-success" onClick={() => setShowPublisherModal(true)}>+</button>
            </div>
          </div>

          <div className="col-md-12">
            <div className="d-flex gap-2">
              <select className="form-select" value={newBook.categoryId} onChange={(e) => setNewBook({ ...newBook, categoryId: e.target.value })}>
                <option value="">Kategori Seç</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button className="btn btn-outline-success" onClick={() => setShowCategoryModal(true)}>+</button>
            </div>
          </div>

          <div className="col-12">
            {editingBook ? (
              <button onClick={handleUpdate} className="btn btn-success w-100">Güncelle</button>
            ) : (
              <button onClick={handleAddBook} className="btn btn-primary w-100">Ekle</button>
            )}
          </div>
        </div>
      )}

      <ul className="list-group">
        {books.map((book) => (
          <li key={book.id} className="list-group-item">
            <strong>{book.name}</strong> – {book.publicationYear} – Stok: {book.stock}<br />
            <small>Yazar: {book.author?.name || "-"} | Yayınevi: {book.publisher?.name || "-"} | Kategori: {book.categories?.[0]?.name || "-"}</small><br />
            <button onClick={() => handleEdit(book)} className="btn btn-sm btn-outline-primary me-2 mt-2">Düzenle</button>
            <button onClick={() => handleDelete(book.id)} className="btn btn-sm btn-outline-danger mt-2">Sil</button>
            {showDeleteWarning === book.id && (
              <div className="alert alert-warning mt-2 p-2">
                <p>Silmek istediğinize emin misiniz?</p>
                <button className="btn btn-sm btn-danger me-2" onClick={() => confirmDelete(book.id)}>Evet</button>
                <button className="btn btn-sm btn-secondary" onClick={() => setShowDeleteWarning(null)}>Hayır</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Modals */}
      <Modal show={showAuthorModal} onHide={() => setShowAuthorModal(false)}>
        <Modal.Header closeButton><Modal.Title>Yeni Yazar Ekle</Modal.Title></Modal.Header>
        <Modal.Body>
          <input className="form-control mb-2" placeholder="Yazar Adı" value={newAuthor.name} onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })} />
          <input className="form-control mb-2" type="date" placeholder="Doğum Tarihi" value={newAuthor.birthDate} onChange={(e) => setNewAuthor({ ...newAuthor, birthDate: e.target.value })} />
          <input className="form-control" placeholder="Ülke" value={newAuthor.country} onChange={(e) => setNewAuthor({ ...newAuthor, country: e.target.value })} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAuthorModal(false)}>Vazgeç</Button>
          <Button variant="primary" onClick={handleSaveAuthor}>Kaydet</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPublisherModal} onHide={() => setShowPublisherModal(false)}>
        <Modal.Header closeButton><Modal.Title>Yeni Yayınevi Ekle</Modal.Title></Modal.Header>
        <Modal.Body>
          <input className="form-control mb-2" placeholder="Yayınevi Adı" value={newPublisher.name} onChange={(e) => setNewPublisher({ ...newPublisher, name: e.target.value })} />
          <input className="form-control mb-2" type="number" placeholder="Kuruluş Yılı" value={newPublisher.establishmentYear} onChange={(e) => setNewPublisher({ ...newPublisher, establishmentYear: e.target.value })} />
          <input className="form-control" placeholder="Adres" value={newPublisher.address} onChange={(e) => setNewPublisher({ ...newPublisher, address: e.target.value })} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPublisherModal(false)}>Vazgeç</Button>
          <Button variant="primary" onClick={handleSavePublisher}>Kaydet</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)}>
        <Modal.Header closeButton><Modal.Title>Yeni Kategori Ekle</Modal.Title></Modal.Header>
        <Modal.Body>
          <input className="form-control mb-2" placeholder="Kategori Adı" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
          <textarea className="form-control" placeholder="Açıklama" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCategoryModal(false)}>Vazgeç</Button>
          <Button variant="primary" onClick={handleSaveCategory}>Kaydet</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default BookPage;
