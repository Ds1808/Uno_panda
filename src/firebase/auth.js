import { auth, db } from './config' //llamamos la autentificacion y la base de datos
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'//trae las funciones propias de firebase
import { doc, setDoc, getDoc, collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore'

export const AuthService = {
    // Función auxiliar para capitalizar el nombre 
    //capitalizar poner la primera letra en mayuscula y el resto en minuscula
    capitalizeUsername(username) {
        return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()
    },

    // Verificar si el nombre de usuario ya existe
    async isUsernameTaken(username) {
        try {
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('nombre', '==', this.capitalizeUsername(username)))
        const querySnapshot = await getDocs(q)
        return !querySnapshot.empty
        } catch (error) {
        console.error('Error checking username:', error)
        throw error
        }
    },

    // Registro de usuario solo sirve para registrar
    async register({ email, password, userData }) {
        try {
        // Capitalizamos el nombre antes de verificar
        const capitalizedName = this.capitalizeUsername(userData.nombre)
        
        // Verificamos si el nombre ya existe
        const isNameTaken = await this.isUsernameTaken(userData.nombre)
        if (isNameTaken) {
            return {
            success: false,
            error: 'Este nombre de usuario ya está en uso',
            code: 'name-already-in-use'
            }
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await this.createUserProfile(userCredential.user.uid, { 
            ...userData,
            nombre: capitalizedName,
            email 
        })
        return {
            user: userCredential.user,
            success: true
        }
        } catch (error) {
        return this.handleAuthError(error)
        }
    },

    // Login de usuario
    async login({ email, password }) {
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        //const userProfile = await this.getUserProfile(userCredential.user.uid)
        return {
            user: userCredential.user,
            //profile: userProfile,
            success: true
        }
        } catch (error) {
        return this.handleAuthError(error)
        }
    },

    // Cerrar sesión
    async logout() {
        try {
        await signOut(auth)
        return { success: true }
        } catch (error) {
        return this.handleAuthError(error)
        }
    },

    // Crear perfil de usuario en Firestore
    async createUserProfile(userId, userData) {
        try {
        await setDoc(doc(db, 'users', userId), {
            ...userData,
            createdAt: new Date().toISOString()
        })
        return { success: true }
        } catch (error) {
        console.error('Error creating user profile:', error)
        throw error
        }
    },
    
    // Obtener perfil de usuario desde Firestore
    async getUserProfile(userId) {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                return userDoc.data(); // Devuelve los datos del perfil del usuario
            } else {
                throw new Error('Perfil de usuario no encontrado');
            }
        } catch (error) {
            console.error('Error obteniendo el perfil del usuario:', error);
            throw error;
        }
    },

    // Manejador de errores de autenticación
    handleAuthError(error) {
        const errorMessages = {
        'auth/email-already-in-use': 'Este correo ya está registrado',
        'auth/invalid-email': 'Correo electrónico inválido',
        'auth/operation-not-allowed': 'Operación no permitida',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Contraseña incorrecta',
        'name-already-in-use': 'Este nombre de usuario ya está en uso'
        }

        return {
        success: false,
        error: errorMessages[error.code] || 'Error en la autenticación',
        code: error.code
        }
    }
}

///*************************************** */
export async function createPlayer(userId, nickname, avatarUrl) {
    try {
        const playerRef = await addDoc(collection(db, 'players'), {
            user_id: userId, // Relación con el usuario en la colección `users`
            nickname: nickname,
            avatar_url: avatarUrl,
            created_at: Timestamp.now() // Fecha y hora actual
        });
        console.log('Jugador creado con ID:', playerRef.id);
        return { success: true, player_id: playerRef.id };
    } catch (error) {
        console.error('Error creando jugador:', error);
        return { success: false, error: error.message };
    }
}