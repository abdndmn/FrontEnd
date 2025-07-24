import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ name: "", birthDate: "", country: "" });
  const [update, setUpdate] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/authors").then((res) => setAuthors(res.data));
  }, [update]);

  const handleAddOrUpdateAuthor = () => {
    if (!newAuthor.name) return toast.warn("İsim boş bırakılamaz.");

    if (editingId) {
      axios
        .put(`http://localhost:8080/api/v1/authors/${editingId}`, newAuthor)
        .then(() => {
          toast.success("Yazar güncellendi!");
          resetForm();
          setUpdate((prev) => !prev);
        })
        .catch(() => toast.error("Yazar güncellenemedi."));
    } else {
      axios
        .post("http://localhost:8080/api/v1/authors", newAuthor)
        .then(() => {
          toast.success("Yazar eklendi!");
          resetForm();
          setUpdate((prev) => !prev);
        })
        .catch(() => toast.error("Yazar eklenemedi."));
    }
  };

  const handleEdit = (author) => {
    setNewAuthor({
      name: author.name,
      birthDate: author.birthDate || "",
      country: author.country || "",
    });
    setEditingId(author.id);
  };

  const confirmDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/authors/${id}`)
      .then(() => {
        toast.success("Yazar silindi!");
        setUpdate((prev) => !prev);
        setShowDeleteWarning(null);
      })
      .catch(() => toast.error("Silme işlemi başarısız."));
  };

  const resetForm = () => {
    setNewAuthor({ name: "", birthDate: "", country: "" });
    setEditingId(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Yazarlar</h2>
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Ad"
            value={newAuthor.name}
            onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            type="date"
            placeholder="Doğum Tarihi"
            value={newAuthor.birthDate}
            onChange={(e) => setNewAuthor({ ...newAuthor, birthDate: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Ülke"
            value={newAuthor.country}
            onChange={(e) => setNewAuthor({ ...newAuthor, country: e.target.value })}
          />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary w-100" onClick={handleAddOrUpdateAuthor}>
            {editingId ? "Güncelle" : "Yazar Ekle"}
          </button>
          {editingId && (
            <button className="btn btn-secondary" onClick={resetForm}>
              İptal
            </button>
          )}
        </div>
      </div>

      <ul className="list-group">
        {authors.map((a) => (
          <li key={a.id} className="list-group-item">
            <strong>{a.name}</strong> ({a.birthDate}) – {a.country}
            <div className="float-end">
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(a)}>
                Düzenle
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => setShowDeleteWarning(a.id)}>
                Sil
              </button>
            </div>
            {showDeleteWarning === a.id && (
              <div className="alert alert-warning mt-2 p-2">
                <p>Silmek istediğinize emin misiniz?</p>
                <button className="btn btn-sm btn-danger me-2" onClick={() => confirmDelete(a.id)}>
                  Evet
                </button>
                <button className="btn btn-sm btn-secondary" onClick={() => setShowDeleteWarning(null)}>
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

export default AuthorPage;
