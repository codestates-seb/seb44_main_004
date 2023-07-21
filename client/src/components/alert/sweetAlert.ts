import Swal from 'sweetalert2';
interface AlertSettings {
  title: string;
  text: string;
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText: string;
  confirmButtonColor: string;
}

export const customAlert = ({
  title,
  text,
  icon,
  confirmButtonText,
  confirmButtonColor,
}: AlertSettings) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    confirmButtonColor,
  });
  return;
};
