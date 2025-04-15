// src/composables/useJoinGame.js
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import { useRouter } from "vue-router"; // Importar el router

export function useJoinGame() {
    const auth = getAuth();
    const db = getFirestore();
    const router = useRouter();

    const unirseAPartida = async (codigoIngresado) => {
        try {
            if (!codigoIngresado) {
                Swal.fire("Error", "Debes ingresar un código de partida.", "error");
                return;
            }

            const partidaRef = doc(db, "games", codigoIngresado);
            const partidaSnap = await getDoc(partidaRef);

            if (!partidaSnap.exists()) {
                Swal.fire("Error", "El código de la partida no existe.", "error");
                return;
            }

            const user = auth.currentUser;
            if (!user) {
                Swal.fire("Error", "Debes iniciar sesión para unirte a una partida.", "error");
                return;
            }

            const { uid, displayName } = user; // Eliminamos el email aquí

            // Referencia al documento del jugador en la colección "players"
            const playerRef = doc(db, "players", uid);
            const playerSnap = await getDoc(playerRef);

            // Si el jugador no existe, crearlo temporalmente
            if (!playerSnap.exists()) {
                const newPlayerData = {
                    nickname: displayName || "Jugador",
                    avatar_url: `https://avatars.dicebear.com/api/initials/${(displayName || "Jugador").charAt(0)}.svg`,
                    created_at: new Date().toISOString(),
                };

                await setDoc(playerRef, newPlayerData);
                console.log("Jugador creado en la colección 'players':", newPlayerData);
            }

            const playerData = (await getDoc(playerRef)).data(); // Obtener los datos del jugador recién creado o existente
            const jugadoresRef = collection(db, `games/${codigoIngresado}/game_participants`);
            const jugadorDocRef = doc(jugadoresRef, uid); // Usar el uid como ID del documento
            const jugadorSnap = await getDoc(jugadorDocRef);

            if (jugadorSnap.exists()) {
                Swal.fire("Bienvenido de vuelta", "Ya estás registrado en esta partida.", "info");
                router.push(`/Lobbypartida/${codigoIngresado}`);
                return;
            }

            if (partidaSnap.data().estado === "iniciada") {
                Swal.fire("Partida en curso", "La partida ya ha comenzado. No puedes unirte en este momento.", "warning");
                return;
            }

            const jugadoresSnapshot = await getDocs(jugadoresRef);
            if (jugadoresSnapshot.size >= 4) {
                Swal.fire("Sala llena", "La sala ha alcanzado su capacidad máxima de jugadores.", "error");
                return;
            }

            const player_position = jugadoresSnapshot.size + 1;

            // Guardar el uid del usuario como player_id en la colección game_participants
            await setDoc(jugadorDocRef, { player_id: uid, player_position });

            Swal.fire({
                title: "Nuevo jugador en la sala",
                icon: "success",
                text: `¡Bienvenido a la sala ${codigoIngresado}! ${playerData.nickname} se ha unido al juego.`,
            });
            router.push(`/Lobbypartida/${codigoIngresado}`);
        } catch (error) {
            Swal.fire("Error", error.message, "error");
            throw error;
        }
    };

    return {
        unirseAPartida,
    };
}