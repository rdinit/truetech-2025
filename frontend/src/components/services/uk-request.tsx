import { IconCard } from "../ui/card";
import { showModal } from "../ui/modal/show";
import { UkRequestModal } from "./uk-request-modal";

const Icon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="8" fill="#1E40AF" />
    <path
      d="M22.6667 9.33337H9.33333C8.41286 9.33337 7.66667 10.0796 7.66667 11V21C7.66667 21.9205 8.41286 22.6667 9.33333 22.6667H22.6667C23.5871 22.6667 24.3333 21.9205 24.3333 21V11C24.3333 10.0796 23.5871 9.33337 22.6667 9.33337Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M24.3333 11.8334L16.8583 16.5834C16.6011 16.7446 16.3036 16.83 16 16.83C15.6964 16.83 15.3989 16.7446 15.1417 16.5834L7.66667 11.8334"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const UkRequest = () => {
  const onClick = async () => {
    showModal(UkRequestModal, { item: null });
  };

  return (
    <button onClick={onClick}>
      <IconCard
        icon={Icon}
        title="Создать обращение в УК"
        description="Сообщить в управляющую компанию о проблеме или задать вопрос"
      />
    </button>
  );
};
