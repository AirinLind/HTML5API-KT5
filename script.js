const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

fileInput.addEventListener('change', (event) => {
  preview.innerHTML = ''; 
  Array.from(event.target.files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('dragover');
  
  Array.from(event.dataTransfer.files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

const locationDisplay = document.getElementById('location');
const geoButton = document.getElementById('geoButton');

geoButton.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        locationDisplay.textContent = `Широта: ${position.coords.latitude}, Долгота: ${position.coords.longitude}`;
      },
      () => {
        locationDisplay.textContent = 'Ошибка при определении местоположения';
      }
    );
  } else {
    locationDisplay.textContent = 'Геолокация не поддерживается';
  }
});

const cameraButton = document.getElementById('cameraButton');
const stopCameraButton = document.getElementById('stopCameraButton');
const camera = document.getElementById('camera');
let cameraStream;

cameraButton.addEventListener('click', async () => {
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
    camera.srcObject = cameraStream;
    stopCameraButton.disabled = false;
  } catch (error) {
    console.error('Ошибка при доступе к камере', error);
  }
});

stopCameraButton.addEventListener('click', () => {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    camera.srcObject = null;
    stopCameraButton.disabled = true;
  }
});
