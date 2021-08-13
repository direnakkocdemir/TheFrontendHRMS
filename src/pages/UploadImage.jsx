import React from 'react'
import AddImage from '../layouts/Popups/AddImage'
import { useSelector } from 'react-redux'
import ImageService from '../services/imageService'

export default function UploadImage() {
    const {authItem} = useSelector(state => state.auth)
    return (
        <div>
            <AddImage userId={authItem[0].user.id}/>
        </div>
    )
}
