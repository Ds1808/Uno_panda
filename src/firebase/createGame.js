// createGame.js
import { db } from '@/firebase/config'; // Asegúrate de importar tu instancia de Firestore
import { collection, doc, setDoc, addDoc, Timestamp, updateDoc, getDocs, getDoc, where, query, onSnapshot } from 'firebase/firestore';
import Swal from 'sweetalert2';

function generateGameCode() {
    console.log('Generando Codigo de la partida...');
    const codigo = 'G' + Math.floor(1000 + Math.random() * 9000).toString();
    console.log('Codigo de la partida generado:', codigo);
    return codigo;
}

/// Función para crear una nueva partida
export async function createGame(hostPlayerId, invitedPlayerIds = []) {
  if (!hostPlayerId) throw new Error('Se requiere el ID del jugador host.');

  const allPlayerIds = [hostPlayerId, ...invitedPlayerIds];
  if (allPlayerIds.length > 4) throw new Error('No se pueden agregar más de 4 jugadores a la partida.');

  const gameCode = generateGameCode();

  // Crear el documento del juego
  const gameRef = doc(db, 'games', gameCode);
  await setDoc(gameRef, {
    status: 'no_iniciada',
    created_at: Timestamp.now(),
    current_turn_player_id: hostPlayerId
  });

  // Subcolección de participantes
  const participantsCol = collection(gameRef, 'game_participants');

  await Promise.all(allPlayerIds.map((playerId, index) => {
    const isHost = playerId === hostPlayerId;
    const participantData = {
      player_id: playerId,
      is_host: isHost,
      player_position: index + 1
    };
    return addDoc(participantsCol, participantData);
  }));

  return gameCode;
}
  

// Función para Iniciar la partida
// Esta función se encarga de iniciar la partida y verificar si hay suficientes jugadores
export async function iniciarPartida(gameCode) {
  try {
    const confirmar = await Swal.fire({
      title: '¿Iniciar partida?',
      text: 'Una vez iniciada, no podrás agregar más jugadores.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, iniciar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmar.isConfirmed) return;

    // Verifica jugadores en la subcolección
    const participantesSnapshot = await getDocs(
      collection(db, `games/${gameCode}/game_participants`)
    );

    if (participantesSnapshot.size < 2) {
      await Swal.fire(
        'Mínimo de jugadores no alcanzado',
        'Necesitas al menos 2 jugadores para iniciar la partida.',
        'error'
      );
      return;
    }

    // Actualiza el estado de la partida
    const gameRef = doc(db, 'games', gameCode);
    await updateDoc(gameRef, { status: 'iniciada' });

    await Swal.fire('¡Partida iniciada!', '', 'success');

    return { codigo: gameCode, jugadores: participantesSnapshot.size };
  } catch (error) {
    console.error('Error al iniciar la partida:', error);
    await Swal.fire('Error', 'No se pudo iniciar la partida.', 'error');
    throw error;
  }
}

// Función para obtener los jugadores de una partida
/**
 * Escucha los cambios en los jugadores de una partida.
 * @param {string} gameCode - Código de la partida.
 * @param {function} callback - Función que recibe el array actualizado de jugadores.
 */
export function escucharJugadoresDePartida(gameCode, callback) {
  const participantsRef = collection(db, `games/${gameCode}/game_participants`);

  return onSnapshot(participantsRef, async (snapshot) => {
    const jugadores = [];

    for (const docSnap of snapshot.docs) {
      const participant = docSnap.data();
      const playerRef = doc(db, 'players', participant.player_id);
      const playerDoc = await getDoc(playerRef);

      if (playerDoc.exists()) {
        jugadores.push({
          nombre: playerDoc.data().nickname || 'Sin nombre',
          turno: participant.player_position,
        });
      } else {
        console.warn(`⚠️ El jugador con ID ${participant.player_id} no existe en la colección "players".`);
        jugadores.push({
          nombre: 'Desconocido',
          turno: participant.player_position,
        });
      }
    }

    // Ordenar por turno
    jugadores.sort((a, b) => a.turno - b.turno);

    // Enviar los jugadores actualizados al componente
    callback(jugadores);
  });
  }
  export async function obtenerPlayerIdDesdeUserId(userId) {
    const q = query(collection(db, 'players'), where('user_id', '==', userId));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    } else {
      throw new Error('No se encontró player con ese user_id');
    }
  }