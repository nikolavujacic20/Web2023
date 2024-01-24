<template>
    <div class="pictures-page">
        <h2 class="pictures-title">Gallery</h2>
        <div class="pictures-list">
            <div v-for="(picture, index) in pictures" :key="index" class="picture-item">
                <img :src="getImageUrl(picture.filename)" alt="User Picture" />
                <button @click="deletePicture(picture.id)" class="delete-button">Delete</button>
            </div>
        </div>
        <div class="upload-section">
            <input type="file" id="file-upload" @change="handleFileUpload" class="file-input" />
            <label for="file-upload" class="upload-button">Choose a Picture</label>
            <button @click="uploadPicture" class="upload-button">Upload Picture</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            pictures: [],
            newPicture: null
        };
    },
    methods: {
        getImageUrl(filename) {
           
            return `http://localhost:3000/images/${filename}`;
        },
        fetchPictures() {
            if (!this.userId) {
                console.error('User ID is not set');
                return;
            }

            axios.get(`http://localhost:3000/pictures/${this.userId}`)
                .then(response => {
                    this.pictures = response.data.pictures;
                  
                })
                .catch(error => console.error('Error fetching pictures:', error));
        },
        handleFileUpload(event) {
            this.newPicture = event.target.files[0];
        },

        deletePicture(pictureId) {
            alert(pictureId);
            axios.put(`http://localhost:3000/pictures/edit-picture/${this.userId}`, { pictureId })
                .then(response => {
                    if (response.data.success) {
                     
                        this.fetchPictures();
                    }
                })
                .catch(error => console.error('Error updating picture:', error));
        },
        uploadPicture() {
            if (!this.newPicture) {
                alert('Please select a picture to upload.');
                return;
            }

            const formData = new FormData();
            formData.append('image', this.newPicture);
            formData.append('userId', this.userId);

            axios.post('http://localhost:3000/pictures/upload-picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    if (response.data.success) {
                        this.fetchPictures(); 
                    } else {
                        console.error('Upload failed:', response.data.message);
                    }
                })
                .catch(error => console.error('Error uploading picture:', error));
        }
    },
    created() {

        this.userId = localStorage.getItem('userId'); 
        this.fetchPictures();


    }
};
</script>

<style scoped>
.pictures-page {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.pictures-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 15px;
}

.picture-item {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.picture-item img {
    width: 100%;
    height: 150px;
  
    object-fit: cover;
}

.delete-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: #d93025;
   
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s ease;
}

.delete-button:hover {
    opacity: 1;
}


.upload-button,
.file-input {
    background-color: #1877f2;
   
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    text-align: center;
}

.file-input {
    padding: 0;
    border: none;
    margin: 0;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.file-input+label {
    font-size: 16px;
    color: white;
    background-color: #1877f2;
    display: inline-block;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 5px;
    margin-top: 10px;
}

.file-input:focus+label,
.file-input+label:hover {
    background-color: #1654ba;
   
}
</style>
