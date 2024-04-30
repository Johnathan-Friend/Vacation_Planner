// IMPORTANT: to use database you need to use
// import * as database from "YourDirectoryToFile"

import { db } from '../firebaseConfig'
import { collection, getDocs, getDoc, doc, addDoc, query, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import Trip from '../classes/Trip.js'

/**
 * @description: Adds a trip to the database
 * @author: Johnathan Friend
 * @return: string of trip id or null if failed
 * @param: (String: title of trip)
 */
export async function addTrip (title) {
  const uid = getCurrentUserUid()
  if (uid) {
    try {
      const userTripsRef = collection(db, `users/${uid}/trips`)
      const docRef = await addDoc(userTripsRef, { title })
      console.log('Trip added successfully')
      return docRef.id
    } catch (error) {
      console.error('Error adding trip:', error)
      return false
    }
  } else {
    console.log('No user is signed in')
    return false
  }
}

/**
 * @description: Returns all of the trips in the database for signed in user
 * @author: Johnathan Friend
 * @return: A dictionary where {key = title of trip} : {value = trip id}
 * @param: none
 */
export async function getAllTrips () {
  const myDictionary = {}
  const uid = getCurrentUserUid()
  if (uid) {
    try {
      const userTripsRef = collection(db, `users/${uid}/trips`)
      const q = query(userTripsRef)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        // console.log('Trip title:', doc.data().title, '\n', doc.id)
        myDictionary[doc.data().title] = doc.id
      })
      return myDictionary
    } catch (error) {
      console.log('Error getting Trips: ', error)
    }
  } else {
    console.log('No user is signed in')
  }
}

/**
 * @description: deletes a trip from the db based on id given
 * @author: Johnathan Friend
 * @return: bool: true if passed and false if failed
 * @param: (String: tripId)
 */
export async function deleteTrip (tripID) {
  const uid = getCurrentUserUid()
  if (uid) {
    try {
      const tripDocRef = doc(db, `users/${uid}/trips`, tripID)
      const daysCollectionRef = collection(tripDocRef, 'days')
      const daysQuerySnapshot = await getDocs(daysCollectionRef)
      daysQuerySnapshot.forEach(async (dayDoc) => {
        await deleteDoc(dayDoc.ref)
      })
      await deleteDoc(tripDocRef)
      console.log('Trip deleted successfully')
      return true
    } catch (error) {
      console.log('Error Deleting Trip: ', error)
      return false
    }
  } else {
    console.log('No user is signed in')
    return false
  }
}

/**
 * @description: gets a trip from the db from the tripID
 * @author: Johnathan Friend
 * @return: Trip object or null
 * @param: trip id in relation to db
 */
export async function getTrip (tripID) {
  const uid = getCurrentUserUid()
  if (uid) {
    try {
      const tripDocRef = doc(db, `users/${uid}/trips/${tripID}`)
      const tripDocSnapshot = await getDoc(tripDocRef)
      if (tripDocSnapshot.exists()) {
        const tripData = tripDocSnapshot.data()
        const trip = new Trip(tripData.title)
        const daysCollectionRef = collection(tripDocRef, 'days')
        const daysQuerySnapshot = await getDocs(daysCollectionRef)
        daysQuerySnapshot.forEach(dayDoc => {
          const dayData = dayDoc.data().itinerary
          trip.addDayToDaysList(dayData)
        })
        return trip
      } else {
        throw new Error('Trip not found')
      }
    } catch (error) {
      console.log('Error getting Trip: ', error)
      return null
    }
  } else {
    console.log('No user is signed in')
    return null
  }
}

/**
 * @description: adds a day to Trip specified into db
 * @author: Johnathan Friend
 * @return: true if passed and false if error occured
 * @param: (String: tripID, String: itenerary)
 */
export async function addDay (tripId, itinerary) {
  const uid = getCurrentUserUid()
  if (uid) {
    try {
      const daysRef = collection(db, `users/${uid}/trips/${tripId}/days`)
      await addDoc(daysRef, { itinerary })
      console.log('Day added successfully')
      return true
    } catch (error) {
      console.error('Error adding day:', error)
      return false
    }
  } else {
    console.log('No user is signed in')
    return false
  }
}

/**
 * @description: WARNING: deletes all user data from the db
 * @author: Johnathan Friend
 * @return: true if passed and false if error occured
 * @param: none
 */
export async function deleteUserData () {
  const uid = getCurrentUserUid()
  if (uid) {
    try {
      const tripsRef = collection(db, `users/${uid}/trips`)
      const q = query(tripsRef)
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach(async (doc) => {
        const tripDocRef = doc.ref
        const daysCollectionRef = collection(tripDocRef, 'days')
        const daysQuerySnapshot = await getDocs(daysCollectionRef)
        daysQuerySnapshot.forEach(async (dayDoc) => {
          await deleteDoc(dayDoc.ref)
        })
        await deleteDoc(doc.ref)
      })
      return true
    } catch (error) {
      console.log('Error deleting user: ', error)
      return false
    }
  } else {
    console.log('Error occured when trying to delete the user account')
    return false
  }
}

// helper function to check if user is signed in and has an account
function getCurrentUserUid () {
  const user = getAuth().currentUser
  if (user) {
    return user.uid
  } else {
    return null
  }
}

// exports database
export { db }
