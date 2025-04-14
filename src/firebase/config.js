import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importar el servicio de autenticación
import { getFirestore } from "firebase/firestore"; // Importar el servicio de Firestore
import { getAnalytics } from "firebase/analytics"; // Importar analíticas

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBmfcEdZryzUCdFEy8pl0x58SW5HWAhH-Y",
  authDomain: "proyecto-uno-e7802.firebaseapp.com",
  projectId: "proyecto-uno-e7802",
  storageBucket: "proyecto-uno-e7802.firebasestorage.app",
  messagingSenderId: "925294643277",
  appId: "1:925294643277:web:9f527fd1a3857527a7b404",
  measurementId: "G-TV2ZLFGWJY"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener los servicios que necesitas
const auth = getAuth(app); // Autenticación
const db = getFirestore(app); // Firestore
const analytics = getAnalytics(app); // Analítica

// Exportar los servicios para usarlos en otras partes de tu aplicación
export { auth, db, analytics };
