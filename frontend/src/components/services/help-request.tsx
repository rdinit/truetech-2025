import { IconCard } from "../ui/card";
import { showModal } from "../ui/modal/show";
import { HelpRequestModal } from "./help-request-modal";

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
      d="M19.3333 10.1667C19.7936 10.1667 20.1667 9.79357 20.1667 9.33333C20.1667 8.8731 19.7936 8.5 19.3333 8.5C18.8731 8.5 18.5 8.8731 18.5 9.33333C18.5 9.79357 18.8731 10.1667 19.3333 10.1667Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21 21.8333L21.8333 16L16.9417 16.7833"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.1667 12.6666L12.6667 10.1666L17.25 12.6666L15.4083 15.25"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.53333 18.0667C9.375 18.55 9.30833 19.0667 9.34167 19.6C9.37666 20.1461 9.51888 20.6799 9.7602 21.171C10.0015 21.6622 10.3372 22.1009 10.7481 22.4623C11.159 22.8237 11.6371 23.1006 12.155 23.2772C12.6729 23.4538 13.2206 23.5267 13.7667 23.4917C14.3083 23.4583 14.8083 23.325 15.2667 23.1083"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.4667 20.6001C17.625 20.1167 17.6917 19.6001 17.6583 19.0667C17.6233 18.5206 17.4811 17.9868 17.2398 17.4957C16.9985 17.0045 16.6628 16.5658 16.2519 16.2044C15.841 15.843 15.3629 15.5661 14.845 15.3895C14.3271 15.2129 13.7794 15.14 13.2333 15.1751C12.6917 15.2084 12.1917 15.3417 11.7333 15.5584"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const HelpRequest = () => {
  const onClick = async () => {
    showModal(HelpRequestModal, { item: null });
  };

  return (
    <button onClick={onClick}>
      <IconCard
        icon={Icon}
        title="Попросить о помощи"
        description="Попросить о помощи консьержа или жильцов"
      />
    </button>
  );
};
