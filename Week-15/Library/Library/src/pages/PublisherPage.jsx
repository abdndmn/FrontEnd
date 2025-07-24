import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PublisherPage() {
  const [publishers, setPublishers] = useState([]);
  const [newPublisher, setNewPublisher] = useState({ name: "", establishmentYear: "", address: "" });
  const [update, setUpdate] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/publishers").then((res) => setPublishers(res.data));
  }, [update]);

  const handleAddOrUpdate = () => {
    if (!newPublisher.name) return toast.warn("Yayınevi adı boş bırakılamaz.");

    if (editingId) {
      axios
        .put(`http://localhost:8080/api/v1/publishers/${editingId}`, newPublisher)
        .then(() => {
          toast.success("Yayınevi güncellendi!");
          resetForm();
          setUpdate((prev) => !prev);
        })
        .catch(() => toast.error("Güncelleme başarısız."));
    } else {
      axios
        .post("http://localhost:8080/api/v1/publishers", newPublisher)
        .then(() => {
          toast.success("Yayınevi eklendi!");
          resetForm();
          setUpdate((prev) => !prev);
        })
        .catch(() => toast.error("Ekleme başarısız."));
    }
  };

  const handleEdit = (p) => {
    setNewPublisher({
      name: p.name,
      establishmentYear: p.establishmentYear || "",
      address: p.address || "",
    });
    setEditingId(p.id);
  };

  const confirmDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/publishers/${id}`)
      .then(() => {
        toast.success("Yayınevi silindi!");
        setUpdate((prev) => !prev);
        setShowDeleteWarning(null);
      })
      .catch(() => toast.error("Silme işlemi başarısız."));
  };

  const resetForm = () => {
    setNewPublisher({ name: "", establishmentYear: "", address: "" });
    setEditingId(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Yayımcılar</h2>
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input className="form-control" placeholder="Ad" value={newPublisher.name} onChange={(e) => setNewPublisher({ ...newPublisher, name: e.target.value })} />
        </div>
        <div className="col-md-4">
          <input className="form-control" placeholder="Kuruluş Yılı" type="number" value={newPublisher.establishmentYear} onChange={(e) => setNewPublisher({ ...newPublisher, establishmentYear: e.target.value })} />
        </div>
        <div className="col-md-4">
          <input className="form-control" placeholder="Adres" value={newPublisher.address} onChange={(e) => setNewPublisher({ ...newPublisher, address: e.target.value })} />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary w-100" onClick={handleAddOrUpdate}>
            {editingId ? "Güncelle" : "Yayınevi Ekle"}
          </button>
          {editingId && (
            <button className="btn btn-secondary" onClick={resetForm}>
              İptal
            </button>
          )}
        </div>
      </div>
      <ul className="list-group">
        {publishers.map((p) => (
          <li key={p.id} className="list-group-item">
            <strong>{p.name}</strong> ({p.establishmentYear}) – {p.address}
            <div className="float-end">
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(p)}>Düzenle</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => setShowDeleteWarning(p.id)}>Sil</button>
            </div>
            {showDeleteWarning === p.id && (
              <div className="alert alert-warning mt-2 p-2">
                <p>Silmek istediğinize emin misiniz?</p>
                <button className="btn btn-sm btn-danger me-2" onClick={() => confirmDelete(p.id)}>Evet</button>
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

export default PublisherPage;
