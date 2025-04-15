import { db } from './config';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

// Función para crear un jugador en la colección "players"
export async function createPlayer(userId, nickname, avatarUrl) {
    try {
        const playerRef = await addDoc(collection(db, 'players'), {
            user_id: userId, // Relación con el usuario en la colección "users"
            nickname: nickname,
            avatar_url: avatarUrl,
            created_at: Timestamp.now(), // Fecha y hora actual
        });

        console.log('Jugador creado con ID:', playerRef.id);
        return { success: true, player_id: playerRef.id };
    } catch (error) {
        console.error('Error creando jugador:', error);
        return { success: false, error: error.message };
    }
}

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