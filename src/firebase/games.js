import { db } from './config';
import { collection, doc, getDocs, addDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';

/**
 * Actualiza el estado del juego con la carta inicial.
 * @param {string} gameCode - Código de la partida.
 * @param {Object} card - Carta inicial (número y color).
 */
export async function updateGameStateWithCard(gameCode, card) {
  try {
    const gameRef = doc(db, 'games', gameCode);
    await updateDoc(gameRef, {
      status: 'in_progress', // Cambiar el estado del juego a "en progreso"
      current_card: card, // Guardar la carta inicial
    });
    console.log('Estado del juego actualizado con la carta inicial:', card);
  } catch (error) {
    console.error('Error al actualizar el estado del juego:', error);
    throw error;
  }
}

// Función para obtener todas las cartas desde la colección "cards"
export async function getAllCards() {
    try {
        const cardsSnapshot = await getDocs(collection(db, 'cards'));
        const cards = [];
        cardsSnapshot.forEach((doc) => {
            cards.push({ card_id: doc.id, ...doc.data() });
        });
        return cards;
    } catch (error) {
        console.error('Error obteniendo cartas:', error);
        throw error;
    }
}

// Función para asignar cartas aleatorias a los jugadores
export async function assignCardsToPlayers(gameCode, playerIds) {
    try {
        // Obtener todas las cartas desde la colección "cards"
        const allCards = await getAllCards();
        console.log('Cartas disponibles:', allCards);

        // Barajar las cartas aleatoriamente
        const shuffledCards = allCards.sort(() => Math.random() - 0.5);

        // Asignar la primera carta al centro del juego
        const centerCard = shuffledCards.splice(0, 1)[0];
        await addDoc(collection(db, `games/${gameCode}/game_card_instances`), {
            card_id: centerCard.card_id,
            game_id: gameCode,
            location: 'center', // Ubicación inicial: centro del juego
            current_owner_player_id: null, // Sin propietario
            card_order: null, // Puedes asignar un orden si es necesario
            created_at: Timestamp.now(),
        });

        console.log('Carta asignada al centro del juego:', centerCard);

        // Asignar 7 cartas a cada jugador
        for (const playerId of playerIds) {
            const playerCards = shuffledCards.splice(0, 7); // Extraer 7 cartas

            for (const card of playerCards) {
                // Crear una instancia de la carta en la subcolección "game_card_instances"
                await addDoc(collection(db, `games/${gameCode}/game_card_instances`), {
                    card_id: card.card_id,
                    game_id: gameCode,
                    location: 'hand', // Ubicación inicial: mano del jugador
                    current_owner_player_id: playerId,
                    card_order: null, // Puedes asignar un orden si es necesario
                    created_at: Timestamp.now(),
                });
            }

            console.log(`Cartas asignadas al jugador ${playerId}:`, playerCards);
        }

        console.log('Cartas asignadas correctamente a todos los jugadores.');
    } catch (error) {
        console.error('Error asignando cartas a los jugadores:', error);
        throw error;
    }
}

// Función para obtener los jugadores de la sala
export async function fetchGameParticipants(gameCode) {
    try {
        const participantsSnapshot = await getDocs(collection(db, `games/${gameCode}/game_participants`));
        const participants = [];
        participantsSnapshot.forEach((doc) => {
            participants.push({ id: doc.id, ...doc.data() });
        });
        console.log('Participantes de la partida:', participants);
        return participants;
    } catch (error) {
        console.error('Error obteniendo los participantes de la partida:', error);
        throw error;
    }
}

// Función para obtener las cartas de los jugadores
export async function fetchPlayerCards(gameCode) {
    try {
        const cardsSnapshot = await getDocs(collection(db, `games/${gameCode}/game_card_instances`));
        const cardsByPlayer = {};

        cardsSnapshot.forEach((doc) => {
            const cardData = doc.data();
            const playerId = cardData.current_owner_player_id;

            if (!cardsByPlayer[playerId]) {
                cardsByPlayer[playerId] = [];
            }

            cardsByPlayer[playerId].push({
                card_id: cardData.card_id,
                location: cardData.location,
                card_order: cardData.card_order,
            });
        });

        console.log('Cartas de los jugadores:', cardsByPlayer);
        return cardsByPlayer;
    } catch (error) {
        console.error('Error obteniendo las cartas de los jugadores:', error);
        throw error;
    }
}

// Función para inicializar el juego
export async function initializeGame(gameCode, players) {
    try {
        // Crear el documento del juego en Firestore
        await setDoc(doc(db, 'games', gameCode), {
            status: 'in_progress',
            created_at: Timestamp.now(),
            current_turn_player_id: null, // Puedes asignar el primer turno aquí
        });

        console.log('Juego creado con ID:', gameCode);

        // Asignar cartas a los jugadores
        const playerIds = players.map((player) => player.id); // Extraer los IDs de los jugadores
        await assignCardsToPlayers(gameCode, playerIds);

        console.log('Cartas asignadas exitosamente.');
    } catch (error) {
        console.error('Error inicializando el juego:', error);
        throw error;
    }
}