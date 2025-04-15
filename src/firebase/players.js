import { db } from './config';
import { collection, addDoc, query, where, getDocs, setDoc, doc } from 'firebase/firestore';

// Función para crear o actualizar un jugador en la colección "players"
export const createPlayer = async (userId, nickname, avatarUrl) => {
  try {
    const playersRef = collection(db, "players");

    // Verificar si ya existe un jugador relacionado con este userId
    const q = query(playersRef, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Si el jugador ya existe, actualizar su información
      const playerDoc = querySnapshot.docs[0]; // Tomar el primer jugador encontrado
      const playerId = playerDoc.id;

      await setDoc(doc(db, "players", playerId), { nickname, avatarUrl }, { merge: true });
      console.log("Jugador actualizado con ID:", playerId);
      return { success: true, player_id: playerId };
    }

    // Si no existe, crear un nuevo jugador con un ID único
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("es-ES", {
      timeZone: "America/Bogota", // Cambia esto según tu zona horaria
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const newPlayer = await addDoc(playersRef, {
      user_id: userId,
      nickname, // Guardar como nickname
      avatarUrl,
      created_at: formattedDate, // Fecha de creación formateada
    });

    console.log("Jugador creado con ID:", newPlayer.id);
    return { success: true, player_id: newPlayer.id };
  } catch (error) {
    console.error("Error al crear o actualizar el jugador:", error);
    return { success: false, error: error.message };
  }
};

// Función para obtener jugadores relacionados con un usuario
export async function getPlayersByUserId(userId) {
    try {
        const playersRef = collection(db, 'players');
        const q = query(playersRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);

        const players = [];
        querySnapshot.forEach((doc) => {
            players.push({ id: doc.id, ...doc.data() });
        });

        console.log('Jugadores encontrados:', players);
        return players;
    } catch (error) {
        console.error('Error obteniendo jugadores:', error);
        return [];
    }
}