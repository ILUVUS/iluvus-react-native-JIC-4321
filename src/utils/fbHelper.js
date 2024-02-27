import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from './iluvus_bucket_credential'
import { useState } from 'react'

const randomImageFilename = (community_id, userId) => {
    let result = ''
    const result_length = 30
    while (result.length < result_length) {
        result += Math.random().toString(36).substring(2, 7)
    }
    return `iluvus${community_id}${userId}` + result.substring(0, result_length)
}

const uploadImage = async (community_id, userId, image) => {
    try {
        const blobImage = await fileUri2Blob(image.uri)
        const fileURL =
            `post/${community_id}/${userId}/` +
            randomImageFilename(community_id, userId)
        const storageRef = ref(storage, fileURL)
        const snapshot = await uploadBytesResumable(storageRef, blobImage)
        const imageUrl = await getDownloadURL(snapshot.ref)
        return imageUrl
    } catch (error) {
        console.error('Error uploading image:', error)
    }
}

const fileUri2Blob = async (fileUri) => {
    return fetch(fileUri)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.blob()
        })
        .catch((error) => {
            console.error(
                'There has been a problem with your fetch operation: ',
                error
            )
            throw error
        })
}

export { uploadImage }
