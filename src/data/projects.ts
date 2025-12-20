export const projects = [
  {
    id: 1,
    title: "AI Chatbot Assistant",
    category: "Natural Language Processing",
    description: "Mengembangkan chatbot cerdas menggunakan arsitektur Transformer dan LSTM. Model dilatih untuk memahami konteks percakapan kompleks dan memberikan respon natural dalam Bahasa Indonesia.",
    tags: ["Python", "PyTorch", "Transformers", "React"],
    color: "from-blue-500 to-cyan-400", // Color tetap disimpan untuk titik kecil di mobile view
    // TAMBAHKAN PATH IMAGE DI SINI (sesuaikan nama file Anda)
    image: "/images/projects/chatbot.jpg", 
  },
  {
    id: 2,
    title: "Spices Classification",
    category: "Computer Vision (CNN)",
    description: "Sistem klasifikasi citra untuk membedakan jenis rempah (Jahe, Kunyit, Lengkuas) dengan akurasi tinggi. Menggunakan Convolutional Neural Networks (CNN) dengan teknik Data Augmentation.",
    tags: ["TensorFlow", "Keras", "OpenCV", "Flask"],
    color: "from-orange-500 to-yellow-400",
    image: "/images/projects/spices-cnn.jpg",
  },
  {
    id: 3,
    title: "Coffee Supply Chain",
    category: "Blockchain Technology",
    description: "Simulasi pelacakan rantai pasok kopi menggunakan Hyperledger Fabric. Menjamin transparansi dan immutability data dari petani hingga konsumen akhir.",
    tags: ["Hyperledger Fabric", "Docker", "Go", "Node.js"],
    color: "from-emerald-500 to-green-400",
    image: "/images/projects/blockchain-coffee.jpg",
  },
  {
    id: 4,
    title: "Fraud Detection System",
    category: "Data Analysis",
    description: "Model Machine Learning untuk mendeteksi anomali transaksi keuangan. Menganalisis pola perilaku user untuk mencegah penipuan secara real-time.",
    tags: ["Scikit-learn", "Pandas", "XGBoost", "FastAPI"],
    color: "from-purple-500 to-pink-400",
    image: "/images/projects/fraud-detection.jpg",
  },
];