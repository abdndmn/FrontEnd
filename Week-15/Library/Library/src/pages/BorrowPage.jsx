import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BorrowPage() {
  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(null);
  const [editingBorrow, setEditingBorrow] = useState(null);

  const [newBorrow, setNewBorrow] = useState({
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    returnDate: "",
    bookId: "",
  });

  const baseURL = "http://localhost:8080/api/v1";

  useEffect(() => {
    fetchBorrows();
    fetchBooks();
  }, [update]);

  const fetchBorrows = async () => {
    try {
      const res = await axios.get(`${baseURL}/borrows`);
      setBorrows(res.data.content || res.data);
    } catch (err) {
      toast.error("Ödünç veriler alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${baseURL}/books`);
      setBooks(res.data.content || res.data);
    } catch (err) {
      toast.error("Kitaplar alınamadı.");
    }
  };

  const resetForm = () => {
    setNewBorrow({
      borrowerName: "",
      borrowerMail: "",
      borrowingDate: "",
      returnDate: "",
      bookId: "",
    });
    setEditingBorrow(null);
  };

  const handleAddBorrow = async () => {
    const { borrowerName, borrowerMail, borrowingDate, returnDate, bookId } = newBorrow;
    if (!borrowerName || !borrowerMail || !borrowingDate || !returnDate || !bookId) {
      toast.warn("Lütfen tüm alanları doldurun.");
      return;
    }

    const payload = {
      borrowerName,
      borrowerMail,
      borrowingDate,
      returnDate,
      bookForBorrowingRequest: {
        id: parseInt(bookId),
        name: "",
        publicationYear: 0,
        stock: 0,
      },
    };

    try {
      await axios.post(`${baseURL}/borrows`, payload);
      toast.success("Ödünç işlemi başarıyla eklendi!");
      resetForm();
      setUpdate((prev) => !prev);
    } catch (err) {
      toast.error("Ödünç işlemi eklenemedi.");
    }
  };

  const handleEditBorrow = (br) => {
    setEditingBorrow(br);
    setNewBorrow({
      borrowerName: br.borrowerName,
      borrowerMail: br.borrowerMail,
      borrowingDate: br.borrowingDate,
      returnDate: br.returnDate || "",
      bookId: br.book?.id?.toString() || "",
    });
  };

  const handleUpdateBorrow = async () => {
    const { borrowerName, borrowingDate, returnDate } = newBorrow;
    if (!editingBorrow || !borrowerName || !borrowingDate || !returnDate) {
      toast.warn("Lütfen gerekli alanları doldurun.");
      return;
    }

    const payload = {
      borrowerName,
      borrowingDate,
      returnDate,
    };

    try {
      await axios.put(`${baseURL}/borrows/${editingBorrow.id}`, payload);
      toast.success("Ödünç kaydı güncellendi!");
      resetForm();
      setUpdate((prev) => !prev);
    } catch (err) {
      toast.error("Güncelleme başarısız.");
    }
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/borrows/${id}`);
      toast.success("Ödünç kaydı silindi!");
      setUpdate((prev) => !prev);
      setShowDeleteWarning(null);
    } catch {
      toast.error("Silme işlemi başarısız.");
    }
  };

  if (loading) return <div className="text-center mt-5">Yükleniyor...</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kitap Ödünç Alma</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Ad Soyad"
            value={newBorrow.borrowerName}
            onChange={(e) => setNewBorrow({ ...newBorrow, borrowerName: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            type="email"
            placeholder="E-Posta"
            value={newBorrow.borrowerMail}
            onChange={(e) => setNewBorrow({ ...newBorrow, borrowerMail: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Alış Tarihi</label>
          <input
            type="date"
            className="form-control"
            value={newBorrow.borrowingDate}
            onChange={(e) => setNewBorrow({ ...newBorrow, borrowingDate: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">İade Tarihi</label>
          <input
            type="date"
            className="form-control"
            value={newBorrow.returnDate}
            onChange={(e) => setNewBorrow({ ...newBorrow, returnDate: e.target.value })}
          />
        </div>

        {!editingBorrow && (
          <div className="col-md-12">
            <select
              className="form-select"
              value={newBorrow.bookId}
              onChange={(e) => setNewBorrow({ ...newBorrow, bookId: e.target.value })}
            >
              <option value="">Kitap Seç</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="col-12">
          {editingBorrow ? (
            <button onClick={handleUpdateBorrow} className="btn btn-success w-100">
              Güncelle
            </button>
          ) : (
            <button onClick={handleAddBorrow} className="btn btn-primary w-100">
              Ödünç Al
            </button>
          )}
        </div>
      </div>

      <ul className="list-group">
        {borrows.map((br) => (
          <li key={br.id} className="list-group-item">
            <strong>{br.borrowerName}</strong> ({br.borrowerMail})<br />
            {br.borrowingDate} → {br.returnDate || "Henüz iade edilmedi"} |{" "}
            <em>{br.book?.name || "-"}</em>
            <div className="d-flex justify-content-end mt-2">
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => handleEditBorrow(br)}
              >
                Düzenle
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setShowDeleteWarning(br.id)}
              >
                Sil
              </button>
            </div>
            {showDeleteWarning === br.id && (
              <div className="alert alert-warning mt-2 p-2">
                <p>Silmek istediğinize emin misiniz?</p>
                <button
                  className="btn btn-sm btn-danger me-2"
                  onClick={() => confirmDelete(br.id)}
                >
                  Evet
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowDeleteWarning(null)}
                >
                  Hayır
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
}

export default BorrowPage;
