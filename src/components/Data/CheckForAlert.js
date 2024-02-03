export default function isAlertOpened() {
  const sweetAlertModal = document.querySelector(".swal2-container");

  if (sweetAlertModal) {
    return true;
    // Your logic here
  } else {
    return false;
  }
}
