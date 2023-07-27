import Swal from 'sweetalert2';
interface AlertSettings {
  title: string;
  text: string;
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmButtonText?: string;
  handleRoutePage?: () => void | undefined;
}

export const customAlert = ({
  title,
  text,
  icon,
  showCancelButton,
  confirmButtonColor,
  cancelButtonColor,
  confirmButtonText,
  handleRoutePage,
}: AlertSettings) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      if (handleRoutePage) handleRoutePage();
    }
  });
  return;
};
