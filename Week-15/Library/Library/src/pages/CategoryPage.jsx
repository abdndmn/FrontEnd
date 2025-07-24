import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [update, setUpdate] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/categories").then((res) => setCategories(res.data));
  }, [update]);

  const handleAddOrUpdate = () => {
    if (!newCategory.name) return toast.warn("Kategori adı zorunludur.");

    if (editingId) {
      axios
        .put(`http://localhost:8080/api/v1/categories/${editingId}`, newCategory)
        .then(() => {
          toast.success("Kategori güncellendi!");
          resetForm();
          setUpdate((prev) => !prev);
        })
        .catch(() => toast.error("Güncelleme başarısız."));
    } else {
      axios
        .post("http://localhost:8080/api/v1/categories", newCategory)
        .then(() => {
          toast.success("Kategori eklendi!");
          resetForm();
          setUpdate((prev) => !prev);
        })
        .catch(() => toast.error("Kategori eklenemedi."));
    }
  };

  const handleEdit = (c) => {
    setNewCategory({ name: c.name, description: c.description || "" });
    setEditingId(c.id);
  };

  const confirmDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/categories/${id}`)
      .then(() => {
        toast.success("Kategori silindi!");
        setUpdate((prev) => !prev);
        setShowDeleteWarning(null);
      })
      .catch(() => toast.error("Silme işlemi başarısız."));
  };

  const resetForm = () => {
    setNewCategory({ name: "", description: "" });
    setEditingId(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kategoriler</h2>
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input className="form-control" placeholder="Kategori Adı" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
        </div>
        <div className="col-md-6">
          <input className="form-control" placeholder="Açıklama" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary w-100" onClick={handleAddOrUpdate}>
            {editingId ? "Güncelle" : "Kategori Ekle"}
          </button>
          {editingId && (
            <button className="btn btn-secondary" onClick={resetForm}>
              İptal
            </button>
          )}
        </div>
      </div>
      <ul className="list-group">
        {categories.map((c) => (
          <li key={c.id} className="list-group-item">
            <strong>{c.name}</strong> – {c.description}
            <div className="float-end">
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(c)}>Düzenle</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => setShowDeleteWarning(c.id)}>Sil</button>
            </div>
            {showDeleteWarning === c.id && (
              <div className="alert alert-warning mt-2 p-2">
                <p>Silmek istediğinize emin misiniz?</p>
                <button className="btn btn-sm btn-danger me-2" onClick={() => confirmDelete(c.id)}>Evet</button>
                <button className="btn btn-sm btn-secondary" onClick={() => setShowDeleteWarning(null)}>Hayır</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default CategoryPage;
