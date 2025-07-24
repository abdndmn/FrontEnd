import { Link } from "react-router-dom";

const cards = [
  {
    title: "Kitaplar",
    image: "/books.jpg",
    link: "/books",
    description: "Tüm kitapları görüntüleyin, ekleyin, silin veya güncelleyin.",
  },
  {
    title: "Yazarlar",
    image: "/authors.jpeg",
    link: "/authors",
    description: "Kütüphanedeki tüm yazarları yönetin.",
  },
  {
    title: "Yayımcılar",
    image: "/publishers.jpg",
    link: "/publishers",
    description: "Yayımcı bilgilerini ekleyin ve düzenleyin.",
  },
  {
    title: "Kategoriler",
    image: "/categories.jpg",
    link: "/categories",
    description: "Kitaplar için kategoriler oluşturun.",
  },
  {
    title: "Kitap Ödünç Alma",
    image: "/borrow.jpg",
    link: "/borrows",
    description: "Kullanıcıların kitap ödünç alma işlemlerini yönetin.",
  },
];

function HomePage() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Kütüphane Uygulamasına Hoş Geldiniz</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {cards.map((card, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm">
              <img
                src={card.image}
                className="card-img-top"
                alt={card.title}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.description}</p>
                <Link to={card.link} className="btn btn-primary mt-auto">
                  Git
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
