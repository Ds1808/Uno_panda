import { db } from './config';
import { collection, addDoc, query, where, getDocs, Timestamp, doc, setDoc, getDoc } from 'firebase/firestore';

// Función para crear o actualizar un jugador en la colección "players"
export const createPlayer = async (userId, username, avatarUrl) => {
  try {
    const playerRef = doc(db, "players", userId);

    // Verificar si el jugador ya existe
    const playerDoc = await getDoc(playerRef);
    if (playerDoc.exists()) {
      // Actualizar el jugador existente
      await setDoc(playerRef, { username, avatarUrl }, { merge: true });
      console.log("Jugador actualizado con ID:", userId);
      return { success: true, player_id: userId };
    }

    // Crear un nuevo jugador si no existe
    await setDoc(playerRef, { username, avatarUrl });
    console.log("Jugador creado con ID:", userId);
    return { success: true, player_id: userId };
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