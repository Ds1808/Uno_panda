import { db } from './config';
import { collection, query, where, getDocs } from 'firebase/firestore';

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