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

const uploadImage = async (
    community_id,
    userId,
    image,
    i,
    setEachImageProgress,
    setImageURLs
) => {
    try {
        const blobImage = await fileUri2Blob(image.uri)
        const fileURL =
            `post/community_${community_id}/user_${userId}/` +
            randomImageFilename(community_id, userId)
        const storageRef = ref(storage, fileURL)
        const snapshot = await uploadBytesResumable(storageRef, blobImage).on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // console.log('Upload is ' + progress + '% done')
                setEachImageProgress((prev) => {
                    const newProgress = [...prev]
                    newProgress[i] = progress
                    return newProgress
                })
                switch (snapshot.state) {
                    case 'paused':
                        // console.log('Upload is paused')
                        break
                    case 'running':
                        //     console.log('Upload is running')
                        break
                }
            },
            (error) => {
                console.error('Error uploading image:', error)
            },
            async () => {
                // Upload completed successfully
                try {
                    const imageUrl = await getDownloadURL(storageRef)
                    // Once you get the URL, you can return it
                    // console.log('Download URL:', imageUrl)
                    // You can pass this URL or store it as needed
                    setImageURLs((prev) => {
                        const newURLs = [...prev]
                        newURLs.push(imageUrl)
                        return newURLs
                    })

                } catch (error) {
                    console.error('Error getting download URL:', error)
                }
            }
        )
        // const imageUrl = await getDownloadURL(snapshot.ref)
        // return imageUrl
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
