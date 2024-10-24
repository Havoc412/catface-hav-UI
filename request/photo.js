import { BASE_URL } from "../common/setting";

import human from "../store/human";
const humanStore = human();

async function uploadFiles(files, dirPath="") {
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: BASE_URL + "admin/upload/files",
            file: file,
            name: "file",
            formData: {
                dir_name: dirPath
            },
            success: (response) => {
                try {
                    const parsedData = JSON.parse(response.data);
                    if (parsedData.code >= 200 && parsedData.code < 300) {
                    resolve(parsedData.data.path);
                    } else {
                    console.info("Request bug - success:", parsedData);
                    reject(new Error("Upload failed with code: " + parsedData.code));
                    }
                } catch (error) {
                    console.error("解析 JSON 失败:", error);
                    reject(error);
                }
            },
            fail: (err) => {
                console.error("Upload failed:", err);
                reject(err);
            },
        });
        });
    });

    try {
        const paths = await Promise.all(uploadPromises);
        return paths;
    } catch (error) {
        console.error("Error uploading files:", error);
        return [];
    }
}

const api = {
    async UploadAnimalPhotos(files) {
        return await uploadFiles(files, `catsPhotos/hum_${humanStore.user_id}`);
    }
};

export default api;
